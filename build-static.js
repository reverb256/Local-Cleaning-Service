#!/usr/bin/env node

/**
 * Static build script for GitHub Pages deployment
 * Creates a production-ready static site with graceful fallbacks
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildStatic() {
  console.log('🏗️  Building static site for GitHub Pages...');
  
  try {
    // Build with static configuration
    await build({
      configFile: resolve(__dirname, 'vite.config.static.ts'),
      mode: 'production',
      define: {
        'import.meta.env.VITE_STATIC_BUILD': JSON.stringify('true')
      }
    });

    console.log('✅ Static build completed');

    // Create CNAME file for custom domain
    const cnameContent = 'workplacejanitorial.ca';
    writeFileSync(resolve(__dirname, 'dist/CNAME'), cnameContent);
    console.log('📄 CNAME file created');

    // Ensure .nojekyll exists
    if (!existsSync(resolve(__dirname, 'dist/.nojekyll'))) {
      writeFileSync(resolve(__dirname, 'dist/.nojekyll'), '');
      console.log('🚫 .nojekyll file created');
    }

    // Copy favicon files
    const faviconFiles = ['favicon.svg', 'favicon-32x32.png', 'favicon-16x16.png'];
    faviconFiles.forEach(file => {
      const src = resolve(__dirname, 'client/public', file);
      const dest = resolve(__dirname, 'dist', file);
      if (existsSync(src)) {
        copyFileSync(src, dest);
        console.log(`📁 Copied ${file}`);
      }
    });

    // Update index.html with static build markers
    const indexPath = resolve(__dirname, 'dist/index.html');
    let indexContent = readFileSync(indexPath, 'utf8');
    
    // Add static build meta tag
    indexContent = indexContent.replace(
      '<head>',
      '<head>\n    <meta name="build-type" content="static">'
    );
    
    writeFileSync(indexPath, indexContent);
    console.log('🏷️  Added static build markers');

    console.log('\n🎉 Static site ready for GitHub Pages deployment!');
    console.log('📁 Files generated in ./dist/');
    console.log('🌐 Deploy to GitHub Pages to view live site');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildStatic();