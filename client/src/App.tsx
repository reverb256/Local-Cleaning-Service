import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Sitemap from "@/pages/sitemap";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/sitemap" component={Sitemap} />
      {/* Fallback to home for unknown routes */}
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Focus management for accessibility
    const handleRouteChange = () => {
      const main = document.querySelector('main');
      if (main) {
        main.focus();
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Set page language
    document.documentElement.lang = 'en';
    
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          {/* Skip to main content link for screen readers */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          {/* Bypass blocks navigation for screen readers */}
          <nav aria-label="Skip navigation" className="sr-only">
            <ul>
              <li><a href="#main-content">Skip to main content</a></li>
              <li><a href="#navigation">Skip to navigation</a></li>
              <li><a href="#footer">Skip to footer</a></li>
            </ul>
          </nav>

          <main 
            id="main-content" 
            role="main" 
            aria-label="Main content"
            tabIndex={-1}
            className="focus:outline-none"
          >
            <Router />
          </main>
        </div>
        <Toaster />
    </QueryClientProvider>
  );
}

export default App;
