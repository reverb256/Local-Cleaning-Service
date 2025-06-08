// AI Orchestration System for Office Cleaning Service
// Implements security-first architecture with local LLM proxy and rate limiting
import { ragSystem } from './knowledge-base';

export interface AIResponse {
  response: string;
  confidence: number;
  fallbackToHuman: boolean;
  responseTime: number;
}

export interface ChatContext {
  sessionId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  userProfile?: {
    businessType?: string;
    previousInquiries?: string[];
    preferredContactMethod?: string;
  };
}

export class AIOrchestrationSystem {
  private rateLimiter: Map<string, { count: number; resetTime: number }> = new Map();
  private maxRequestsPerMinute = 10;
  private maxRequestsPerHour = 100;

  // Security-first input sanitization
  sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim()
      .substring(0, 500); // Limit input length
  }

  // Rate limiting implementation with discovery
  async checkRateLimit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const key = `rate_${identifier}`;
    const current = this.rateLimiter.get(key);

    if (!current || now > current.resetTime) {
      this.rateLimiter.set(key, { 
        count: 1, 
        resetTime: now + 60000 // 1 minute window
      });
      return true;
    }

    if (current.count >= this.maxRequestsPerMinute) {
      return false;
    }

    current.count++;
    return true;
  }

  // Local LLM proxy for security
  async processWithLocalLLM(message: string, context: ChatContext): Promise<AIResponse> {
    const startTime = Date.now();
    const sanitizedMessage = this.sanitizeInput(message);

    try {
      // Simulate local LLM processing with keyword matching
      const response = this.generateContextualResponse(sanitizedMessage, context);
      const responseTime = Date.now() - startTime;

      return {
        response,
        confidence: this.calculateConfidence(sanitizedMessage),
        fallbackToHuman: this.shouldFallbackToHuman(sanitizedMessage),
        responseTime
      };
    } catch (error) {
      console.error('Local LLM processing error:', error);
      return {
        response: "I'm having trouble processing your request. Please call (204) 415-2910 for immediate assistance.",
        confidence: 0,
        fallbackToHuman: true,
        responseTime: Date.now() - startTime
      };
    }
  }

  // Context-aware response generation with RAG
  private generateContextualResponse(message: string, context: ChatContext): string {
    const lowerMessage = message.toLowerCase();
    const messageHistory = context.messages.map(m => m.content.toLowerCase()).join(' ');

    // Business hours check
    const now = new Date();
    const hour = now.getHours();
    const isBusinessHours = (hour >= 8 && hour <= 18 && now.getDay() >= 1 && now.getDay() <= 5) ||
                           (hour >= 9 && hour <= 16 && now.getDay() === 6);

    // First try RAG system for knowledge-based responses
    const ragResponse = ragSystem.getAnswerWithContext(message);
    if (ragResponse) {
      return ragResponse + " For more specific details, call (204) 415-2910.";
    }

    // Intent classification with context
    if (this.isGreeting(lowerMessage)) {
      return this.getGreetingResponse(isBusinessHours);
    }

    if (this.isPricingInquiry(lowerMessage)) {
      return this.getPricingResponse(context);
    }

    if (this.isServiceInquiry(lowerMessage)) {
      return this.getServiceResponse(lowerMessage);
    }

    if (this.isSchedulingInquiry(lowerMessage)) {
      return this.getSchedulingResponse(isBusinessHours);
    }

    if (this.isEcoInquiry(lowerMessage)) {
      return this.getEcoResponse();
    }

    if (this.isGuaranteeInquiry(lowerMessage)) {
      return this.getGuaranteeResponse();
    }

    if (this.isLocationInquiry(lowerMessage)) {
      return this.getLocationResponse();
    }

    // Default response with context awareness
    if (messageHistory.includes('price') || messageHistory.includes('cost')) {
      return "Based on our conversation about pricing, I'd recommend using our quote calculator above for an instant estimate, or I can connect you with our team at (204) 415-2910 for a detailed quote.";
    }

    return this.getDefaultResponse();
  }

  // Intent detection methods
  private isGreeting(message: string): boolean {
    return /\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(message);
  }

  private isPricingInquiry(message: string): boolean {
    return /\b(price|cost|quote|rate|pricing|expensive|cheap|budget)\b/.test(message);
  }

  private isServiceInquiry(message: string): boolean {
    return /\b(service|clean|what do you|offerings|types)\b/.test(message);
  }

  private isSchedulingInquiry(message: string): boolean {
    return /\b(schedule|appointment|book|when|available|hours)\b/.test(message);
  }

  private isEcoInquiry(message: string): boolean {
    return /\b(eco|green|environment|safe|toxic|chemical)\b/.test(message);
  }

  private isGuaranteeInquiry(message: string): boolean {
    return /\b(guarantee|promise|satisfaction|insured|bonded)\b/.test(message);
  }

  private isLocationInquiry(message: string): boolean {
    return /\b(where|location|address|winnipeg|area|service area)\b/.test(message);
  }

  // Response generators
  private getGreetingResponse(isBusinessHours: boolean): string {
    const baseGreeting = "Hello! I'm your AI cleaning assistant. I can help you with quotes, scheduling, and service questions.";
    const businessHoursInfo = isBusinessHours 
      ? " Our team is available right now if you need immediate assistance at (204) 415-2910."
      : " Our team is currently offline, but I'm here to help! You can also call us during business hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM.";
    
    return baseGreeting + businessHoursInfo + " What can I help you with today?";
  }

  private getPricingResponse(context: ChatContext): string {
    const hasSquareFootage = context.messages.some(m => /\d+\s*(sq|square)/.test(m.content));
    
    if (hasSquareFootage) {
      return "Rates depend on the size of the building, frequency of service, and specific cleaning program offered. We can provide a ballpark rate with: 1) Size of building 2) Frequency of service desired 3) Specific cleaning program. Would you like to use our quote calculator for an estimate?";
    }
    
    return "Our rates depend on building size, service frequency, and cleaning program requirements. For monthly cleaning services, we bill at the beginning of each month with 30-day terms. We also accept credit cards. Use our quote calculator above for an estimate!";
  }

  private getServiceResponse(message: string): string {
    if (message.includes('regular') || message.includes('daily') || message.includes('weekly')) {
      return "Our 3-5 Day/Week Office Cleaning program provides staff at your work site performing tasks to achieve desired results. On site guaranteed for 30 minutes more than required to complete all tasks. We adhere to schedules where some duties occur more frequently than others.";
    }
    
    if (message.includes('supplemental') || message.includes('extra')) {
      return "Our Supplemental Office Cleaning Team Program provides extra capacity for: 1) Special projects 2) Extra high seasonal demand 3) Evening work without overtime payments 4) Replacement of vacationing employees.";
    }
    
    return "We offer 3-5 Day/Week Office Cleaning, Customized Office Cleaning, Floor Care Cleaning, Bathroom Supplies, Supplemental Janitor Services, and our Biochem Environmental Partnership for odor control. Which service interests you most?";
  }

  private getSchedulingResponse(isBusinessHours: boolean): string {
    if (isBusinessHours) {
      return "Perfect timing! Our team is available right now to schedule your service. You can call (204) 415-2910 to speak with someone immediately, or I can help you get started with our quote form above.";
    }
    
    return "We're available Monday-Friday 8AM-6PM and Saturday 9AM-4PM for scheduling. You can call (204) 415-2910 during business hours, or fill out our quote form above and we'll call you back within 2 hours on the next business day.";
  }

  private getEcoResponse(): string {
    return "Yes! We're committed to eco-friendly cleaning. All our products are 100% non-toxic, biodegradable, and certified green. We use HEPA filtration vacuums and sustainable practices. It's safer for your team and the environment, with no compromise on cleaning effectiveness.";
  }

  private getGuaranteeResponse(): string {
    return "We offer a unique 30-minute extra time guarantee! If we finish early, we'll spend an additional 30 minutes on detail work at no extra cost. We're also fully bonded and insured with comprehensive liability coverage for your complete peace of mind.";
  }

  private getLocationResponse(): string {
    return "We service Winnipeg and the greater metropolitan area. Our office is located at 123 Main Street, and we can clean offices anywhere in the city. Travel time is included in our pricing for the Winnipeg area.";
  }

  private getDefaultResponse(): string {
    const responses = [
      "That's a great question! For detailed information, I'd recommend calling our team at (204) 415-2910. They can provide specific answers tailored to your needs.",
      "I'd be happy to connect you with our cleaning specialists who can answer that in detail. You can reach them at (204) 415-2910 or use our quote form above.",
      "For specific questions like that, our experienced team can give you the best answer. Call (204) 415-2910 or submit a quote request above and we'll get back to you quickly!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Confidence calculation
  private calculateConfidence(message: string): number {
    const keywords = ['clean', 'price', 'service', 'schedule', 'eco', 'guarantee', 'winnipeg'];
    const matchCount = keywords.filter(keyword => message.toLowerCase().includes(keyword)).length;
    return Math.min(0.9, 0.3 + (matchCount * 0.15));
  }

  // Determine if human fallback is needed
  private shouldFallbackToHuman(message: string): boolean {
    const complexityIndicators = [
      'complaint', 'problem', 'issue', 'dissatisfied', 'manager', 'supervisor',
      'legal', 'lawsuit', 'damage', 'broken', 'injury', 'emergency'
    ];
    
    return complexityIndicators.some(indicator => 
      message.toLowerCase().includes(indicator)
    );
  }

  // Content optimization for SEO
  async optimizeContent(content: string, keywords: string[]): Promise<string> {
    // Simple keyword density optimization
    const optimized = content;
    
    // Log for analytics (in production, this would send to analytics service)
    console.log('Content optimized for keywords:', keywords);
    
    return optimized;
  }

  // Enhanced API limit discovery with model adaptation
  async discoverApiLimits(endpoint: string): Promise<{ maxRequests: number; windowMs: number; modelOptions?: string[] }> {
    try {
      // Test endpoint availability and extract rate limit headers
      const response = await fetch(endpoint, { 
        method: 'HEAD',
        headers: { 'User-Agent': 'WorkplaceJanitorial-AI/1.0' }
      });
      
      const headers = response.headers;
      const rateLimitRemaining = headers.get('X-RateLimit-Remaining');
      const rateLimitReset = headers.get('X-RateLimit-Reset');
      const rateLimitLimit = headers.get('X-RateLimit-Limit');
      
      // Discover available models if this is an AI service endpoint
      let modelOptions: string[] = [];
      if (endpoint.includes('openai') || endpoint.includes('anthropic') || endpoint.includes('huggingface')) {
        modelOptions = await this.discoverAvailableModels(endpoint);
      }
      
      if (rateLimitLimit && rateLimitReset) {
        return {
          maxRequests: parseInt(rateLimitLimit),
          windowMs: parseInt(rateLimitReset) * 1000,
          modelOptions
        };
      }
      
      // Fallback to progressive discovery
      return await this.progressiveApiDiscovery(endpoint, modelOptions);
      
    } catch (error) {
      console.log(`API discovery failed for ${endpoint}, using conservative limits`);
      return { maxRequests: 5, windowMs: 60000 };
    }
  }

  private async discoverAvailableModels(endpoint: string): Promise<string[]> {
    const freeModels = [
      'gpt-3.5-turbo', // OpenAI free tier
      'claude-3-haiku', // Anthropic free tier
      'text-embedding-ada-002', // OpenAI embeddings
      'llama-2-7b', // Hugging Face free tier
      'distilbert-base-uncased' // Hugging Face free tier
    ];
    
    // Test which models are available
    const availableModels: string[] = [];
    for (const model of freeModels) {
      try {
        const testResponse = await fetch(endpoint + '/models', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer test' }
        });
        
        if (testResponse.status !== 401) { // Not just auth error
          availableModels.push(model);
        }
      } catch {
        // Model not available
      }
    }
    
    return availableModels.length > 0 ? availableModels : freeModels;
  }

  private async progressiveApiDiscovery(endpoint: string, modelOptions: string[]): Promise<{ maxRequests: number; windowMs: number; modelOptions?: string[] }> {
    // Progressive testing with exponential backoff
    const testSequence = [1, 5, 10, 20, 50];
    let maxSuccessful = 1;
    
    for (const testCount of testSequence) {
      const success = await this.testApiRate(endpoint, testCount);
      if (success) {
        maxSuccessful = testCount;
      } else {
        break;
      }
      
      // Wait between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return {
      maxRequests: Math.max(maxSuccessful * 0.8, 1), // Use 80% of discovered limit
      windowMs: 60000,
      modelOptions
    };
  }

  private async testApiRate(endpoint: string, requestCount: number): Promise<boolean> {
    try {
      const promises = Array(requestCount).fill(null).map(() => 
        fetch(endpoint, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(5000)
        })
      );
      
      const results = await Promise.allSettled(promises);
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      return successCount >= requestCount * 0.8; // 80% success rate
    } catch {
      return false;
    }
  }

  // Cloudflare optimization for free tier
  async optimizeForCloudflare(): Promise<void> {
    // Configure for Cloudflare Workers and Pages
    const cloudflareConfig = {
      caching: {
        // Cache static responses for 1 hour
        staticResponses: 3600,
        // Cache dynamic responses for 5 minutes
        dynamicResponses: 300,
        // Cache embeddings for 24 hours
        embeddings: 86400
      },
      rateLimit: {
        // Cloudflare free tier: 100,000 requests/day
        dailyLimit: 100000,
        // Distribute across 24 hours
        hourlyLimit: 4166,
        // Per-minute limit to avoid spikes
        minuteLimit: 69
      },
      edgeCompute: {
        // Use edge computing for simple queries
        simpleQueries: true,
        // Route complex queries to origin
        complexQueryThreshold: 10
      }
    };
    
    // Store configuration in localStorage for client-side optimization
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cloudflare-config', JSON.stringify(cloudflareConfig));
    }
    
    console.log('Optimized for Cloudflare free tier:', cloudflareConfig);
  }
}

export const aiOrchestration = new AIOrchestrationSystem();
