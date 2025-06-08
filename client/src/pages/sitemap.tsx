import { Link } from "wouter";

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/", description: "Complete overview of our services and company" },
        { name: "Elite Commercial Solutions", path: "/#services", description: "Premium cleaning services for businesses" },
        { name: "30-Minute Guarantee", path: "/#service-guarantee", description: "Our unique time commitment promise" },
        { name: "Business Zone Analysis", path: "/#business-zones", description: "Zone-based cleaning methodology" },
        { name: "Quote Calculator", path: "/#quote-calculator", description: "Get instant pricing estimates" },
        { name: "Customer Showcase", path: "/#customers", description: "Our trusted business partners" },
        { name: "Testimonials", path: "/#testimonials", description: "What our clients say about us" },
        { name: "About Us", path: "/#about", description: "Our story and commitment to excellence" },
        { name: "Contact", path: "/#contact", description: "Get in touch for service inquiries" },
      ]
    },
    {
      title: "Specialized Services",
      links: [
        { name: "Premium Daily Operations", path: "/#services", description: "Elite cleaning professionals with 30-minute guarantee" },
        { name: "Tailored Excellence Programs", path: "/#services", description: "Custom cleaning solutions for unique business needs" },
        { name: "Advanced Floor Mastery", path: "/#services", description: "Professional floor preservation and enhancement" },
        { name: "Comprehensive Facility Care", path: "/#services", description: "Complete building maintenance solutions" },
        { name: "Executive Workspace Solutions", path: "/#services", description: "Premium office environment management" },
        { name: "Specialized Sanitization", path: "/#services", description: "Healthcare-grade sanitization protocols" },
      ]
    },
    {
      title: "Service Zones & Areas",
      links: [
        { name: "Zone A - Tidy", path: "/#business-zones", description: "Individual offices and workstations" },
        { name: "Zone B - Clean", path: "/#business-zones", description: "Conference rooms and meeting areas" },
        { name: "Zone C - Detail", path: "/#business-zones", description: "Specialized detailed cleaning areas" },
        { name: "Zone D - Sanitize", path: "/#business-zones", description: "Bathrooms and high-touch surfaces" },
        { name: "Reception Areas", path: "/#business-zones", description: "First impression maintenance" },
        { name: "Storage & Filing", path: "/#business-zones", description: "Organization and maintenance" },
      ]
    },
    {
      title: "Company Information",
      links: [
        { name: "Service Policies", path: "/#service-guarantee", description: "Our guarantees and commitments" },
        { name: "Our People", path: "/#service-guarantee", description: "Background-checked professional staff" },
        { name: "We Recommend", path: "/#service-guarantee", description: "20+ years of expertise" },
        { name: "Guaranteed Clean", path: "/#service-guarantee", description: "Quality assurance processes" },
        { name: "Customer Portfolio", path: "/#customers", description: "Crown Royal, Memory Express, Marriott partners" },
      ]
    },
    {
      title: "Legal & Resources",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy", description: "How we protect your information" },
        { name: "Terms of Service", path: "/terms-of-service", description: "Service agreement terms" },
        { name: "Sitemap", path: "/sitemap", description: "Complete site navigation" },
        { name: "WCAG AAA Compliance", path: "/", description: "Full accessibility implementation" },
        { name: "Security Standards", path: "/", description: "OWASP & ISO 27001 compliance" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-workplace-light to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-workplace-blue to-blue-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Complete Site Navigation</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Comprehensive directory of our professional cleaning services, business zones, 
            and company information for Winnipeg businesses
          </p>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <div key={index} className="design-container-elevated p-8">
              <h2 className="text-2xl font-bold text-workplace-blue mb-6 border-b-2 border-workplace-green pb-3">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.path}>
                      <a className="group block p-3 rounded-lg hover:bg-workplace-light transition-all duration-200">
                        <div className="text-workplace-blue font-semibold text-lg group-hover:text-workplace-green transition-colors">
                          → {link.name}
                        </div>
                        {link.description && (
                          <div className="text-gray-600 text-sm mt-1 group-hover:text-gray-700">
                            {link.description}
                          </div>
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Company Overview */}
        <div className="mt-16 design-container-floating p-12">
          <h2 className="text-3xl font-bold text-workplace-blue mb-8 text-center">
            About Workplace Janitorial Services
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="design-container-accent p-6">
                <h3 className="text-xl font-bold text-workplace-blue mb-3">Our Commitment</h3>
                <p className="text-workplace-dark leading-relaxed">
                  Winnipeg's premier commercial cleaning company delivering exceptional solutions 
                  with our unique 30-minute guarantee. We serve 200+ businesses with comprehensive 
                  zone-based cleaning methodology.
                </p>
              </div>
              <div className="design-container-accent p-6">
                <h3 className="text-xl font-bold text-workplace-blue mb-3">Service Excellence</h3>
                <p className="text-workplace-dark leading-relaxed">
                  OWASP Top 10 2021 and ISO 27001:2022 compliant operations with criminal 
                  background checks, WCB coverage, and WCAG AAA accessibility standards.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="design-container-accent p-6">
                <h3 className="text-xl font-bold text-workplace-blue mb-3">Trusted Partners</h3>
                <p className="text-workplace-dark leading-relaxed">
                  Crown Royal, Memory Express, Marriott Bonvoy, Long & McQuade, and Phason 
                  trust our professional cleaning services for their workspace excellence.
                </p>
              </div>
              <div className="design-container-accent p-6">
                <h3 className="text-xl font-bold text-workplace-blue mb-3">Contact Information</h3>
                <p className="text-workplace-dark leading-relaxed">
                  <strong>Phone:</strong> (204) 415-2910<br/>
                  <strong>Email:</strong> info@workplacejanitorial.ca<br/>
                  <strong>Service Area:</strong> Winnipeg & surrounding areas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="design-container-premium p-8 inline-block">
            <h3 className="text-2xl font-bold text-workplace-blue mb-4">
              Ready to Experience Professional Excellence?
            </h3>
            <p className="text-workplace-dark mb-6 max-w-2xl">
              Join 200+ Winnipeg businesses who trust our zone-based cleaning methodology 
              and 30-minute guarantee for their workspace excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="bg-workplace-blue text-white px-8 py-4 rounded-lg hover:bg-workplace-green transition-all font-semibold text-lg filter drop-shadow-lg hover:drop-shadow-xl">
                  Return to Home
                </button>
              </Link>
              <Link href="/#quote-calculator">
                <button className="bg-workplace-green text-white px-8 py-4 rounded-lg hover:bg-workplace-blue transition-all font-semibold text-lg filter drop-shadow-lg hover:drop-shadow-xl">
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}