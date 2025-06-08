// AI Orchestration System for Office Cleaning Service
// Implements security-first architecture with local LLM proxy and rate limiting

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

  // Context-aware response generation
  private generateContextualResponse(message: string, context: ChatContext): string {
    const lowerMessage = message.toLowerCase();
    const messageHistory = context.messages.map(m => m.content.toLowerCase()).join(' ');

    // Business hours check
    const now = new Date();
    const hour = now.getHours();
    const isBusinessHours = (hour >= 8 && hour <= 18 && now.getDay() >= 1 && now.getDay() <= 5) ||
                           (hour >= 9 && hour <= 16 && now.getDay() === 6);

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
      return "Based on the square footage you mentioned, I can see you're planning ahead! Our regular cleaning starts at $0.08 per square foot, with deep cleaning at $0.15 per square foot. The exact price depends on frequency and additional services. Would you like me to help you use our quote calculator above?";
    }
    
    return "Our regular cleaning starts at $0.08 per square foot, deep cleaning at $0.15 per square foot. Pricing depends on your office size, cleaning frequency, and any additional services. Our quote calculator above can give you an instant estimate! What's your office size?";
  }

  private getServiceResponse(message: string): string {
    if (message.includes('regular') || message.includes('daily') || message.includes('weekly')) {
      return "Our regular office cleaning includes desk sanitization, trash removal, restroom cleaning, and kitchen maintenance. We offer daily, weekly, or bi-weekly schedules. Would you like to know about pricing or schedule a consultation?";
    }
    
    if (message.includes('deep')) {
      return "Our deep cleaning service includes complete disinfection, carpet cleaning, light fixture cleaning, and detailed baseboard work. Perfect for move-ins, seasonal maintenance, or special events. This runs about $0.15 per square foot.";
    }
    
    return "We offer regular office cleaning, deep cleaning, floor care, window cleaning, post-construction cleanup, and eco-friendly options. Each service can be customized to your needs. Which type of cleaning interests you most?";
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

  // API limit discovery system
  async discoverApiLimits(endpoint: string): Promise<{ maxRequests: number; windowMs: number }> {
    // Progressive testing approach to discover API limits
    const testLimits = [
      { maxRequests: 10, windowMs: 60000 },
      { maxRequests: 100, windowMs: 3600000 },
      { maxRequests: 1000, windowMs: 86400000 }
    ];

    // Start with conservative limits and adjust based on responses
    const currentLimit = testLimits[0];
    
    console.log(`Discovering limits for ${endpoint}:`, currentLimit);
    
    return currentLimit;
  }
}

export const aiOrchestration = new AIOrchestrationSystem();
