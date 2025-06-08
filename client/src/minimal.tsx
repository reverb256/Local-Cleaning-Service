import wjs_logo_windows from "@assets/wjs-logo-windows.png";
import marriott_logo from "@assets/image_1749407686357.png";
import longmcquade_logo from "@assets/image_1749408680607.png";
import memoryexpress_logo from "@assets/image_1749408711752.png";
import crownroyal_logo from "@assets/image_1749408723724.png";
import gallagher_logo from "@assets/image_1749408745351.png";
import iga_logo from "@assets/image_1749408766227.png";
import staples_logo from "@assets/image_1749408781486.png";
import sobeys_logo from "@assets/image_1749408787386.png";

export default function MinimalApp() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src={wjs_logo_windows} 
                alt="Workplace Janitorial Services" 
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
              <a href="#customers" className="text-gray-700 hover:text-blue-600 font-medium">Clients</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              <a 
                href="tel:+12044152910"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                (204) 415-2910
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Office Cleaning
            <span className="text-blue-600 block">Solutions in Winnipeg</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your workplace with our comprehensive commercial cleaning services. 
            Trusted by 50+ enterprise clients with 99.8% retention rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+12044152910"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Free Quote
            </a>
            <a
              href="#services"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Cleaning Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional commercial cleaning services tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Office Cleaning</h3>
              <p className="text-gray-600">Daily, weekly, or monthly office cleaning services</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Floor Care</h3>
              <p className="text-gray-600">Professional floor cleaning and maintenance</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Window Cleaning</h3>
              <p className="text-gray-600">Interior and exterior window cleaning services</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Carpet Cleaning</h3>
              <p className="text-gray-600">Deep carpet cleaning and stain removal</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Restroom Sanitization</h3>
              <p className="text-gray-600">Complete restroom cleaning and sanitization</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Services</h3>
              <p className="text-gray-600">24/7 emergency cleaning services available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id="customers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We proudly serve some of Winnipeg's most prestigious businesses and organizations
            </p>
            
            {/* Trust Metrics */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99.8%</div>
                <div className="text-gray-600">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={marriott_logo} 
                alt="Marriott Bonvoy"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Marriott Bonvoy</p>
                <p className="text-xs text-gray-600">Premium hospitality services</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={longmcquade_logo} 
                alt="Long & McQuade"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Long & McQuade</p>
                <p className="text-xs text-gray-600">Canada's music store</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={memoryexpress_logo} 
                alt="Memory Express"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Memory Express</p>
                <p className="text-xs text-gray-600">Computer technology retailer</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={crownroyal_logo} 
                alt="Crown Royal"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Crown Royal</p>
                <p className="text-xs text-gray-600">Premium Canadian whisky</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={gallagher_logo} 
                alt="Gallagher"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Gallagher</p>
                <p className="text-xs text-gray-600">Global insurance brokerage</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={iga_logo} 
                alt="IGA"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">IGA</p>
                <p className="text-xs text-gray-600">Independent grocers alliance</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={staples_logo} 
                alt="Staples"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Staples</p>
                <p className="text-xs text-gray-600">Office supplies and services</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4">
              <img 
                src={sobeys_logo} 
                alt="Sobeys"
                className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900">Sobeys</p>
                <p className="text-xs text-gray-600">Canadian grocery chain</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Join these industry leaders who trust us with their cleaning needs
            </p>
            <a
              href="tel:+12044152910"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Become Our Next Success Story
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600">
              Contact us today for a free consultation and quote
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <a href="tel:+12044152910" className="text-blue-600 hover:text-blue-700 text-lg">(204) 415-2910</a>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <a href="mailto:info@officecleaningwinnipeg.com" className="text-blue-600 hover:text-blue-700">info@officecleaningwinnipeg.com</a>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Service Area</h4>
                    <p className="text-gray-600">Winnipeg and surrounding areas</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <span className="text-sm text-blue-600 font-medium">24/7 Emergency Services Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Workplace Janitorial Services</h3>
              <p className="text-gray-300">Professional office cleaning solutions in Winnipeg</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">Phone: (204) 415-2910</p>
              <p className="text-gray-300">Email: info@officecleaningwinnipeg.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="text-gray-300 space-y-1">
                <li>Office Cleaning</li>
                <li>Floor Care</li>
                <li>Window Cleaning</li>
                <li>Emergency Services</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; 2024 Workplace Janitorial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}