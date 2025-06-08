// Cloudflare Pages and Workers optimization configuration
// Optimized for free tier usage

export default {
  // Cloudflare Pages configuration
  pages: {
    // Build configuration
    build: {
      command: "npm run build",
      destination: "dist",
      environment: {
        NODE_VERSION: "18"
      }
    },
    
    // Headers for optimization
    headers: [
      {
        source: "/api/*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=300"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      },
      {
        source: "/static/*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ],
    
    // Redirects for SEO
    redirects: [
      {
        source: "/home",
        destination: "/",
        permanent: true
      },
      {
        source: "/contact-us",
        destination: "/#contact",
        permanent: false
      }
    ]
  },
  
  // Workers configuration for API optimization
  workers: {
    // Rate limiting configuration
    rateLimit: {
      // Free tier: 100,000 requests/day
      dailyQuota: 100000,
      // Distribute evenly
      perMinute: 69,
      perHour: 4166,
      
      // Adaptive limits based on time of day
      timeBasedLimits: {
        businessHours: { // 8 AM - 6 PM CST
          perMinute: 100,
          perHour: 6000
        },
        offHours: {
          perMinute: 40,
          perHour: 2400
        }
      }
    },
    
    // Caching strategy
    cache: {
      // Cache AI responses for similar queries
      aiResponses: {
        ttl: 300, // 5 minutes
        varyBy: ["query_hash", "user_context"]
      },
      
      // Cache knowledge base lookups
      knowledgeBase: {
        ttl: 3600, // 1 hour
        varyBy: ["query_category"]
      },
      
      // Cache static content
      static: {
        ttl: 86400, // 24 hours
        varyBy: ["url"]
      }
    },
    
    // Edge computing for simple queries
    edgeProcessing: {
      enabled: true,
      simpleQueries: [
        "greeting",
        "contact_info", 
        "hours",
        "location",
        "basic_pricing"
      ],
      // Route complex queries to origin
      complexQueryThreshold: 10
    }
  },
  
  // Security configuration
  security: {
    // WAF rules for the cleaning service
    waf: {
      enabled: true,
      rules: [
        {
          description: "Block SQL injection attempts",
          expression: "any(http.request.body.form contains \"'\" or http.request.body.form contains \"--\")",
          action: "block"
        },
        {
          description: "Rate limit AI chat",
          expression: "http.request.uri.path eq \"/api/chat\"",
          action: "rate_limit",
          rateLimit: {
            requests: 10,
            period: 60
          }
        }
      ]
    },
    
    // Bot management
    botManagement: {
      enabled: true,
      allowGoodBots: true,
      challengeSuspiciousBots: true
    }
  },
  
  // Analytics configuration
  analytics: {
    webAnalytics: {
      enabled: true,
      // Track key metrics for cleaning service
      customEvents: [
        "quote_requested",
        "contact_form_submitted",
        "chat_initiated",
        "service_inquiry"
      ]
    }
  },
  
  // Performance optimization
  performance: {
    // Auto minify
    minify: {
      html: true,
      css: true,
      js: true
    },
    
    // Image optimization
    images: {
      polish: "lossy",
      webp: true,
      avif: true
    },
    
    // Compression
    compression: {
      brotli: true,
      gzip: true
    }
  },
  
  // Domain configuration (for when domain is available)
  domains: {
    production: "workplacejanitorial.ca", // Canadian domain for Winnipeg business
    staging: "staging.workplacejanitorial.ca",
    
    // Custom rules per domain
    rules: {
      "workplacejanitorial.ca": {
        ssl: "full",
        minTlsVersion: "1.2",
        ciphers: ["ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384"]
      }
    }
  }
};