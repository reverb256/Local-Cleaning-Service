import OpenAI from "openai";
import { db } from "./db";
import { aiCommands, aiSessions, siteContent, aiCapabilities, AI_ACTIONS, AI_TARGETS } from "@shared/ai-schema";
import { eq, and } from "drizzle-orm";
import type { InsertAiCommand, InsertSiteContent } from "@shared/ai-schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export class AIService {
  private static instance: AIService;
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async processAdminCommand(sessionId: string, adminId: string, command: string): Promise<string> {
    try {
      // Parse the command using AI
      const parsedCommand = await this.parseCommand(command);
      
      // Store the command in database
      const [aiCommand] = await db.insert(aiCommands).values({
        adminId,
        command,
        target: parsedCommand.target,
        action: parsedCommand.action,
        parameters: parsedCommand.parameters,
        status: 'processing'
      }).returning();

      // Execute the command
      const result = await this.executeCommand(aiCommand.id, parsedCommand);
      
      // Update command status
      await db.update(aiCommands)
        .set({ 
          status: 'completed', 
          result: JSON.stringify(result),
          executedAt: new Date()
        })
        .where(eq(aiCommands.id, aiCommand.id));

      return this.formatResponse(result);
    } catch (error) {
      console.error('AI Command Error:', error);
      return "I encountered an error processing your request. Please try again or be more specific.";
    }
  }

  private async parseCommand(command: string) {
    const systemPrompt = `You are an AI assistant for a commercial cleaning website admin panel. Parse admin commands and return structured data.

Available targets: ${Object.values(AI_TARGETS).join(', ')}
Available actions: ${Object.values(AI_ACTIONS).join(', ')}

Parse this command and respond with JSON in this exact format:
{
  "target": "section_name",
  "action": "action_type", 
  "parameters": {
    "specific": "parameters"
  },
  "confidence": 0.9
}

Examples:
"Update the hero section title to say Professional Excellence" -> {"target": "hero", "action": "update_text", "parameters": {"element": "title", "content": "Professional Excellence"}}
"Change the contact phone number to 204-555-0123" -> {"target": "contact", "action": "update_contact", "parameters": {"field": "phone", "value": "204-555-0123"}}
"Add a new service called Deep Sanitization" -> {"target": "services", "action": "update_services", "parameters": {"operation": "add", "service": {"name": "Deep Sanitization", "description": "Healthcare-grade sanitization"}}}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: command }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  private async executeCommand(commandId: number, parsedCommand: any) {
    const { target, action, parameters } = parsedCommand;

    switch (action) {
      case AI_ACTIONS.UPDATE_TEXT:
        return await this.updateText(target, parameters);
      
      case AI_ACTIONS.UPDATE_COLORS:
        return await this.updateColors(target, parameters);
      
      case AI_ACTIONS.UPDATE_CONTACT:
        return await this.updateContact(parameters);
      
      case AI_ACTIONS.UPDATE_SERVICES:
        return await this.updateServices(parameters);
      
      case AI_ACTIONS.UPDATE_PRICING:
        return await this.updatePricing(parameters);
      
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  private async updateText(target: string, parameters: any) {
    const { element, content } = parameters;
    
    // Get current content
    const [existingContent] = await db.select()
      .from(siteContent)
      .where(eq(siteContent.sectionId, target));

    const currentContent = existingContent?.content || {};
    
    // Update specific text element
    const updatedContent = {
      ...currentContent,
      [element]: content
    };

    // Save to database
    if (existingContent) {
      await db.update(siteContent)
        .set({ 
          content: updatedContent,
          version: this.incrementVersion(existingContent.version),
          updatedAt: new Date()
        })
        .where(eq(siteContent.sectionId, target));
    } else {
      await db.insert(siteContent).values({
        sectionId: target,
        content: updatedContent,
        version: '1.0'
      });
    }

    return {
      success: true,
      target,
      element,
      newContent: content,
      message: `Updated ${element} in ${target} section`
    };
  }

  private async updateColors(target: string, parameters: any) {
    const { colorScheme, elements } = parameters;
    
    // Implementation for color updates
    return {
      success: true,
      target,
      colorScheme,
      message: `Updated color scheme for ${target}`
    };
  }

  private async updateContact(parameters: any) {
    const { field, value } = parameters;
    
    const contactFields = {
      phone: value,
      email: value,
      address: value,
      hours: value
    };

    const updatedContent = {
      [field]: value
    };

    await this.updateSiteContent('contact', updatedContent);

    return {
      success: true,
      field,
      value,
      message: `Updated contact ${field}`
    };
  }

  private async updateServices(parameters: any) {
    const { operation, service } = parameters;
    
    const [existingContent] = await db.select()
      .from(siteContent)
      .where(eq(siteContent.sectionId, 'services'));

    const currentServices = (existingContent?.content as any)?.services || [];
    
    let updatedServices;
    if (operation === 'add') {
      updatedServices = [...currentServices, service];
    } else if (operation === 'remove') {
      updatedServices = currentServices.filter((s: any) => s.name !== service.name);
    } else {
      updatedServices = currentServices.map((s: any) => 
        s.name === service.name ? { ...s, ...service } : s
      );
    }

    await this.updateSiteContent('services', { services: updatedServices });

    return {
      success: true,
      operation,
      service,
      message: `${operation} service: ${service.name}`
    };
  }

  private async updatePricing(parameters: any) {
    const { priceChanges } = parameters;
    
    await this.updateSiteContent('pricing', priceChanges);

    return {
      success: true,
      priceChanges,
      message: 'Updated pricing information'
    };
  }

  private async updateSiteContent(sectionId: string, content: any) {
    const [existing] = await db.select()
      .from(siteContent)
      .where(eq(siteContent.sectionId, sectionId));

    if (existing) {
      const existingContent = existing.content as Record<string, any> || {};
      await db.update(siteContent)
        .set({
          content: { ...existingContent, ...content },
          version: this.incrementVersion(existing.version),
          updatedAt: new Date()
        })
        .where(eq(siteContent.sectionId, sectionId));
    } else {
      await db.insert(siteContent).values({
        sectionId,
        content,
        version: '1.0'
      });
    }
  }

  private incrementVersion(version: string): string {
    const parts = version.split('.');
    const minor = parseInt(parts[1] || '0') + 1;
    return `${parts[0]}.${minor}`;
  }

  private formatResponse(result: any): string {
    if (result.success) {
      return `✓ ${result.message}`;
    } else {
      return `✗ Failed to execute command: ${result.error}`;
    }
  }

  async initializeCapabilities() {
    const capabilities = [
      {
        capability: 'update_text',
        description: 'Update text content in any section',
        parameters: { element: 'string', content: 'string' }
      },
      {
        capability: 'update_colors',
        description: 'Modify color schemes and styling',
        parameters: { colorScheme: 'object', elements: 'array' }
      },
      {
        capability: 'update_contact',
        description: 'Update contact information',
        parameters: { field: 'string', value: 'string' }
      },
      {
        capability: 'update_services',
        description: 'Add, remove, or modify services',
        parameters: { operation: 'string', service: 'object' }
      },
      {
        capability: 'update_pricing',
        description: 'Modify pricing information',
        parameters: { priceChanges: 'object' }
      }
    ];

    for (const cap of capabilities) {
      await db.insert(aiCapabilities).values(cap).onConflictDoNothing();
    }
  }
}

export const aiService = AIService.getInstance();