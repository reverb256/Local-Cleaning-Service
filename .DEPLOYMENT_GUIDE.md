# Deployment Guide - Updated June 2025

Comprehensive deployment guide for Workplace Janitorial Services with GitHub Pages + Cloudflare integration and dual deployment strategies supporting both static showcase and full-stack production environments.

## 🎯 Deployment Ready Status
✅ GitHub Actions workflow configured
✅ Static build with graceful fallbacks
✅ GitHub Pages deployment ready
✅ Cloudflare integration prepared (for future use)
✅ PWA and accessibility compliance maintained

## 🚀 Deployment Strategies

### 1. Static Deployment (GitHub Pages) - Client Showcase
**Perfect for demonstrations, portfolio showcase, and zero-cost hosting**

#### Features in Static Mode:
- All visual design and animations preserved
- Client-side quote calculator with fallback contact forms
- Direct phone/email links replace form submissions
- PWA functionality with offline support
- Admin panel automatically hidden

#### Setup Steps:
1. **Repository Configuration**
   ```bash
   # Copy GitHub Actions workflow
   cp github-pages-deploy.yml .github/workflows/deploy.yml
   
   # Ensure static files are in place
   ls client/public/.nojekyll
   ls client/public/404.html
   ls client/public/CNAME
   ```

2. **GitHub Pages Settings**
   - Repository Settings → Pages
   - Source: GitHub Actions
   - Custom domain: workplacejanitorial.ca

3. **Build and Deploy**
   ```bash
   # Automatic deployment on push to main
   git push origin main
   
   # Manual static build
   VITE_STATIC_BUILD=true vite build --config vite.config.static.ts
   ```

### 2. Full-Stack Deployment (Production) - Business Operations
**Complete functionality for actual business use**

#### Features in Full-Stack Mode:
- PostgreSQL database integration
- Real-time form processing
- AI chat system with admin panel
- Lead management and analytics
- Backend API for all business operations

#### Deployment Options:

##### Option A: Replit Deployments (Recommended)
```bash
# One-click deployment from Replit interface
# Automatic HTTPS and domain management
# Built-in PostgreSQL hosting
```

##### Option B: Docker Deployment
```bash
# Build and start containers
docker-compose up -d

# Verify services
docker-compose ps
```

##### Option C: Manual Server Deployment
```bash
# Production build
npm run build

# Start production server
NODE_ENV=production npm start
```

## 🔧 Environment Configuration

### Required Environment Variables
```env
# Database Configuration
DATABASE_URL=postgresql://user:pass@host:port/db
PGHOST=localhost
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=database_name

# Application Settings
NODE_ENV=production
PORT=5000

# Static Build Flag (GitHub Pages only)
VITE_STATIC_BUILD=true
```

### Security Configuration
```env
# Content Security Policy
CSP_ENABLED=true

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🗄️ Database Setup

### Schema Migration
```bash
# Push current schema to database
npm run db:push

# Verify tables created
# Check: users, quotes, contacts, bookings, chat_sessions, api_limits
```

### Sample Data (Optional)
```sql
-- Insert sample service areas
INSERT INTO business_zones (name, description) VALUES 
('Downtown Winnipeg', 'Central business district'),
('St. Boniface', 'Historic and medical district'),
('Transcona', 'Industrial and residential area');
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io (for GitHub Pages)
   
   Type: A
   Name: @
   Value: [Your server IP] (for production hosting)
   ```

2. **SSL Certificate**
   - GitHub Pages: Automatic SSL
   - Production: Configure SSL with Let's Encrypt or provider

### CDN Configuration (Optional)
```yaml
# Cloudflare settings for optimal performance
- Browser Cache TTL: 4 hours
- Security Level: Medium
- Minification: HTML, CSS, JS enabled
- Brotli Compression: Enabled
```

## 📊 Performance Optimization

### Build Optimizations
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Asset Optimization
- Images compressed with quality 85
- SVG icons optimized for size
- Fonts preloaded for faster rendering
- Critical CSS inlined

## 🔍 Post-Deployment Validation

### Automated Checks
```bash
# Health check endpoint
curl -f http://localhost:5000/api/health

# Database connectivity
curl -f http://localhost:5000/api/quotes

# Form submission test
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test"}'
```

### Manual Verification Checklist
- [ ] **Homepage loads correctly**
- [ ] **Quote calculator functions**
- [ ] **Contact forms submit successfully**
- [ ] **All images and assets load**
- [ ] **Mobile responsiveness works**
- [ ] **PWA installation prompt appears**
- [ ] **Performance scores 95+ on Lighthouse**
- [ ] **Accessibility audit passes WCAG AAA**
- [ ] **SSL certificate is valid**
- [ ] **Database queries execute properly**

### Monitoring Setup
```javascript
// Basic uptime monitoring
const healthCheck = setInterval(async () => {
  try {
    const response = await fetch('/api/health');
    if (!response.ok) {
      console.error('Health check failed');
      // Alert administrator
    }
  } catch (error) {
    console.error('Health check error:', error);
  }
}, 300000); // Check every 5 minutes
```

## 🚨 Troubleshooting

### Common Issues

#### Static Build Problems
```bash
# Issue: Build fails with module errors
# Solution: Ensure all imports use relative paths
# Check vite.config.static.ts configuration

# Issue: Assets not loading
# Solution: Verify base path is set to './' for GitHub Pages
```

#### Database Connection Issues
```bash
# Issue: Database connection timeout
# Solution: Check DATABASE_URL format and network access

# Issue: Tables not found
# Solution: Run database migration
npm run db:push
```

#### Performance Issues
```bash
# Issue: Slow loading times
# Solution: Enable compression and check bundle size
# Use vite-bundle-analyzer to identify large chunks

# Issue: High memory usage
# Solution: Implement pagination for large datasets
# Add connection pooling for database
```

### Error Monitoring
```typescript
// Production error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Production error:', err);
  
  // Send error to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Log to external service
  }
  
  res.status(500).json({
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Database connection pooling
- Session store externalization
- CDN implementation

### Vertical Scaling
- Memory optimization
- Database indexing
- Query optimization
- Caching strategies

## 🔐 Security Hardening

### Production Security Checklist
- [ ] **Environment variables secured**
- [ ] **Database credentials rotated**
- [ ] **HTTPS enforced**
- [ ] **CORS properly configured**
- [ ] **Rate limiting active**
- [ ] **Input validation enabled**
- [ ] **SQL injection protection**
- [ ] **XSS protection headers**
- [ ] **Security headers implemented**

### Backup Strategy
```bash
# Database backup script
#!/bin/bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated daily backups
0 2 * * * /path/to/backup-script.sh
```

This comprehensive deployment guide ensures successful deployment across both static showcase and production environments while maintaining security, performance, and reliability standards.