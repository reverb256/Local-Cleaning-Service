import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ServiceGuarantee from "@/components/service-guarantee";
import BusinessZones from "@/components/business-zones";
import QuoteCalculator from "@/components/quote-calculator";
import { StaticQuoteCalculator, StaticContactForm, StaticAIChat } from "@/components/static-fallbacks";
import Customers from "@/components/customers-simple";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import AdminAIPanel from "@/components/admin-ai-panel";
import InstallPWA from "@/components/install-pwa";

export default function Home() {
  // Check if running in static build mode
  const isStaticBuild = typeof window !== 'undefined' && 
    (window.location.protocol === 'file:' || 
     window.location.hostname.includes('github.io') ||
     import.meta.env.VITE_STATIC_BUILD === 'true');

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <ServiceGuarantee />
        <BusinessZones />
        {isStaticBuild ? <StaticQuoteCalculator /> : <QuoteCalculator />}
        <Customers />
        <Testimonials />
        <About />
        {isStaticBuild ? (
          <section id="contact" className="py-24 bg-gradient-to-br from-workplace-light to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-workplace-dark mb-6">Get In Touch</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ready to transform your workspace? Contact us today for a free consultation and quote.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <StaticContactForm />
                <div className="space-y-8">
                  {/* Contact Info Cards */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-workplace-blue rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-workplace-dark">Phone</h4>
                        <p className="text-workplace-blue font-semibold">(204) 415-2910</p>
                        <p className="text-sm text-gray-500">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-workplace-green rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">✉️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-workplace-dark">Email</h4>
                        <p className="text-workplace-blue font-semibold">info@workplacejanitorial.ca</p>
                        <p className="text-sm text-gray-500">We respond within 2 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-workplace-blue rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📍</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-workplace-dark">Address</h4>
                        <p className="text-workplace-dark">2-761 Marion Street</p>
                        <p className="text-workplace-dark">Winnipeg, MB R2J 0K6</p>
                        <p className="text-sm text-gray-500">Visit our office</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Contact />
        )}
      </main>
      <Footer />
      {!isStaticBuild && <AdminAIPanel />}
      {isStaticBuild ? <StaticAIChat /> : null}
      <InstallPWA />
    </div>
  );
}
