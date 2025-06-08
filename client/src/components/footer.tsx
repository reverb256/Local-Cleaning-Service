import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Our Services",
    links: [
      "Regular Office Cleaning",
      "Deep Cleaning", 
      "Floor Care",
      "Window Cleaning",
      "Post-Construction",
      "Eco-Friendly Options"
    ]
  },
  {
    title: "Quick Links",
    links: [
      "Get Quote",
      "About Us",
      "Contact",
      "Blog",
      "Privacy Policy", 
      "Terms of Service"
    ]
  }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Elite</span>
              <span className="text-2xl font-bold text-cyan ml-1">Clean</span>
            </div>
            <p className="text-gray-400 mb-4">
              Winnipeg's trusted commercial cleaning service. Professional, reliable, 
              and eco-friendly solutions for your workspace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerSections[0].title}</h4>
            <ul className="space-y-2 text-gray-400">
              {footerSections[0].links.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerSections[1].title}</h4>
            <ul className="space-y-2 text-gray-400">
              {footerSections[1].links.map((link, index) => {
                const sectionMap: { [key: string]: string } = {
                  "Get Quote": "quote",
                  "About Us": "about",
                  "Contact": "contact"
                };
                const sectionId = sectionMap[link];
                
                return (
                  <li key={index}>
                    <button 
                      onClick={() => sectionId ? scrollToSection(sectionId) : undefined}
                      className="hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>(204) 415-2910</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span>info@elitecleanwpg.ca</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-primary mt-1" />
                <span>123 Main Street<br />Winnipeg, MB R3C 1A1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Elite Clean Winnipeg. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
