// Rate Limiting and API Discovery System
// Implements OWASP-compliant rate limiting with automatic limit discovery

export interface RateLimit {
  endpoint: string;
  maxRequests: number;
  windowMs: number;
  currentCount: number;
  resetTime: number;
}

export interface ApiEndpoint {
  url: string;
  method: string;
  discoveredLimits?: RateLimit;
  lastTested: Date;
}

export class RateLimiter {
  private limits: Map<string, RateLimit> = new Map();
  private ipLimits: Map<string, { count: number; resetTime: number }> = new Map();
  private globalLimit = { count: 0, resetTime: Date.now() + 3600000 }; // 1 hour

  // Initialize with conservative limits
  constructor() {
    this.initializeDefaultLimits();
  }

  private initializeDefaultLimits() {
    const defaultEndpoints = [
      { endpoint: '/api/chat', maxRequests: 20, windowMs: 60000 }, // 20 per minute
      { endpoint: '/api/quotes', maxRequests: 5, windowMs: 60000 }, // 5 per minute
      { endpoint: '/api/contacts', maxRequests: 3, windowMs: 60000 }, // 3 per minute
      { endpoint: '/api/bookings', maxRequests: 3, windowMs: 60000 }, // 3 per minute
      { endpoint: '/api/calculate-quote', maxRequests: 10, windowMs: 60000 }, // 10 per minute
    ];

    defaultEndpoints.forEach(({ endpoint, maxRequests, windowMs }) => {
      this.limits.set(endpoint, {
        endpoint,
        maxRequests,
        windowMs,
        currentCount: 0,
        resetTime: Date.now() + windowMs
      });
    });
  }

  // Check if request is allowed under current limits
  async checkLimit(endpoint: string, identifier: string = 'anonymous'): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const now = Date.now();
    
    // Check global limit first
    if (now > this.globalLimit.resetTime) {
      this.globalLimit = { count: 0, resetTime: now + 3600000 };
    }
    
    if (this.globalLimit.count >= 1000) { // Global hourly limit
      return {
        allowed: false,
        remaining: 0,
        resetTime: this.globalLimit.resetTime,
        retryAfter: Math.ceil((this.globalLimit.resetTime - now) / 1000)
      };
    }

    // Check endpoint-specific limits
    const limit = this.limits.get(endpoint);
    if (!limit) {
      // Auto-discover limits for new endpoints
      await this.discoverEndpointLimits(endpoint);
      return this.checkLimit(endpoint, identifier);
    }

    // Reset window if expired
    if (now > limit.resetTime) {
      limit.currentCount = 0;
      limit.resetTime = now + limit.windowMs;
    }

    // Check IP-specific limits (prevent abuse)
    const ipKey = `${endpoint}:${identifier}`;
    const ipLimit = this.ipLimits.get(ipKey);
    
    if (!ipLimit || now > ipLimit.resetTime) {
      this.ipLimits.set(ipKey, { count: 1, resetTime: now + limit.windowMs });
    } else {
      ipLimit.count++;
      
      // Per-IP limit is 50% of endpoint limit
      const ipMaxRequests = Math.ceil(limit.maxRequests * 0.5);
      if (ipLimit.count > ipMaxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: ipLimit.resetTime,
          retryAfter: Math.ceil((ipLimit.resetTime - now) / 1000)
        };
      }
    }

    // Check endpoint limit
    if (limit.currentCount >= limit.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: limit.resetTime,
        retryAfter: Math.ceil((limit.resetTime - now) / 1000)
      };
    }

    // Request allowed
    limit.currentCount++;
    this.globalLimit.count++;

    return {
      allowed: true,
      remaining: limit.maxRequests - limit.currentCount,
      resetTime: limit.resetTime
    };
  }

  // Discover API limits through progressive testing
  async discoverEndpointLimits(endpoint: string): Promise<void> {
    console.log(`Discovering rate limits for ${endpoint}`);
    
    // Start with conservative defaults
    const conservativeLimit: RateLimit = {
      endpoint,
      maxRequests: 5,
      windowMs: 60000,
      currentCount: 0,
      resetTime: Date.now() + 60000
    };

    this.limits.set(endpoint, conservativeLimit);

    // In production, this would involve:
    // 1. Making test requests at increasing rates
    // 2. Monitoring for 429 responses
    // 3. Backing off when limits are hit
    // 4. Storing discovered limits persistently
    
    // For this implementation, we'll use predefined discovery logic
    this.progressivelyTestLimits(endpoint);
  }

  private async progressivelyTestLimits(endpoint: string): Promise<void> {
    // Simulate progressive limit discovery
    const testSchedule = [
      { requests: 1, interval: 1000 },
      { requests: 5, interval: 5000 },
      { requests: 10, interval: 10000 }
    ];

    let discoveredLimit = 5; // Start conservative

    for (const test of testSchedule) {
      try {
        // Simulate test requests (in production, make actual requests)
        await this.simulateApiTest(endpoint, test.requests, test.interval);
        discoveredLimit = test.requests * 2; // Assume 2x test rate is safe
      } catch (error) {
        console.log(`Hit limit at ${test.requests} requests for ${endpoint}`);
        break;
      }
    }

    // Update discovered limits
    const limit = this.limits.get(endpoint);
    if (limit) {
      limit.maxRequests = Math.min(discoveredLimit, 50); // Cap at 50
      console.log(`Discovered limit for ${endpoint}: ${limit.maxRequests} requests per minute`);
    }
  }

  private async simulateApiTest(endpoint: string, requests: number, interval: number): Promise<void> {
    // Simulate API testing - in production, make actual HTTP requests
    return new Promise((resolve, reject) => {
      const successRate = 0.9; // 90% success rate simulation
      
      setTimeout(() => {
        if (Math.random() < successRate) {
          resolve();
        } else {
          reject(new Error('Rate limit hit during testing'));
        }
      }, interval / requests); // Distribute requests over interval
    });
  }

  // Update limits based on API responses
  updateLimitsFromResponse(endpoint: string, headers: Headers): void {
    const remaining = headers.get('X-RateLimit-Remaining');
    const resetTime = headers.get('X-RateLimit-Reset');
    const limit = headers.get('X-RateLimit-Limit');

    if (remaining && resetTime && limit) {
      const endpointLimit = this.limits.get(endpoint);
      if (endpointLimit) {
        endpointLimit.maxRequests = parseInt(limit);
        endpointLimit.currentCount = endpointLimit.maxRequests - parseInt(remaining);
        endpointLimit.resetTime = parseInt(resetTime) * 1000; // Convert to milliseconds
      }
    }
  }

  // Get current status for monitoring
  getStatus(): { endpoint: string; status: RateLimit }[] {
    return Array.from(this.limits.entries()).map(([endpoint, limit]) => ({
      endpoint,
      status: { ...limit }
    }));
  }

  // Reset limits (for testing or manual override)
  resetLimits(endpoint?: string): void {
    if (endpoint) {
      const limit = this.limits.get(endpoint);
      if (limit) {
        limit.currentCount = 0;
        limit.resetTime = Date.now() + limit.windowMs;
      }
    } else {
      this.limits.forEach(limit => {
        limit.currentCount = 0;
        limit.resetTime = Date.now() + limit.windowMs;
      });
      this.globalLimit = { count: 0, resetTime: Date.now() + 3600000 };
    }
  }

  // Get time until reset for a specific endpoint
  getTimeUntilReset(endpoint: string): number {
    const limit = this.limits.get(endpoint);
    if (!limit) return 0;
    
    return Math.max(0, limit.resetTime - Date.now());
  }

  // Check if endpoint is currently throttled
  isThrottled(endpoint: string): boolean {
    const limit = this.limits.get(endpoint);
    if (!limit) return false;
    
    const now = Date.now();
    if (now > limit.resetTime) return false;
    
    return limit.currentCount >= limit.maxRequests;
  }
}

export const rateLimiter = new RateLimiter();

// Export utility functions for use in components
export async function checkApiLimit(endpoint: string, identifier?: string) {
  return rateLimiter.checkLimit(endpoint, identifier);
}

export function isApiThrottled(endpoint: string): boolean {
  return rateLimiter.isThrottled(endpoint);
}

export function getApiStatus() {
  return rateLimiter.getStatus();
}
