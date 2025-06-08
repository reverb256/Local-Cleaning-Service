import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Our Services",
    links: [
      "3-5 Day/Week Office Cleaning",
      "Customized Office Cleaning", 
      "Floor Care Cleaning",
      "Bathroom Supplies",
      "Supplemental Janitor Services",
      "Biochem Environmental Partnership"
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
    <footer className="relative glass-footer py-20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-workplace-dark to-gray-800"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-workplace-blue">Workplace</span>
              <span className="text-3xl font-bold text-workplace-green ml-1">Janitorial</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Workplace Janitorial Services - Quality office cleaning with 
              comprehensive liability insurance and WCB coverage for Winnipeg businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="glass-card p-3 hover:bg-workplace-blue hover:bg-opacity-20 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="glass-card p-3 hover:bg-workplace-blue hover:bg-opacity-20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="glass-card p-3 hover:bg-workplace-blue hover:bg-opacity-20 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue">{footerSections[0].title}</h4>
            <ul className="space-y-3 text-gray-300">
              {footerSections[0].links.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-workplace-green transition-colors text-left text-base"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue">{footerSections[1].title}</h4>
            <ul className="space-y-3 text-gray-300">
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
                      className="hover:text-workplace-green transition-colors text-left text-base"
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
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue">Contact Us</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center glass-card p-4">
                <Phone className="w-5 h-5 mr-3 text-workplace-green" />
                <span className="text-base font-medium">(204) 415-2910</span>
              </div>
              <div className="flex items-center glass-card p-4">
                <Mail className="w-5 h-5 mr-3 text-workplace-green" />
                <span className="text-base">Contact via phone</span>
              </div>
              <div className="flex items-start glass-card p-4">
                <MapPin className="w-5 h-5 mr-3 text-workplace-green mt-1" />
                <span className="text-base">2-761 Marion Street<br />Winnipeg, MB R2J 0K6</span>
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
