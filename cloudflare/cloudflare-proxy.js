const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

class CloudflareOrchestrator {
  constructor() {
    this.workerBaseUrl = 'https://seo-analyzer.workplacejanitorial.workers.dev';
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN;
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    this.mainAppUrl = process.env.MAIN_APP_URL;
  }

  async proxySeoAnalysis(targetUrl) {
    try {
      const response = await axios.post(`${this.workerBaseUrl}/analyze`, {
        targetUrl
      });
      return response.data;
    } catch (error) {
      throw new Error(`SEO analysis failed: ${error.message}`);
    }
  }

  async proxyLighthouseAnalysis(targetUrl) {
    try {
      const response = await axios.post(`${this.workerBaseUrl}/lighthouse`, {
        targetUrl
      });
      return response.data;
    } catch (error) {
      throw new Error(`Lighthouse analysis failed: ${error.message}`);
    }
  }

  async proxyCompetitorAnalysis(keywords, domain) {
    try {
      const response = await axios.post(`${this.workerBaseUrl}/competitors`, {
        keywords,
        domain
      });
      return response.data;
    } catch (error) {
      throw new Error(`Competitor analysis failed: ${error.message}`);
    }
  }

  async proxyContentOptimization(content, keywords, targetAudience) {
    try {
      const response = await axios.post(`${this.workerBaseUrl}/optimize`, {
        content,
        keywords,
        targetAudience
      });
      return response.data;
    } catch (error) {
      throw new Error(`Content optimization failed: ${error.message}`);
    }
  }
}

const orchestrator = new CloudflareOrchestrator();

app.post('/seo/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    const result = await orchestrator.proxySeoAnalysis(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/seo/lighthouse', async (req, res) => {
  try {
    const { url } = req.body;
    const result = await orchestrator.proxyLighthouseAnalysis(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/seo/competitors', async (req, res) => {
  try {
    const { keywords, domain } = req.body;
    const result = await orchestrator.proxyCompetitorAnalysis(keywords, domain);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/seo/optimize', async (req, res) => {
  try {
    const { content, keywords, targetAudience } = req.body;
    const result = await orchestrator.proxyContentOptimization(content, keywords, targetAudience);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log('CloudFlare proxy listening on port 8080');
});