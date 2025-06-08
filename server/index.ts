import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve static assets first
  app.use('/attached_assets', express.static(path.resolve(__dirname, '../attached_assets')));

  // Serve the customers page directly without React
  app.get('/', (req, res) => {
    const customersHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Workplace Janitorial Services - Professional Office Cleaning Winnipeg</title>
    <meta name="description" content="Professional office cleaning services in Winnipeg. Trusted by 50+ enterprise clients including Marriott, Long & McQuade, and Crown Royal. 99.8% retention rate.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        .header-content { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
        .logo { height: 48px; width: auto; }
        .nav { display: flex; gap: 2rem; align-items: center; }
        .nav a { text-decoration: none; color: #4b5563; font-weight: 500; transition: color 0.3s; }
        .nav a:hover { color: #2563eb; }
        .cta-button { background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; transition: background 0.3s; }
        .cta-button:hover { background: #1d4ed8; }
        .hero { background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); padding: 6rem 0; text-align: center; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.1; }
        .hero .highlight { color: #2563eb; }
        .hero p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .section { padding: 5rem 0; }
        .section-title { text-align: center; margin-bottom: 3rem; }
        .section-title h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
        .section-title p { font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto; }
        .customers { background: #f9fafb; }
        .trust-metrics { display: flex; justify-content: center; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap; }
        .metric { text-align: center; }
        .metric-number { font-size: 2.5rem; font-weight: 800; color: #2563eb; }
        .metric-label { color: #6b7280; font-weight: 500; }
        .client-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .client-card { background: white; padding: 2rem; border-radius: 12px; text-align: center; transition: all 0.3s; cursor: pointer; }
        .client-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .client-logo { height: 60px; width: auto; object-fit: contain; filter: grayscale(100%); transition: filter 0.3s; margin-bottom: 1rem; }
        .client-card:hover .client-logo { filter: grayscale(0%); }
        .client-info { opacity: 0; transition: opacity 0.3s; }
        .client-card:hover .client-info { opacity: 1; }
        .client-name { font-weight: 700; margin-bottom: 0.5rem; }
        .client-description { font-size: 0.875rem; color: #6b7280; }
        .btn-primary { background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 25px; text-decoration: none; font-weight: 600; transition: background 0.3s; }
        .btn-primary:hover { background: #1d4ed8; }
        .contact { background: white; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .contact-card { background: #f9fafb; padding: 2rem; border-radius: 12px; }
        footer { background: #1f2937; color: white; padding: 3rem 0; }
        @media (max-width: 768px) { .nav { display: none; } .hero h1 { font-size: 2.5rem; } .client-grid { grid-template-columns: repeat(2, 1fr); } }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <img src="/attached_assets/wjs-logo-windows.png" alt="Workplace Janitorial Services" class="logo">
                <nav class="nav">
                    <a href="#home">Home</a>
                    <a href="#customers">Clients</a>
                    <a href="#contact">Contact</a>
                    <a href="tel:+12044152910" class="cta-button">(204) 415-2910</a>
                </nav>
            </div>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <h1>Professional Office Cleaning<br><span class="highlight">Solutions in Winnipeg</span></h1>
            <p>Transform your workplace with our comprehensive commercial cleaning services. Trusted by 50+ enterprise clients with 99.8% retention rate.</p>
        </div>
    </section>

    <section id="customers" class="section customers">
        <div class="container">
            <div class="section-title">
                <h2>Trusted by Leading Organizations</h2>
                <p>We proudly serve some of Winnipeg's most prestigious businesses and organizations</p>
            </div>
            
            <div class="trust-metrics">
                <div class="metric">
                    <div class="metric-number">50+</div>
                    <div class="metric-label">Enterprise Clients</div>
                </div>
                <div class="metric">
                    <div class="metric-number">99.8%</div>
                    <div class="metric-label">Client Retention</div>
                </div>
                <div class="metric">
                    <div class="metric-number">24/7</div>
                    <div class="metric-label">Support Available</div>
                </div>
            </div>

            <div class="client-grid">
                <div class="client-card">
                    <img src="/attached_assets/image_1749407686357.png" alt="Marriott Bonvoy" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Marriott Bonvoy</div>
                        <div class="client-description">Premium hospitality services</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408680607.png" alt="Long & McQuade" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Long & McQuade</div>
                        <div class="client-description">Canada's music store</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408711752.png" alt="Memory Express" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Memory Express</div>
                        <div class="client-description">Computer technology retailer</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408723724.png" alt="Crown Royal" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Crown Royal</div>
                        <div class="client-description">Premium Canadian whisky</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408745351.png" alt="Gallagher" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Gallagher</div>
                        <div class="client-description">Global insurance brokerage</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408766227.png" alt="IGA" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">IGA</div>
                        <div class="client-description">Independent grocers alliance</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408781486.png" alt="Staples" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Staples</div>
                        <div class="client-description">Office supplies and services</div>
                    </div>
                </div>
                <div class="client-card">
                    <img src="/attached_assets/image_1749408787386.png" alt="Sobeys" class="client-logo">
                    <div class="client-info">
                        <div class="client-name">Sobeys</div>
                        <div class="client-description">Canadian grocery chain</div>
                    </div>
                </div>
            </div>

            <div style="text-align: center;">
                <p style="font-size: 1.125rem; color: #6b7280; margin-bottom: 1.5rem;">Join these industry leaders who trust us with their cleaning needs</p>
                <a href="tel:+12044152910" class="btn-primary">Become Our Next Success Story</a>
            </div>
        </div>
    </section>

    <section id="contact" class="section contact">
        <div class="container">
            <div class="section-title">
                <h2>Ready to Get Started?</h2>
                <p>Contact us today for a free consultation and quote</p>
            </div>
            
            <div class="contact-grid">
                <div class="contact-card">
                    <h3>Contact Information</h3>
                    <p><strong>Phone:</strong> <a href="tel:+12044152910" style="color: #2563eb;">(204) 415-2910</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@officecleaningwinnipeg.com" style="color: #2563eb;">info@officecleaningwinnipeg.com</a></p>
                    <p><strong>Service Area:</strong> Winnipeg and surrounding areas</p>
                </div>
                
                <div class="contact-card">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p style="color: #2563eb; font-weight: 600; margin-top: 1rem;">24/7 Emergency Services Available</p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div style="text-align: center;">
                <p>&copy; 2024 Workplace Janitorial Services. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
    
    res.send(customersHtml);
  });

  // Skip Vite entirely to avoid React hook errors
  // if (app.get("env") === "development") {
  //   await setupVite(app, server);
  // } else {
  //   serveStatic(app);
  // }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
