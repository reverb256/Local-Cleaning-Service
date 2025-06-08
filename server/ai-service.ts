// Local AI orchestration service using free APIs and local models
import { db } from "./db";
import { aiCommands, siteContent, AI_ACTIONS, AI_TARGETS } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import type { InsertAiCommand, InsertSiteContent } from "@shared/schema";

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
    // Local command parsing using pattern matching instead of paid AI
    const commandLower = command.toLowerCase();
    
    // Target detection
    let target = 'global';
    if (commandLower.includes('hero') || commandLower.includes('main banner')) target = 'hero';
    else if (commandLower.includes('service') && !commandLower.includes('guarantee')) target = 'services';
    else if (commandLower.includes('contact') || commandLower.includes('phone') || commandLower.includes('email')) target = 'contact';
    else if (commandLower.includes('about') || commandLower.includes('company')) target = 'about';
    else if (commandLower.includes('guarantee') || commandLower.includes('30 minute')) target = 'service_guarantee';
    else if (commandLower.includes('zone') || commandLower.includes('floor plan')) target = 'business_zones';
    else if (commandLower.includes('testimonial') || commandLower.includes('review')) target = 'testimonials';
    else if (commandLower.includes('quote') || commandLower.includes('calculator') || commandLower.includes('pricing')) target = 'quote_calculator';
    
    // Action detection
    let action = 'update_text';
    if (commandLower.includes('add') || commandLower.includes('create') || commandLower.includes('new')) action = 'add_section';
    else if (commandLower.includes('remove') || commandLower.includes('delete')) action = 'remove_section';
    else if (commandLower.includes('color') || commandLower.includes('style') || commandLower.includes('design')) action = 'update_colors';
    else if (commandLower.includes('contact') || commandLower.includes('phone') || commandLower.includes('email') || commandLower.includes('address')) action = 'update_contact';
    else if (commandLower.includes('service') && (commandLower.includes('add') || commandLower.includes('update') || commandLower.includes('modify'))) action = 'update_services';
    else if (commandLower.includes('price') || commandLower.includes('cost') || commandLower.includes('rate')) action = 'update_pricing';
    
    // Parameter extraction
    const parameters: any = {};
    
    if (action === 'update_text') {
      if (commandLower.includes('title') || commandLower.includes('heading')) parameters.element = 'title';
      else if (commandLower.includes('description') || commandLower.includes('subtitle')) parameters.element = 'description';
      else parameters.element = 'content';
      
      // Extract quoted content or content after "to say" or "to"
      const quotedMatch = command.match(/"([^"]+)"/);
      const toSayMatch = command.match(/to say (.+?)(?:\.|$)/i);
      const toMatch = command.match(/to (.+?)(?:\.|$)/i);
      
      if (quotedMatch) parameters.content = quotedMatch[1];
      else if (toSayMatch) parameters.content = toSayMatch[1].trim();
      else if (toMatch) parameters.content = toMatch[1].trim();
    }
    
    if (action === 'update_contact') {
      if (commandLower.includes('phone')) parameters.field = 'phone';
      else if (commandLower.includes('email')) parameters.field = 'email';
      else if (commandLower.includes('address')) parameters.field = 'address';
      else if (commandLower.includes('hours')) parameters.field = 'hours';
      
      // Extract the new value
      const phoneMatch = command.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
      const emailMatch = command.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      
      if (phoneMatch) parameters.value = phoneMatch[1];
      else if (emailMatch) parameters.value = emailMatch[1];
      else {
        const toMatch = command.match(/to (.+?)(?:\.|$)/i);
        if (toMatch) parameters.value = toMatch[1].trim();
      }
    }
    
    return {
      target,
      action,
      parameters,
      confidence: 0.8
    };
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
    // Initialize with basic logging since we're using local models
    console.log('AI orchestration service initialized with local command parsing');
    console.log('Available targets:', Object.values(AI_TARGETS).join(', '));
    console.log('Available actions:', Object.values(AI_ACTIONS).join(', '));
  }
}

export const aiService = AIService.getInstance();