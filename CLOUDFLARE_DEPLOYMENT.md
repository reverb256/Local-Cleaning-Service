# Cloudflare Pages + GitHub Pages Deployment Guide

## Quick Setup Overview

### Option 1: GitHub Pages (Recommended for Simple Setup)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Configure custom domain in Cloudflare
4. Automatic SSL and CDN optimization

### Option 2: Cloudflare Pages (Advanced Features)
1. Connect GitHub repository to Cloudflare Pages
2. Configure build settings
3. Deploy with enhanced performance features

## GitHub Pages + Cloudflare Setup

### Step 1: Repository Configuration
```bash
# Ensure your repository is pushed to GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Set **Source** to "GitHub Actions"
4. The workflow file `.github/workflows/deploy.yml` is already configured

### Step 3: Cloudflare Domain Configuration

#### DNS Records Setup:
```
Type: CNAME
Name: www
Value: yourusername.github.io
TTL: Auto

Type: CNAME  
Name: @
Value: yourusername.github.io
TTL: Auto
```

#### Custom Domain File:
```bash
# Add your domain to client/public/CNAME
echo "workplacejanitorial.com" > client/public/CNAME
```

### Step 4: Cloudflare Page Rules
Configure these rules for optimal performance:

#### SSL/TLS Settings:
- **SSL/TLS encryption mode**: Full (strict)
- **Always Use HTTPS**: On
- **HTTP Strict Transport Security (HSTS)**: Enabled

#### Performance Settings:
- **Auto Minify**: CSS, JavaScript, HTML
- **Brotli**: On
- **Early Hints**: On
- **Rocket Loader**: On

#### Caching Rules:
```
Cache Level: Standard
Browser Cache TTL: 4 hours
Edge Cache TTL: 2 hours
```

## Cloudflare Pages Direct Deployment

### Step 1: Connect Repository
1. Login to Cloudflare Dashboard
2. Go to **Pages** → **Create a project**
3. Connect to GitHub repository
4. Select your repository

### Step 2: Build Configuration
```yaml
Build command: npm run build -- --config vite.config.static.ts
Build output directory: dist
Root directory: /
Environment variables:
  VITE_STATIC_BUILD: true
  NODE_VERSION: 20
```

### Step 3: Custom Domain
1. Go to **Pages** → **Custom domains**
2. Add your domain: `workplacejanitorial.com`
3. Cloudflare automatically configures DNS

## Domain Configuration Examples

### For workplacejanitorial.com:
```bash
# Add to client/public/CNAME
echo "workplacejanitorial.com" > client/public/CNAME
```

### DNS Configuration:
```
A Record:
Name: @
Value: 185.199.108.153
TTL: Auto

CNAME Record:
Name: www
Value: workplacejanitorial.com
TTL: Auto
```

## Performance Optimizations

### Cloudflare Settings:
- **Speed** → **Optimization**
  - Auto Minify: CSS, JS, HTML ✓
  - Brotli Compression ✓
  - Early Hints ✓
  - Rocket Loader ✓

### Security Settings:
- **Security** → **WAF**
  - Security Level: Medium
  - Bot Fight Mode: On
  - Browser Integrity Check: On

### Caching Settings:
- **Caching** → **Configuration**
  - Caching Level: Standard
  - Browser Cache TTL: Respect Existing Headers
  - Development Mode: Off (for production)

## Deployment Commands

### Local Build Testing:
```bash
# Test static build locally
export VITE_STATIC_BUILD=true
npm run build -- --config vite.config.static.ts
npm run preview
```

### GitHub Pages Deployment:
```bash
# Push to trigger deployment
git push origin main

# Check deployment status
# Visit: https://github.com/username/repo/actions
```

### Cloudflare Pages Deployment:
```bash
# Direct deployment via GitHub integration
# Or manual deployment:
npm run build -- --config vite.config.static.ts
npx wrangler pages publish dist --project-name workplace-janitorial-services
```

## SSL Certificate Setup

### Automatic SSL (Recommended):
Both GitHub Pages and Cloudflare provide automatic SSL certificates:
- GitHub Pages: Let's Encrypt certificates
- Cloudflare: Universal SSL certificates

### Custom SSL (Advanced):
For custom certificates:
1. Generate certificate for your domain
2. Upload to Cloudflare SSL/TLS → Custom Certificates
3. Configure origin certificates for end-to-end encryption

## Monitoring and Analytics

### Cloudflare Analytics:
- **Analytics & Logs** → **Web Analytics**
- Real-time traffic monitoring
- Performance metrics
- Security threat detection

### Performance Monitoring:
```javascript
// Added to index.html for monitoring
<script>
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  // Cloudflare Web Analytics beacon
  // Performance monitoring code
}
</script>
```

## Troubleshooting

### Common Issues:

#### DNS Propagation:
```bash
# Check DNS propagation
nslookup workplacejanitorial.com
dig workplacejanitorial.com
```

#### Build Failures:
```bash
# Check build logs in GitHub Actions
# Verify environment variables
# Test build locally first
```

#### SSL Issues:
- Verify Cloudflare SSL/TLS mode is "Full (strict)"
- Check certificate status in Cloudflare dashboard
- Ensure HTTPS redirect is enabled

### Debug Commands:
```bash
# Test deployment locally
npm run build -- --config vite.config.static.ts
cd dist && python -m http.server 8000

# Check static build detection
curl -I https://workplacejanitorial.com
```

## Migration from Other Platforms

### From Netlify:
1. Export DNS settings
2. Configure Cloudflare DNS
3. Update deployment workflow
4. Test functionality

### From Vercel:
1. Export project configuration
2. Adapt build commands
3. Configure custom domain
4. Update API endpoints (if any)

## Cost Comparison

| Platform | Cost | Features |
|----------|------|----------|
| GitHub Pages | Free | Basic hosting, 100GB bandwidth |
| Cloudflare Pages | Free | Unlimited bandwidth, advanced features |
| Combined Setup | Free | Best of both platforms |

## Security Checklist

- ✅ HTTPS enforcement
- ✅ HSTS headers
- ✅ Content Security Policy
- ✅ XSS protection
- ✅ Bot protection
- ✅ DDoS mitigation
- ✅ Rate limiting

## Next Steps After Deployment

1. **Test all functionality** on live domain
2. **Configure monitoring** and alerts
3. **Set up backup** domain (optional)
4. **Update business listings** with new URL
5. **Monitor performance** metrics
6. **Configure SEO** tools (Google Search Console)

This setup provides enterprise-grade hosting with global CDN, security features, and 99.9% uptime guarantee at no cost.