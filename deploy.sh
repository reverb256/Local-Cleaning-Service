#!/bin/bash

# Workplace Janitorial Services - Deployment Script
# Deploys to GitHub Pages with Cloudflare integration

set -e

echo "🚀 Starting deployment process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run: git init && git remote add origin <your-repo-url>"
    exit 1
fi

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi

if [ ! -f "vite.config.static.ts" ]; then
    echo "❌ Error: vite.config.static.ts not found"
    exit 1
fi

echo "✅ Repository structure verified"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build static version
echo "🔨 Building static site..."
export VITE_STATIC_BUILD=true
npm run build -- --config vite.config.static.ts

# Verify build output
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: Build failed - index.html not found"
    exit 1
fi

echo "✅ Static build completed successfully"

# Check for CNAME file
if [ -f "client/public/CNAME" ] && [ -s "client/public/CNAME" ]; then
    echo "✅ Custom domain configured: $(cat client/public/CNAME)"
else
    echo "ℹ️  Deploying to GitHub Pages default domain"
fi

# Commit and push changes
echo "📤 Preparing deployment..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to main branch
echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Go to GitHub repository settings"
echo "2. Navigate to Pages section"
echo "3. Set source to 'GitHub Actions'"
echo "4. Wait for deployment (2-5 minutes)"
echo ""
echo "🌐 Your site will be available at:"
if [ -f "client/public/CNAME" ] && [ -s "client/public/CNAME" ]; then
    echo "   https://$(cat client/public/CNAME)"
else
    echo "   https://yourusername.github.io/repository-name"
    echo "   (Replace with your actual GitHub username and repository name)"
fi
echo ""
echo "🔧 For Cloudflare integration:"
echo "1. Add DNS records pointing to GitHub Pages"
echo "2. Configure SSL/TLS settings"
echo "3. Enable performance optimizations"
echo ""
echo "📚 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions"