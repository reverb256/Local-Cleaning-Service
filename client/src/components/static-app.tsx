import StaticHeader from "@/components/static-header";
import CustomersSimple from "@/components/customers-simple";

export default function StaticApp() {
  return (
    <div className="min-h-screen">
      <StaticHeader />
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Office Cleaning
              <span className="text-blue-600 block">Solutions in Winnipeg</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your workplace with our comprehensive commercial cleaning services. 
              Trusted by 50+ enterprise clients with 99.8% retention rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12044152910"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Get Free Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
              >
                Our Services
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Cleaning Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Professional commercial cleaning services tailored to your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Office Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300">Daily, weekly, or monthly office cleaning services</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Floor Care</h3>
                <p className="text-gray-600 dark:text-gray-300">Professional floor cleaning and maintenance</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Window Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300">Interior and exterior window cleaning services</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customers Section */}
        <CustomersSimple />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Contact us today for a free consultation and quote
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                      <a href="tel:+12044152910" className="text-blue-600 hover:text-blue-700">(204) 415-2910</a>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                      <a href="mailto:info@officecleaningwinnipeg.com" className="text-blue-600 hover:text-blue-700">info@officecleaningwinnipeg.com</a>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Service Area</h4>
                      <p className="text-gray-600 dark:text-gray-300">Winnipeg and surrounding areas</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                      <span className="text-gray-900 dark:text-white">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                      <span className="text-gray-900 dark:text-white">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                      <span className="text-gray-900 dark:text-white">Closed</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-blue-600 font-medium">24/7 Emergency Services Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
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