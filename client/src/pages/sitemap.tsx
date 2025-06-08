import { Link } from "wouter";

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "About", path: "/#about" },
        { name: "Contact", path: "/#contact" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Office Cleaning", path: "/#services" },
        { name: "Deep Cleaning", path: "/#services" },
        { name: "Window Cleaning", path: "/#services" },
        { name: "Carpet Cleaning", path: "/#services" },
        { name: "Floor Care", path: "/#services" },
        { name: "Sanitization", path: "/#services" },
      ]
    },
    {
      title: "Legal & Information",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Sitemap", path: "/sitemap" },
      ]
    },
    {
      title: "Contact Information",
      links: [
        { name: "Get Quote", path: "/#contact" },
        { name: "Book Service", path: "/#contact" },
        { name: "Customer Support", path: "/#contact" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-workplace-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Site Map</h1>
          <p className="text-xl opacity-90">
            Navigate our comprehensive cleaning services and company information
          </p>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sitemapSections.map((section, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-workplace-blue mb-6">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.path}>
                      <a className="text-workplace-dark hover:text-workplace-blue transition-colors text-lg font-medium block py-2 hover:translate-x-2 transition-transform">
                        → {link.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-workplace-light p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-workplace-blue mb-6">
            About Workplace Janitorial Services
          </h2>
          <div className="prose max-w-none text-workplace-dark">
            <p className="text-lg leading-relaxed mb-4">
              Workplace Janitorial Services is Winnipeg's premier commercial cleaning company, 
              delivering exceptional cleaning solutions to businesses across the region. Our 
              comprehensive services ensure your workspace maintains the highest standards of 
              cleanliness and professionalism.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Service Areas:</strong> We proudly serve Winnipeg and surrounding areas 
              with reliable, professional cleaning services tailored to your business needs.
            </p>
            <p className="text-lg leading-relaxed">
              <strong>Contact Information:</strong> Ready to experience excellence in commercial 
              cleaning? Contact us today for a free consultation and quote.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/">
            <button className="bg-workplace-blue text-white px-8 py-4 rounded-lg hover:bg-workplace-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}