import { Switch, Route } from "wouter";

function SimpleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Workplace Janitorial Services</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-gray-700 hover:text-cyan-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-cyan-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-cyan-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Professional Commercial Cleaning
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Workplace Janitorial Services offers commercial office cleaning and industrial cleaning services to Winnipeg businesses. Featuring eco-friendly janitorial solutions and eco-friendly cleaning products.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors">
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial Office Cleaning</h3>
              <p className="text-gray-600">Professional office cleaning services for Winnipeg businesses</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Industrial Cleaning</h3>
              <p className="text-gray-600">Specialized industrial cleaning for manufacturing and warehouse facilities</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Solutions</h3>
              <p className="text-gray-600">Green cleaning products and environmentally responsible practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About Workplace Janitorial Services</h2>
            <p className="text-lg text-gray-700 mb-8">
              We are Winnipeg's trusted commercial cleaning partner, providing reliable janitorial services to businesses across the city. Our commitment to eco-friendly cleaning solutions ensures a healthy environment for your employees and customers while protecting our planet.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">200+</div>
                <div className="text-gray-600">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
                <div className="text-gray-600">Eco-Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get Your Free Quote Today</h2>
          <p className="text-xl mb-8">Ready to experience professional commercial cleaning? Contact us for a customized quote.</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.linkedin.com/company/workplace-janitorial-services" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              LinkedIn
            </a>
            <a href="https://www.facebook.com/workplacejanitorial/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Facebook
            </a>
          </div>
          <button className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Request Free Quote
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Workplace Janitorial Services</h3>
              <p className="text-gray-400">Professional commercial and industrial cleaning services in Winnipeg with eco-friendly solutions.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Commercial Office Cleaning</li>
                <li>Industrial Cleaning</li>
                <li>Eco-Friendly Solutions</li>
                <li>Janitorial Services</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Serving Winnipeg, Manitoba</p>
                <p>Professional Commercial Cleaning</p>
                <div className="flex space-x-4 mt-4">
                  <a href="https://www.linkedin.com/company/workplace-janitorial-services" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white">LinkedIn</a>
                  <a href="https://www.facebook.com/workplacejanitorial/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white">Facebook</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
              <a href="/sitemap" className="hover:text-white">Sitemap</a>
            </div>
            <p className="text-gray-400 mt-4">&copy; 2024 Workplace Janitorial Services. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">
              <a href="https://reverbwebdesign.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-cyan-400 transition-colors border-b border-gray-600 hover:border-cyan-400">
                vibecoded by Reverb Web Design
              </a>
            </p>
          </div>
        </div>
      </footer>
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