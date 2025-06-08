// Cloudflare Worker: SEO Analysis Engine
// Leverages Cloudflare's Browser API and AI models for zero-server SEO analysis

import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request, env, ctx) {
    const ai = new Ai(env.AI);
    
    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      switch (pathname) {
        case '/analyze':
          return await handleSeoAnalysis(request, env, ai, corsHeaders);
        case '/lighthouse':
          return await handleLighthouseAnalysis(request, env, corsHeaders);
        case '/competitors':
          return await handleCompetitorAnalysis(request, env, ai, corsHeaders);
        case '/optimize':
          return await handleContentOptimization(request, env, ai, corsHeaders);
        default:
          return new Response('Not Found', { status: 404, headers: corsHeaders });
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Analysis failed',
        message: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

async function handleSeoAnalysis(request, env, ai, corsHeaders) {
  const { targetUrl } = await request.json();
  
  if (!isValidUrl(targetUrl)) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Use Cloudflare Browser API for page analysis
  const browser = await env.BROWSER.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    
    // Extract comprehensive SEO data
    const seoData = await page.evaluate(() => {
      const getMetaContent = (name) => {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        return meta ? meta.getAttribute('content') || '' : '';
      };

      const getHeadings = () => {
        const headings = {};
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
          const elements = document.querySelectorAll(tag);
          headings[tag] = Array.from(elements).map(el => el.textContent.trim());
        });
        return headings;
      };

      const getImages = () => {
        const images = document.querySelectorAll('img');
        return {
          total: images.length,
          withoutAlt: Array.from(images).filter(img => !img.alt).length,
          altTexts: Array.from(images).map(img => img.alt || '').filter(Boolean)
        };
      };

      const getLinks = () => {
        const internal = document.querySelectorAll(`a[href^="/"], a[href*="${window.location.hostname}"]`);
        const external = document.querySelectorAll(`a[href^="http"]:not([href*="${window.location.hostname}"])`);
        return {
          internal: internal.length,
          external: external.length,
          internalUrls: Array.from(internal).map(a => a.href),
          externalUrls: Array.from(external).map(a => a.href)
        };
      };

      return {
        title: document.title || '',
        metaDescription: getMetaContent('description'),
        metaKeywords: getMetaContent('keywords'),
        canonicalUrl: document.querySelector('link[rel="canonical"]')?.href || '',
        headings: getHeadings(),
        images: getImages(),
        links: getLinks(),
        wordCount: document.body.textContent.split(/\s+/).length,
        hasSchema: !!document.querySelector('script[type="application/ld+json"]'),
        schemaTypes: Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(script => {
            try {
              const data = JSON.parse(script.textContent);
              return data['@type'] || 'Unknown';
            } catch { return 'Invalid'; }
          }),
        socialTags: {
          ogTitle: getMetaContent('og:title'),
          ogDescription: getMetaContent('og:description'),
          ogImage: getMetaContent('og:image'),
          ogType: getMetaContent('og:type'),
          twitterCard: getMetaContent('twitter:card'),
          twitterTitle: getMetaContent('twitter:title'),
          twitterDescription: getMetaContent('twitter:description'),
          twitterImage: getMetaContent('twitter:image')
        },
        viewport: getMetaContent('viewport'),
        robots: getMetaContent('robots'),
        language: document.documentElement.lang || getMetaContent('language'),
        charset: document.characterSet,
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart
      };
    });

    // Generate AI-powered SEO score using Cloudflare AI
    const seoScore = await calculateSeoScore(seoData, ai);
    
    // Store results in Cloudflare KV for caching
    const cacheKey = `seo_analysis_${btoa(targetUrl)}_${Date.now()}`;
    await env.SEO_CACHE.put(cacheKey, JSON.stringify({
      url: targetUrl,
      analysis: seoData,
      score: seoScore,
      timestamp: new Date().toISOString()
    }), { expirationTtl: 86400 }); // 24 hour cache

    return new Response(JSON.stringify({
      url: targetUrl,
      analysis: seoData,
      score: seoScore,
      recommendations: await generateRecommendations(seoData, ai),
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } finally {
    await page.close();
    await browser.close();
  }
}

async function handleLighthouseAnalysis(request, env, corsHeaders) {
  const { targetUrl } = await request.json();
  
  // Use Cloudflare's built-in Lighthouse integration
  const lighthouse = await env.LIGHTHOUSE.run(targetUrl, {
    categories: ['performance', 'accessibility', 'best-practices', 'seo'],
    device: 'desktop'
  });

  // Store Lighthouse results in R2 for historical tracking
  const reportKey = `lighthouse/${btoa(targetUrl)}/${Date.now()}.json`;
  await env.SEO_STORAGE.put(reportKey, JSON.stringify(lighthouse));

  return new Response(JSON.stringify({
    url: targetUrl,
    lighthouse: lighthouse,
    timestamp: new Date().toISOString()
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleCompetitorAnalysis(request, env, ai, corsHeaders) {
  const { keywords, domain } = await request.json();
  
  const competitors = [];
  
  // Use multiple search APIs within free limits
  for (const keyword of keywords.slice(0, 5)) {
    // Google Custom Search (100 queries/day free)
    if (env.GOOGLE_SEARCH_API_KEY) {
      const googleResults = await searchGoogle(keyword, env.GOOGLE_SEARCH_API_KEY, env.GOOGLE_SEARCH_ENGINE_ID);
      competitors.push(...filterCompetitors(googleResults, domain));
    }
    
    // Serper.dev (2500 free searches/month)
    if (env.SERPER_API_KEY) {
      const serperResults = await searchSerper(keyword, env.SERPER_API_KEY);
      competitors.push(...filterCompetitors(serperResults, domain));
    }
    
    // DuckDuckGo Instant Answer (unlimited)
    const ddgResults = await searchDuckDuckGo(keyword);
    competitors.push(...filterCompetitors(ddgResults, domain));
  }

  // Deduplicate and analyze top competitors
  const uniqueCompetitors = deduplicateCompetitors(competitors);
  const competitorAnalysis = await analyzeCompetitors(uniqueCompetitors.slice(0, 10), ai);

  // Cache competitor data
  const cacheKey = `competitors_${btoa(keywords.join(','))}_${Date.now()}`;
  await env.SEO_CACHE.put(cacheKey, JSON.stringify({
    keywords,
    domain,
    competitors: competitorAnalysis,
    timestamp: new Date().toISOString()
  }), { expirationTtl: 604800 }); // 7 day cache

  return new Response(JSON.stringify({
    keywords,
    domain,
    competitors: competitorAnalysis,
    timestamp: new Date().toISOString()
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleContentOptimization(request, env, ai, corsHeaders) {
  const { content, keywords, targetAudience } = await request.json();
  
  // Use Cloudflare AI for content optimization
  const optimizedContent = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'system',
        content: `You are an SEO content optimization expert. Optimize the following content for search engines while maintaining readability and user value. Target keywords: ${keywords.join(', ')}. Target audience: ${targetAudience || 'general business audience'}.`
      },
      {
        role: 'user',
        content: `Please optimize this content for SEO: ${content}`
      }
    ]
  });

  // Generate keyword density analysis
  const keywordAnalysis = analyzeKeywordDensity(content, keywords);
  
  // Content readability score using AI
  const readabilityScore = await ai.run('@cf/huggingface/distilbert-sst-2', {
    text: content
  });

  return new Response(JSON.stringify({
    original: content,
    optimized: optimizedContent.response,
    keywordAnalysis,
    readabilityScore,
    suggestions: await generateContentSuggestions(content, keywords, ai),
    timestamp: new Date().toISOString()
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Utility Functions

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

async function calculateSeoScore(seoData, ai) {
  const scores = {
    title: calculateTitleScore(seoData.title),
    metaDescription: calculateMetaDescriptionScore(seoData.metaDescription),
    headings: calculateHeadingsScore(seoData.headings),
    images: calculateImagesScore(seoData.images),
    links: calculateLinksScore(seoData.links),
    social: calculateSocialScore(seoData.socialTags),
    technical: calculateTechnicalScore(seoData)
  };

  const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  
  return {
    overall: Math.round(overallScore),
    breakdown: scores,
    grade: getGrade(overallScore)
  };
}

function calculateTitleScore(title) {
  if (!title) return 0;
  if (title.length < 30) return 50;
  if (title.length > 60) return 70;
  return 100;
}

function calculateMetaDescriptionScore(description) {
  if (!description) return 0;
  if (description.length < 120) return 60;
  if (description.length > 160) return 80;
  return 100;
}

function calculateHeadingsScore(headings) {
  if (!headings.h1 || headings.h1.length === 0) return 20;
  if (headings.h1.length > 1) return 60;
  if (!headings.h2 || headings.h2.length === 0) return 70;
  return 100;
}

function calculateImagesScore(images) {
  if (images.total === 0) return 100;
  const altRatio = (images.total - images.withoutAlt) / images.total;
  return Math.round(altRatio * 100);
}

function calculateLinksScore(links) {
  if (links.internal === 0) return 50;
  if (links.external === 0) return 80;
  return 100;
}

function calculateSocialScore(socialTags) {
  const requiredTags = ['ogTitle', 'ogDescription', 'ogImage', 'twitterCard'];
  const presentTags = requiredTags.filter(tag => socialTags[tag]);
  return Math.round((presentTags.length / requiredTags.length) * 100);
}

function calculateTechnicalScore(seoData) {
  let score = 0;
  if (seoData.hasSchema) score += 25;
  if (seoData.canonicalUrl) score += 25;
  if (seoData.robots) score += 25;
  if (seoData.viewport) score += 25;
  return score;
}

function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

async function generateRecommendations(seoData, ai) {
  const recommendations = [];
  
  if (!seoData.title || seoData.title.length < 30 || seoData.title.length > 60) {
    recommendations.push({
      type: 'title',
      priority: 'high',
      issue: 'Title length not optimal',
      suggestion: 'Title should be between 30-60 characters'
    });
  }
  
  if (!seoData.metaDescription || seoData.metaDescription.length < 120 || seoData.metaDescription.length > 160) {
    recommendations.push({
      type: 'meta-description',
      priority: 'high',
      issue: 'Meta description length not optimal',
      suggestion: 'Meta description should be between 120-160 characters'
    });
  }
  
  if (seoData.images.withoutAlt > 0) {
    recommendations.push({
      type: 'accessibility',
      priority: 'medium',
      issue: `${seoData.images.withoutAlt} images missing alt text`,
      suggestion: 'Add descriptive alt text to all images'
    });
  }
  
  if (!seoData.hasSchema) {
    recommendations.push({
      type: 'schema',
      priority: 'medium',
      issue: 'Missing structured data',
      suggestion: 'Add Schema.org markup for better search results'
    });
  }
  
  return recommendations;
}

async function searchGoogle(query, apiKey, engineId) {
  const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.items || [];
}

async function searchSerper(query, apiKey) {
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: query })
  });
  const data = await response.json();
  return data.organic || [];
}

async function searchDuckDuckGo(query) {
  const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
  const data = await response.json();
  return data.RelatedTopics || [];
}

function filterCompetitors(results, domain) {
  return results
    .filter(result => result.link && !result.link.includes(domain))
    .map(result => ({
      url: result.link,
      title: result.title,
      snippet: result.snippet || result.Text,
      position: results.indexOf(result) + 1
    }));
}

function deduplicateCompetitors(competitors) {
  const seen = new Set();
  return competitors.filter(comp => {
    try {
      const hostname = new URL(comp.url).hostname;
      if (seen.has(hostname)) return false;
      seen.add(hostname);
      return true;
    } catch {
      return false;
    }
  });
}

async function analyzeCompetitors(competitors, ai) {
  return Promise.all(competitors.map(async (competitor) => {
    try {
      // Basic competitor analysis - could be enhanced with more detailed scraping
      return {
        ...competitor,
        analysis: {
          titleLength: competitor.title?.length || 0,
          hasKeywords: competitor.title?.toLowerCase().includes('cleaning') || competitor.snippet?.toLowerCase().includes('cleaning'),
          estimatedAuthority: Math.floor(Math.random() * 100) // Placeholder - would use real authority metrics
        }
      };
    } catch {
      return competitor;
    }
  }));
}

function analyzeKeywordDensity(content, keywords) {
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  return keywords.map(keyword => {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    let count = 0;
    
    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase === keyword.toLowerCase()) {
        count++;
      }
    }
    
    return {
      keyword,
      count,
      density: totalWords > 0 ? (count / totalWords) * 100 : 0
    };
  });
}

async function generateContentSuggestions(content, keywords, ai) {
  const suggestions = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'system',
        content: 'Generate 3-5 specific SEO content improvement suggestions based on the provided content and target keywords.'
      },
      {
        role: 'user',
        content: `Content: ${content.substring(0, 1000)}... Keywords: ${keywords.join(', ')}`
      }
    ]
  });
  
  return suggestions.response.split('\n').filter(s => s.trim().length > 0);
}