import { Switch, Route } from "wouter";

function SimpleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-turquoise-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Workplace Janitorial Services
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Professional Excellence. Guaranteed Results.
        </p>
        <div className="text-center">
          <a href="/privacy-policy" className="text-turquoise-600 hover:text-turquoise-800 mx-4">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-turquoise-600 hover:text-turquoise-800 mx-4">
            Terms of Service
          </a>
          <a href="/sitemap" className="text-turquoise-600 hover:text-turquoise-800 mx-4">
            Sitemap
          </a>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={SimpleHome} />
      <Route path="/privacy-policy" component={() => <div className="p-8"><h1 className="text-2xl font-bold">Privacy Policy</h1></div>} />
      <Route path="/terms-of-service" component={() => <div className="p-8"><h1 className="text-2xl font-bold">Terms of Service</h1></div>} />
      <Route path="/sitemap" component={() => <div className="p-8"><h1 className="text-2xl font-bold">Sitemap</h1></div>} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router />
    </div>
  );
}

export default App;