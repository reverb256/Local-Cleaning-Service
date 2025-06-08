# API Documentation - Workplace Janitorial Services

## Overview
Complete REST API documentation for the Workplace Janitorial Services platform, including AI orchestration endpoints, business data management, and accessibility features.

## Base URL
```
Development: http://localhost:5000/api
Production: https://workplacejanitorial.ca/api
```

## Authentication
Currently using session-based authentication. All endpoints are publicly accessible for quote requests and contact forms.

## Core Business Endpoints

### Quotes Management

#### Create Quote Request
```http
POST /api/quotes
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "(204) 555-0123",
  "serviceType": "office-cleaning",
  "squareFootage": 2500,
  "frequency": "weekly",
  "additionalServices": ["carpet-cleaning", "window-cleaning"],
  "address": "123 Business Ave, Winnipeg, MB"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "(204) 555-0123",
  "serviceType": "office-cleaning",
  "squareFootage": 2500,
  "frequency": "weekly",
  "additionalServices": ["carpet-cleaning", "window-cleaning"],
  "address": "123 Business Ave, Winnipeg, MB",
  "status": "pending",
  "createdAt": "2025-01-08T22:50:00.000Z"
}
```

#### Get All Quotes
```http
GET /api/quotes
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john@company.com",
    "status": "pending",
    "createdAt": "2025-01-08T22:50:00.000Z"
  }
]
```

#### Get Quote by ID
```http
GET /api/quotes/{id}
```

#### Update Quote Status
```http
PATCH /api/quotes/{id}/status
Content-Type: application/json

{
  "status": "approved"
}
```

### Contact Management

#### Submit Contact Form
```http
POST /api/contacts
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@company.com",
  "phone": "(204) 555-0124",
  "subject": "General Inquiry",
  "message": "I need information about your cleaning services."
}
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@company.com",
  "phone": "(204) 555-0124",
  "subject": "General Inquiry",
  "message": "I need information about your cleaning services.",
  "status": "new",
  "createdAt": "2025-01-08T22:50:00.000Z"
}
```

#### Get All Contacts
```http
GET /api/contacts
```

### Booking Management

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "Office Complex Ltd",
  "email": "manager@office.com",
  "phone": "(204) 555-0125",
  "serviceDate": "2025-01-15T09:00:00.000Z",
  "serviceType": "deep-cleaning",
  "duration": 4,
  "specialRequests": "After hours cleaning required"
}
```

#### Get All Bookings
```http
GET /api/bookings
```

## AI Orchestration Endpoints

### Chat System

#### Send Chat Message
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What are your business hours?",
  "sessionId": "session_123456789"
}
```

**Response:**
```json
{
  "response": "Our business hours are Monday to Friday, 8:00 AM to 5:00 PM. We also offer 24/7 emergency cleaning services for urgent situations.",
  "confidence": 0.95,
  "fallbackToHuman": false,
  "responseTime": 245,
  "sessionId": "session_123456789"
}
```

#### Get Chat Session
```http
GET /api/chat/sessions/{sessionId}
```

**Response:**
```json
{
  "sessionId": "session_123456789",
  "messages": [
    {
      "role": "user",
      "content": "What are your business hours?",
      "timestamp": "2025-01-08T22:50:00.000Z"
    },
    {
      "role": "assistant", 
      "content": "Our business hours are Monday to Friday, 8:00 AM to 5:00 PM...",
      "timestamp": "2025-01-08T22:50:01.000Z"
    }
  ],
  "createdAt": "2025-01-08T22:50:00.000Z"
}
```

### Knowledge Base Queries

#### Search Knowledge Base
```http
GET /api/knowledge?q=pricing&category=services&limit=5
```

**Response:**
```json
{
  "results": [
    {
      "id": "kb_001",
      "category": "pricing",
      "question": "What are your cleaning service rates?",
      "answer": "Our rates vary based on square footage, frequency, and services required. Contact us for a free, customized quote.",
      "keywords": ["pricing", "rates", "cost", "quote"],
      "priority": 1
    }
  ],
  "total": 1,
  "query": "pricing"
}
```

## Rate Limiting

### Check Rate Limits
```http
GET /api/rate-limits/{endpoint}
```

**Response:**
```json
{
  "endpoint": "/api/chat",
  "requestCount": 5,
  "resetTime": "2025-01-08T23:00:00.000Z",
  "limitReached": false,
  "remainingRequests": 5
}
```

### Reset Rate Limits
```http
DELETE /api/rate-limits/{endpoint}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required field: email",
    "details": {
      "field": "email",
      "reason": "Required field is missing"
    }
  },
  "timestamp": "2025-01-08T22:50:00.000Z"
}
```

### Common Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error (server error)

## Business Logic

### Service Types
```json
{
  "serviceTypes": [
    {
      "id": "office-cleaning",
      "name": "Office Cleaning",
      "description": "Regular office maintenance cleaning",
      "basePrice": "Starting at $0.05/sq ft"
    },
    {
      "id": "deep-cleaning", 
      "name": "Deep Cleaning",
      "description": "Comprehensive sanitization service",
      "basePrice": "Starting at $0.12/sq ft"
    },
    {
      "id": "carpet-cleaning",
      "name": "Carpet Cleaning", 
      "description": "Professional carpet care",
      "basePrice": "Starting at $0.25/sq ft"
    },
    {
      "id": "window-cleaning",
      "name": "Window Cleaning",
      "description": "Interior and exterior windows",
      "basePrice": "Starting at $3.00/window"
    },
    {
      "id": "post-construction",
      "name": "Post-Construction Cleanup",
      "description": "After renovation cleaning",
      "basePrice": "Starting at $0.15/sq ft"
    }
  ]
}
```

### Frequency Options
```json
{
  "frequencies": [
    {"id": "daily", "name": "Daily", "discount": 0.15},
    {"id": "weekly", "name": "Weekly", "discount": 0.10},
    {"id": "bi-weekly", "name": "Bi-weekly", "discount": 0.05},
    {"id": "monthly", "name": "Monthly", "discount": 0.00},
    {"id": "one-time", "name": "One-time", "discount": 0.00}
  ]
}
```

### Service Areas
```json
{
  "serviceAreas": [
    "Winnipeg Downtown",
    "St. Boniface", 
    "Fort Garry",
    "Transcona",
    "North End",
    "West Kildonan",
    "East Kildonan", 
    "River Heights",
    "Tuxedo",
    "Charleswood"
  ]
}
```

## AI Knowledge Categories

### Available Categories
- `services` - Cleaning services and descriptions
- `pricing` - Cost information and quotes
- `scheduling` - Availability and booking
- `company` - Business information and policies
- `eco-friendly` - Green cleaning practices
- `insurance` - Coverage and guarantees
- `emergency` - 24/7 services
- `contact` - Communication methods

### Sample Knowledge Items
```json
{
  "knowledgeBase": [
    {
      "id": "kb_guarantee",
      "category": "company",
      "question": "Do you offer any service guarantees?",
      "answer": "Yes! We offer a 30-minute guarantee - if we can't respond to your service call within 30 minutes, your next cleaning is free. We also provide full WCB coverage and comprehensive insurance.",
      "keywords": ["guarantee", "30-minute", "insurance", "WCB"],
      "priority": 1
    },
    {
      "id": "kb_background_checks",
      "category": "company", 
      "question": "Are your staff background checked?",
      "answer": "Absolutely. All our cleaning staff undergo thorough criminal background checks before employment. We prioritize the security and trust of our clients.",
      "keywords": ["background check", "criminal", "security", "trust", "staff"],
      "priority": 1
    }
  ]
}
```

## Webhook Integration

### Quote Status Updates
```http
POST /api/webhooks/quote-status
Content-Type: application/json

{
  "quoteId": 1,
  "oldStatus": "pending",
  "newStatus": "approved",
  "timestamp": "2025-01-08T22:50:00.000Z"
}
```

### Contact Form Notifications
```http
POST /api/webhooks/contact-received
Content-Type: application/json

{
  "contactId": 1,
  "priority": "normal",
  "subject": "General Inquiry",
  "timestamp": "2025-01-08T22:50:00.000Z"
}
```

## Security Headers

All API responses include security headers:
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## CORS Policy
```javascript
{
  "origin": ["https://workplacejanitorial.ca", "http://localhost:5000"],
  "methods": ["GET", "POST", "PATCH", "DELETE"],
  "allowedHeaders": ["Content-Type", "Authorization"],
  "credentials": true
}
```

---

*API Documentation for Workplace Janitorial Services - Professional office cleaning with modern technology integration.*