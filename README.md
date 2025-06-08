# Workplace Janitorial Services - Modern Web Platform

A comprehensive office cleaning service website featuring integrated AI orchestration, WCAG AAA accessibility compliance, and glassmorphism design based on authentic Workplace Janitorial Services branding.

## Features

### 🏢 Professional Business Website
- **Authentic Branding**: Sky blue (#55C7F7) and lime green (#A4D65E) color scheme
- **Glassmorphism Design**: Modern glass-effect UI with diamond geometric elements
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Complete meta tags, Open Graph, and Schema.org markup

### ♿ WCAG AAA Accessibility Compliance
- **Superior Contrast**: 7:1+ contrast ratios for all text elements
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Screen Reader Support**: Comprehensive ARIA labels and semantic HTML
- **Motion Preferences**: Respects user's reduced motion settings
- **Skip Links**: Navigation bypass for assistive technologies

### 🤖 AI Orchestration System
- **RAG-Powered Chat**: Retrieval-Augmented Generation with authentic business knowledge
- **Rate Limiting**: API protection with intelligent request management
- **Content Optimization**: SEO and Cloudflare optimization
- **Fallback Systems**: Human handoff for complex inquiries

### 📊 Database Integration
- **PostgreSQL Backend**: Persistent storage for all user interactions
- **Drizzle ORM**: Type-safe database operations
- **Data Models**: Quotes, contacts, bookings, chat sessions, API limits

## Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first styling with custom glassmorphism effects
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management and caching
- **Shadcn/ui**: Accessible UI component library

### Backend
- **Node.js/Express**: RESTful API server
- **PostgreSQL**: Production-ready database
- **Drizzle ORM**: Type-safe database toolkit
- **WebSocket**: Real-time AI chat functionality

### Development Tools
- **Vite**: Fast development server and build tool
- **ESBuild**: Lightning-fast JavaScript bundler
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/TS)    │◄──►│   (Express/TS)  │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ UI Components   │    │ API Routes      │    │ Data Models     │
│ - Header/Footer │    │ - Quotes        │    │ - Users         │
│ - Hero Section  │    │ - Contacts      │    │ - Quotes        │
│ - Services      │    │ - Bookings      │    │ - Contacts      │
│ - AI Chat       │    │ - AI Chat       │    │ - Bookings      │
│ - Contact Forms │    │ - Rate Limits   │    │ - Chat Sessions │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Business Information

### Workplace Janitorial Services
- **Location**: 2-761 Marion Street, Winnipeg, MB R2J 0K6
- **Phone**: (204) 415-2910
- **Email**: info@officecleaningwinnipeg.com
- **Service Area**: Greater Winnipeg Area

### Key Features
- ✅ **30-Minute Guarantee**: Rapid response to service calls
- ✅ **WCB Coverage**: Full Workers' Compensation Board coverage
- ✅ **Criminal Background Checks**: All staff thoroughly vetted
- ✅ **Eco-Friendly**: Green cleaning products and practices
- ✅ **Fully Insured**: Comprehensive liability coverage

### Services Offered
1. **Office Cleaning**: Daily, weekly, bi-weekly, monthly schedules
2. **Deep Cleaning**: Comprehensive sanitization services
3. **Carpet Cleaning**: Professional carpet care and maintenance
4. **Window Cleaning**: Interior and exterior window services
5. **Post-Construction**: Cleanup after renovations or construction
6. **Emergency Services**: 24/7 availability for urgent needs

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd workplace-janitorial-services
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Database connection is automatically configured
# Additional environment variables can be added as needed
```

4. **Database Setup**
```bash
# Push database schema
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## AI Orchestration System

### Knowledge Base
The AI system includes comprehensive knowledge about:
- All cleaning services and pricing structures
- Business hours and availability
- Service guarantees and insurance coverage
- Eco-friendly practices and certifications
- Service area and contact information

### RAG Implementation
```typescript
// Retrieval-Augmented Generation system
export class RAGSystem {
  private vectorStore: Map<string, number[]> = new Map();
  
  public retrieveRelevantKnowledge(query: string, limit: number = 3): KnowledgeItem[] {
    // Vector similarity search implementation
  }
  
  public getAnswerWithContext(query: string): string {
    // Context-aware response generation
  }
}
```

### Rate Limiting
- **Per Minute**: 10 requests maximum
- **Per Hour**: 100 requests maximum  
- **Adaptive Limits**: Automatic API discovery and optimization

## Accessibility Features

### WCAG AAA Compliance
- **Level AAA**: Highest accessibility standard achieved
- **Contrast Ratios**: 7:1+ for all text elements
- **Font Sizes**: Minimum 16px, scalable to 200%
- **Focus Management**: Visible focus indicators throughout

### Assistive Technology Support
- **Screen Readers**: NVDA, JAWS, VoiceOver compatibility
- **Keyboard Navigation**: Complete keyboard accessibility
- **Voice Control**: Compatible with voice navigation software
- **High Contrast**: Supports high contrast display modes

### Testing Tools Integration
```bash
# Accessibility testing (when available)
npm run test:a11y

# Lighthouse audit
npm run audit
```

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Deployment Platforms
- **Replit Deployments**: One-click deployment
- **Vercel**: Automatic deployments from Git
- **Railway**: PostgreSQL hosting
- **Heroku**: Full-stack deployment

## API Endpoints

### Core Routes
- `GET /api/quotes` - Retrieve all quotes
- `POST /api/quotes` - Create new quote request
- `GET /api/contacts` - Retrieve contact submissions
- `POST /api/contacts` - Submit contact form
- `POST /api/chat` - AI chat interactions

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Quotes table  
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  service_type VARCHAR(255) NOT NULL,
  square_footage INTEGER,
  frequency VARCHAR(255),
  additional_services TEXT[],
  address TEXT,
  status VARCHAR(255) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Additional tables for contacts, bookings, chat sessions, etc.
```

## Contributing

### Development Guidelines
1. **Code Style**: TypeScript with strict mode enabled
2. **Components**: Functional components with hooks
3. **Styling**: Tailwind CSS utility classes
4. **Testing**: Jest and React Testing Library
5. **Accessibility**: WCAG AAA compliance required

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is proprietary software developed for Workplace Janitorial Services.

## Support

### Technical Support
- **Documentation**: See `/docs` directory
- **Issues**: Create GitHub issue for bugs
- **Features**: Contact development team

### Business Inquiries
- **Email**: info@officecleaningwinnipeg.com
- **Phone**: (204) 415-2910
- **Address**: 2-761 Marion Street, Winnipeg, MB R2J 0K6

---

© 2025 Reverb Web Design. All rights reserved.

*Professional office cleaning services with modern web technology and full accessibility compliance.*