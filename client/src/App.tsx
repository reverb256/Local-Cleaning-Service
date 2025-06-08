import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, Component, ReactNode, lazy, Suspense } from "react";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
const Sitemap = lazy(() => import("@/pages/sitemap"));

// Lightweight loading component
const PageLoader = () => (
  <div className="min-h-screen bg-workplace-light flex items-center justify-center">
    <div className="design-container-floating p-8">
      <div className="animate-pulse text-workplace-blue font-medium">Loading...</div>
    </div>
  </div>
);

// Error Boundary for catching React errors
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/sitemap" component={Sitemap} />
        {/* Fallback to home for unknown routes */}
        <Route component={Home} />
      </Switch>
    </Suspense>
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
