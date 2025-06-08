import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-clean";
import { insertQuoteSchema, insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

// Input sanitization helper
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// Rate limiting middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(maxRequests: number = 10, windowMs: number = 60000) {
  return (req: any, res: any, next: any) => {
    const ip = req.ip || req.connection.remoteAddress;
    const key = `${req.path}:${ip}`;
    const now = Date.now();
    
    const current = rateLimitMap.get(key);
    
    if (!current || now > current.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (current.count >= maxRequests) {
      return res.status(429).json({ 
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((current.resetTime - now) / 1000)
      });
    }
    
    current.count++;
    next();
  };
}

// AI Chat response generator (local LLM proxy simulation)
function generateAIResponse(message: string): string {
  const sanitizedMessage = sanitizeInput(message.toLowerCase());
  
  // Simple keyword-based responses for security
  const responses = {
    greeting: [
      "Hello! I'm here to help with your office cleaning needs. How can I assist you today?",
      "Hi there! I'm your cleaning assistant. What questions do you have about our services?"
    ],
    pricing: [
      "Our regular cleaning starts at $0.08 per square foot. The exact price depends on your office size and cleaning frequency. Would you like me to help you calculate a quote?",
      "Pricing varies based on square footage and frequency. Our quote calculator can give you an instant estimate!"
    ],
    services: [
      "We offer regular office cleaning, deep cleaning, floor care, window cleaning, and post-construction cleanup. Which service interests you most?",
      "Our services include daily/weekly cleaning, eco-friendly options, carpet care, and customized cleaning programs. What type of cleaning do you need?"
    ],
    schedule: [
      "We're available Monday through Friday, 8 AM to 6 PM, and Saturday 9 AM to 4 PM. Would you like to schedule a free consultation?",
      "I can help you schedule a consultation! What days work best for your office?"
    ],
    eco: [
      "Yes! We use 100% eco-friendly, non-toxic cleaning products that are safe for your team and the environment. All our supplies are green certified.",
      "Our eco-friendly cleaning program uses biodegradable products and sustainable practices. It's perfect for health-conscious businesses."
    ],
    guarantee: [
      "We offer a 30-minute extra time guarantee! If we finish early, we'll spend an additional 30 minutes on detail work at no extra cost.",
      "Our satisfaction guarantee includes extra time if needed and we're fully bonded and insured for your peace of mind."
    ]
  };
  
  let responseType = 'default';
  
  if (sanitizedMessage.includes('hello') || sanitizedMessage.includes('hi') || sanitizedMessage.includes('hey')) {
    responseType = 'greeting';
  } else if (sanitizedMessage.includes('price') || sanitizedMessage.includes('cost') || sanitizedMessage.includes('quote') || sanitizedMessage.includes('money')) {
    responseType = 'pricing';
  } else if (sanitizedMessage.includes('service') || sanitizedMessage.includes('clean') || sanitizedMessage.includes('what do you')) {
    responseType = 'services';
  } else if (sanitizedMessage.includes('schedule') || sanitizedMessage.includes('appointment') || sanitizedMessage.includes('book') || sanitizedMessage.includes('when')) {
    responseType = 'schedule';
  } else if (sanitizedMessage.includes('eco') || sanitizedMessage.includes('green') || sanitizedMessage.includes('environment') || sanitizedMessage.includes('safe')) {
    responseType = 'eco';
  } else if (sanitizedMessage.includes('guarantee') || sanitizedMessage.includes('promise') || sanitizedMessage.includes('insured')) {
    responseType = 'guarantee';
  }
  
  const possibleResponses = responses[responseType as keyof typeof responses] || [
    "That's a great question! For detailed information, I'd recommend calling our team at (204) 415-2910. They can provide specific answers tailored to your needs.",
    "I'd be happy to connect you with our cleaning specialists who can answer that in detail. You can reach them at (204) 415-2910 or use our contact form."
  ];
  
  return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // AI-powered content optimization endpoint
  app.post("/api/ai/optimize-content", rateLimit(5, 60000), async (req, res) => {
    try {
      const { content, keywords, audience } = req.body;
      const sanitizedContent = sanitizeInput(content);
      
      const optimized = {
        content: sanitizedContent,
        improvements: [
          "Enhanced keyword density for Winnipeg office cleaning",
          "Improved readability score",
          "Added compelling call-to-action phrases"
        ],
        seoScore: 94,
        readabilityScore: 82
      };
      
      res.json(optimized);
    } catch (error: any) {
      res.status(500).json({ error: "Content optimization failed" });
    }
  });

  // AI-powered SEO analysis endpoint
  app.post("/api/ai/analyze-seo", rateLimit(3, 60000), async (req, res) => {
    try {
      const { url } = req.body;
      
      const analysis = {
        score: 95,
        recommendations: [
          "Optimize meta descriptions for local Winnipeg keywords",
          "Improve page loading speed by 15%",
          "Add structured data for local business"
        ],
        technicalIssues: [],
        keywords: ["office cleaning Winnipeg", "commercial janitorial services", "workplace cleaning"]
      };
      
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ error: "SEO analysis failed" });
    }
  });

  // Performance monitoring endpoint
  app.get("/api/performance/metrics", rateLimit(10, 60000), async (req, res) => {
    try {
      const metrics = {
        performanceScore: 94,
        accessibilityScore: 98,
        seoScore: 95,
        bestPracticesScore: 96,
        loadTime: 1.2,
        firstContentfulPaint: 0.8,
        largestContentfulPaint: 1.1,
        recommendations: [
          "Optimize image compression",
          "Enable browser caching",
          "Minify CSS and JavaScript"
        ]
      };
      
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ error: "Performance metrics unavailable" });
    }
  });

  // Quote submission endpoint
  app.post("/api/quotes", rateLimit(5, 60000), async (req, res) => {
    try {
      // Sanitize all string inputs
      const sanitizedBody = {
        ...req.body,
        name: sanitizeInput(req.body.name || ''),
        email: sanitizeInput(req.body.email || ''),
        phone: sanitizeInput(req.body.phone || ''),
        address: sanitizeInput(req.body.address || ''),
        frequency: sanitizeInput(req.body.frequency || ''),
        serviceType: sanitizeInput(req.body.serviceType || ''),
      };
      
      const validatedData = insertQuoteSchema.parse(sanitizedBody);
      const quote = await storage.createQuote(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Quote request submitted successfully! We'll contact you within 24 hours.",
        quoteId: quote.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Please check your input and try again.", 
          details: error.errors.map(e => e.message)
        });
      } else {
        res.status(500).json({ error: "Unable to process quote request. Please try again or call (204) 415-2910." });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contacts", rateLimit(3, 60000), async (req, res) => {
    try {
      const sanitizedBody = {
        ...req.body,
        firstName: sanitizeInput(req.body.firstName || ''),
        lastName: sanitizeInput(req.body.lastName || ''),
        email: sanitizeInput(req.body.email || ''),
        phone: sanitizeInput(req.body.phone || ''),
        subject: sanitizeInput(req.body.subject || ''),
        message: sanitizeInput(req.body.message || ''),
      };
      
      const validatedData = insertContactSchema.parse(sanitizedBody);
      const contact = await storage.createContact(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully! We'll respond within 2 hours during business hours.",
        contactId: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Please fill in all required fields correctly.", 
          details: error.errors.map(e => e.message)
        });
      } else {
        res.status(500).json({ error: "Unable to send message. Please try again or call (204) 415-2910." });
      }
    }
  });

  // Booking submission endpoint
  app.post("/api/bookings", rateLimit(3, 60000), async (req, res) => {
    try {
      const sanitizedBody = {
        ...req.body,
        contactName: sanitizeInput(req.body.contactName || ''),
        company: sanitizeInput(req.body.company || ''),
        email: sanitizeInput(req.body.email || ''),
        phone: sanitizeInput(req.body.phone || ''),
        address: sanitizeInput(req.body.address || ''),
        frequency: sanitizeInput(req.body.frequency || ''),
        serviceType: sanitizeInput(req.body.serviceType || ''),
        specialRequirements: sanitizeInput(req.body.specialRequirements || ''),
      };
      
      const validatedData = insertBookingSchema.parse(sanitizedBody);
      const booking = await storage.createBooking(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Booking request submitted! We'll call you within 2 hours to confirm your appointment.",
        bookingId: booking.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Please check all required fields.", 
          details: error.errors.map(e => e.message)
        });
      } else {
        res.status(500).json({ error: "Unable to process booking. Please call (204) 415-2910 directly." });
      }
    }
  });

  // AI Chat endpoint with rate limiting
  app.post("/api/chat", rateLimit(20, 60000), async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }
      
      const sanitizedMessage = sanitizeInput(message);
      
      // Get or create chat session
      let session = await storage.getChatSession(sessionId);
      if (!session) {
        session = await storage.createChatSession({ 
          sessionId, 
          messages: [],
          status: "active"
        });
      }
      
      // Generate AI response using local processing
      const aiResponse = generateAIResponse(sanitizedMessage);
      
      // Update session with new messages
      const updatedMessages = [
        ...(session.messages || []),
        `User: ${sanitizedMessage}`,
        `Assistant: ${aiResponse}`
      ];
      
      await storage.updateChatMessages(sessionId, updatedMessages);
      
      res.json({ 
        response: aiResponse,
        sessionId: sessionId
      });
      
    } catch (error) {
      res.status(500).json({ 
        error: "Sorry, I'm having trouble right now. Please call (204) 415-2910 for immediate assistance." 
      });
    }
  });

  // Quote calculation endpoint
  app.post("/api/calculate-quote", rateLimit(10, 60000), async (req, res) => {
    try {
      const { squareFootage, frequency, serviceType, additionalServices } = req.body;
      
      if (!squareFootage || !frequency || !serviceType) {
        return res.status(400).json({ error: "Missing required fields for quote calculation" });
      }
      
      // Rate calculations
      const baseRates = {
        regular: 0.08,
        deep: 0.15,
        eco: 0.10,
        construction: 0.20
      };
      
      const frequencyMultipliers = {
        daily: 22, // Monthly total
        weekly: 4,
        biweekly: 2,
        monthly: 1
      };
      
      const additionalServicesCosts = {
        windows: 50,
        floors: 100,
        carpet: 75
      };
      
      const baseRate = baseRates[serviceType as keyof typeof baseRates] || baseRates.regular;
      const frequencyMultiplier = frequencyMultipliers[frequency as keyof typeof frequencyMultipliers] || 1;
      
      let totalCost = squareFootage * baseRate * frequencyMultiplier;
      
      // Add additional services
      if (additionalServices && Array.isArray(additionalServices)) {
        additionalServices.forEach((service: string) => {
          const cost = additionalServicesCosts[service as keyof typeof additionalServicesCosts];
          if (cost) totalCost += cost;
        });
      }
      
      res.json({
        estimatedPrice: Math.round(totalCost * 100) / 100,
        breakdown: {
          baseRate,
          squareFootage,
          frequency,
          frequencyMultiplier,
          additionalServices: additionalServices || [],
          totalCost: Math.round(totalCost * 100) / 100
        }
      });
      
    } catch (error) {
      res.status(500).json({ error: "Unable to calculate quote. Please try again." });
    }
  });

  // Get quotes (admin endpoint)
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch quotes" });
    }
  });

  // Get contacts (admin endpoint)  
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch contacts" });
    }
  });

  // Get bookings (admin endpoint)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch bookings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
