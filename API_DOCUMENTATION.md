# API Documentation

Comprehensive API reference for Workplace Janitorial Services platform with detailed endpoint specifications, authentication requirements, and usage examples.

## Base URL

```
Production: https://workplacejanitorial.ca/api
Development: http://localhost:5000/api
```

## Authentication

The API uses session-based authentication for protected endpoints.

```typescript
// Session configuration
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  sameSite: 'strict'
}
```

## Rate Limiting

All endpoints are protected with rate limiting:
- **General endpoints**: 100 requests per 15 minutes per IP
- **Contact endpoints**: 10 requests per 15 minutes per IP
- **Quote endpoints**: 20 requests per 15 minutes per IP

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": ["Validation error details"],
  "timestamp": "2025-06-09T01:00:00.000Z"
}
```

## Endpoints

### Health Check

#### GET /api/health
Returns server health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-06-09T01:00:00.000Z",
  "uptime": 3600000
}
```

### Quotes

#### GET /api/quotes
Retrieves all quote requests (admin access required).

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john@company.com",
    "phone": "204-555-0123",
    "address": "123 Main St, Winnipeg, MB",
    "squareFootage": 5000,
    "frequency": "weekly",
    "serviceType": "standard",
    "additionalServices": ["carpet-cleaning", "window-cleaning"],
    "estimatedPrice": "450.00",
    "status": "pending",
    "createdAt": "2025-06-09T01:00:00.000Z"
  }
]
```

#### POST /api/quotes
Submits a new quote request.

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "204-555-0123",
  "address": "123 Main St, Winnipeg, MB",
  "squareFootage": 5000,
  "frequency": "weekly",
  "serviceType": "standard",
  "additionalServices": ["carpet-cleaning"],
  "estimatedPrice": "450.00"
}
```

**Validation Schema:**
```typescript
{
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().min(1).max(500),
  squareFootage: z.number().min(100).max(1000000),
  frequency: z.enum(["daily", "weekly", "bi-weekly", "monthly"]),
  serviceType: z.enum(["standard", "deep", "post-construction"]),
  additionalServices: z.array(z.string()).optional(),
  estimatedPrice: z.string().regex(/^\d+\.\d{2}$/)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully! We'll contact you within 24 hours.",
  "quoteId": 1
}
```

#### GET /api/quotes/:id
Retrieves a specific quote by ID (admin access required).

**Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "204-555-0123",
  "address": "123 Main St, Winnipeg, MB",
  "squareFootage": 5000,
  "frequency": "weekly",
  "serviceType": "standard",
  "additionalServices": ["carpet-cleaning"],
  "estimatedPrice": "450.00",
  "status": "pending",
  "createdAt": "2025-06-09T01:00:00.000Z"
}
```

#### PATCH /api/quotes/:id/status
Updates quote status (admin access required).

**Request Body:**
```json
{
  "status": "approved"
}
```

**Valid Status Values:**
- `pending`
- `approved`
- `rejected`
- `completed`

### Contacts

#### GET /api/contacts
Retrieves all contact form submissions (admin access required).

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "204-555-0199",
    "subject": "Service Inquiry",
    "message": "Looking for weekly office cleaning services.",
    "status": "new",
    "createdAt": "2025-06-09T01:00:00.000Z"
  }
]
```

#### POST /api/contact
Submits a new contact form.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "204-555-0199",
  "subject": "Service Inquiry",
  "message": "Looking for weekly office cleaning services."
}
```

**Validation Schema:**
```typescript
{
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll respond within 2 hours during business hours.",
  "contactId": 1
}
```

#### PATCH /api/contacts/:id/status
Updates contact status (admin access required).

**Request Body:**
```json
{
  "status": "responded"
}
```

**Valid Status Values:**
- `new`
- `in-progress`
- `responded`
- `closed`

### Bookings

#### GET /api/bookings
Retrieves all service bookings (admin access required).

**Response:**
```json
[
  {
    "id": 1,
    "contactName": "Michael Johnson",
    "company": "Tech Solutions Inc",
    "email": "michael@techsolutions.com",
    "phone": "204-555-0177",
    "address": "456 Business Ave, Winnipeg, MB",
    "preferredDate": "2025-06-15T09:00:00.000Z",
    "frequency": "weekly",
    "serviceType": "standard",
    "specialRequirements": "Access after 6 PM only",
    "status": "pending",
    "createdAt": "2025-06-09T01:00:00.000Z"
  }
]
```

#### POST /api/bookings
Creates a new service booking.

**Request Body:**
```json
{
  "contactName": "Michael Johnson",
  "company": "Tech Solutions Inc",
  "email": "michael@techsolutions.com",
  "phone": "204-555-0177",
  "address": "456 Business Ave, Winnipeg, MB",
  "preferredDate": "2025-06-15T09:00:00.000Z",
  "frequency": "weekly",
  "serviceType": "standard",
  "specialRequirements": "Access after 6 PM only"
}
```

**Validation Schema:**
```typescript
{
  contactName: z.string().min(1).max(255),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1).max(500),
  preferredDate: z.string().datetime().optional(),
  frequency: z.enum(["one-time", "weekly", "bi-weekly", "monthly"]),
  serviceType: z.enum(["standard", "deep", "post-construction", "emergency"]),
  specialRequirements: z.string().optional()
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking request submitted successfully! We'll confirm your appointment within 24 hours.",
  "bookingId": 1
}
```

### AI Chat

#### POST /api/chat
Processes AI chat messages with contextual business information.

**Request Body:**
```json
{
  "message": "What are your office cleaning rates?",
  "sessionId": "session_123456789"
}
```

**Validation Schema:**
```typescript
{
  message: z.string().min(1).max(1000),
  sessionId: z.string().min(1).max(100)
}
```

**Response:**
```json
{
  "response": "Our office cleaning rates start at $0.08 per square foot for weekly service. For a typical 5,000 sq ft office, that's approximately $400 per week. We offer competitive rates with our 30-minute guarantee and include all supplies and equipment.",
  "sessionId": "session_123456789",
  "timestamp": "2025-06-09T01:00:00.000Z"
}
```

#### GET /api/chat/sessions/:sessionId
Retrieves chat session history (admin access required).

**Response:**
```json
{
  "sessionId": "session_123456789",
  "messages": [
    {
      "role": "user",
      "content": "What are your office cleaning rates?",
      "timestamp": "2025-06-09T01:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "Our office cleaning rates start at $0.08 per square foot...",
      "timestamp": "2025-06-09T01:00:01.000Z"
    }
  ],
  "createdAt": "2025-06-09T01:00:00.000Z"
}
```

### Admin Panel

#### POST /api/admin/commands
Executes AI orchestration commands (admin access required).

**Request Body:**
```json
{
  "command": "update hero section text to emphasize 30-minute guarantee",
  "target": "hero",
  "action": "update_text"
}
```

**Response:**
```json
{
  "success": true,
  "commandId": 1,
  "message": "Command queued for execution",
  "estimatedCompletion": "2025-06-09T01:05:00.000Z"
}
```

#### GET /api/admin/commands
Retrieves command execution history (admin access required).

**Response:**
```json
[
  {
    "id": 1,
    "command": "update hero section text to emphasize 30-minute guarantee",
    "target": "hero",
    "action": "update_text",
    "status": "completed",
    "result": "Hero section updated successfully",
    "createdAt": "2025-06-09T01:00:00.000Z",
    "executedAt": "2025-06-09T01:05:00.000Z"
  }
]
```

## Input Sanitization

All user inputs are sanitized using the following function:

```typescript
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    // Remove script tags and event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/vbscript:/gi, '')
    // Remove potential SQL injection patterns
    .replace(/(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/gi, '')
    // Remove HTML tags and encode special characters
    .replace(/<[^>]*>/g, '')
    .replace(/[<>&"']/g, (match) => {
      const htmlEntities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return htmlEntities[match] || match;
    })
    .trim()
    .substring(0, 1000); // Limit input length
}
```

## Example Usage

### JavaScript/TypeScript Client

```typescript
class WorkplaceJanitorialAPI {
  private baseURL = 'https://workplacejanitorial.ca/api';
  
  async submitQuote(quoteData: QuoteRequest): Promise<QuoteResponse> {
    const response = await fetch(`${this.baseURL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
  
  async submitContact(contactData: ContactRequest): Promise<ContactResponse> {
    const response = await fetch(`${this.baseURL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
      credentials: 'include'
    });
    
    return response.json();
  }
  
  async sendChatMessage(message: string, sessionId: string): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
      credentials: 'include'
    });
    
    return response.json();
  }
}
```

### cURL Examples

```bash
# Submit a quote request
curl -X POST https://workplacejanitorial.ca/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@company.com",
    "phone": "204-555-0123",
    "address": "123 Main St, Winnipeg, MB",
    "squareFootage": 5000,
    "frequency": "weekly",
    "serviceType": "standard",
    "additionalServices": ["carpet-cleaning"],
    "estimatedPrice": "450.00"
  }'

# Submit a contact form
curl -X POST https://workplacejanitorial.ca/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "204-555-0199",
    "subject": "Service Inquiry",
    "message": "Looking for weekly office cleaning services."
  }'

# Send chat message
curl -X POST https://workplacejanitorial.ca/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your office cleaning rates?",
    "sessionId": "session_123456789"
  }'
```

## Business Hours

API responses include business context:
- **Phone Support**: Monday-Friday 8AM-6PM, Saturday 9AM-4PM (CST)
- **Emergency Services**: Available 24/7
- **Response Time**: Contact forms answered within 2 hours during business hours

## Contact Information

- **Phone**: (204) 415-2910
- **Email**: info@workplacejanitorial.ca
- **Address**: 2-761 Marion Street, Winnipeg, MB R2J 0K6

This API documentation provides comprehensive information for integrating with the Workplace Janitorial Services platform, ensuring secure and efficient communication for all business operations.