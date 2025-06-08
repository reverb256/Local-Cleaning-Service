import businessZonesImage from "@assets/image_1749423187163.png";

export default function BusinessZones() {
  return (
    <section className="py-24 bg-gradient-to-br from-workplace-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-workplace-dark mb-6">
            Business Zone Cleaning Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive cleaning approach covers every zone of your office space with specialized services 
            tailored to different business areas and requirements.
          </p>
        </div>

        {/* Floor Plan Image */}
        <div className="design-container-elevated mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-workplace-blue mb-2">
                Professional Office Floor Plan Analysis
              </h3>
              <p className="text-gray-600">
                Detailed zone mapping for optimal cleaning efficiency and service delivery
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={businessZonesImage} 
                alt="Business zones floor plan showing different cleaning areas including offices, conference rooms, bathrooms, storage areas, and reception with color-coded service types"
                className="w-full h-auto object-contain bg-gray-50"
                loading="lazy"
              />
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                <strong>Workplace Janitorial Services</strong> - Comprehensive zone-based cleaning for 
                offices, conference rooms, bathrooms, storage areas, and common spaces at 
                2-761 Marion Street, Winnipeg, MB R2J 0K6
              </p>
            </div>
          </div>
        </div>

        {/* Service Zone Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="design-container-accent hover-floating hover-pulse-border p-6 text-center">
            <div className="w-12 h-12 bg-workplace-blue rounded-lg mx-auto mb-4 flex items-center justify-center hover-underglow-intense">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h4 className="text-lg font-semibold text-workplace-dark mb-2">Zone A - Tidy</h4>
            <p className="text-gray-600 text-sm">
              Regular maintenance for individual offices and workstations with organized, efficient cleaning routines.
            </p>
          </div>

          <div className="design-container-accent hover-floating hover-pulse-border p-6 text-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center hover-underglow-intense">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h4 className="text-lg font-semibold text-workplace-dark mb-2">Zone B - Clean</h4>
            <p className="text-gray-600 text-sm">
              Deep cleaning for conference rooms, meeting areas, and high-traffic office spaces.
            </p>
          </div>

          <div className="design-container-accent hover-floating hover-pulse-border p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center hover-underglow-intense">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h4 className="text-lg font-semibold text-workplace-dark mb-2">Zone C - Detail</h4>
            <p className="text-gray-600 text-sm">
              Specialized detailed cleaning for sensitive areas requiring meticulous attention.
            </p>
          </div>

          <div className="design-container-accent hover-floating hover-pulse-border p-6 text-center">
            <div className="w-12 h-12 bg-workplace-green rounded-lg mx-auto mb-4 flex items-center justify-center hover-underglow-intense">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h4 className="text-lg font-semibold text-workplace-dark mb-2">Zone D - Sanitize</h4>
            <p className="text-gray-600 text-sm">
              Complete sanitization for bathrooms, break rooms, and high-touch surfaces.
            </p>
          </div>
        </div>

        {/* Comprehensive Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="design-container-floating p-8">
            <h4 className="text-xl font-bold text-workplace-blue mb-6">Office Area Services</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Individual office cleaning and organization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Conference room setup and maintenance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Reception and waiting area care</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Storage and filing area organization</span>
              </li>
            </ul>
          </div>

          <div className="design-container-floating p-8">
            <h4 className="text-xl font-bold text-workplace-blue mb-6">Specialized Zone Care</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Bathroom sanitization and restocking</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Kitchen and break room deep cleaning</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">High-traffic area maintenance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-workplace-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Entrance and foyer presentation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="design-container-accent p-8 inline-block">
            <h4 className="text-2xl font-bold text-workplace-dark mb-4">
              Ready for Professional Zone-Based Cleaning?
            </h4>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Let us create a customized cleaning plan for your business zones with our proven methodology 
              and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+12044152910" 
                className="bg-workplace-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Call (204) 415-2910
              </a>
              <button 
                onClick={() => document.getElementById('quote-calculator')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-workplace-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Get Zone Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}