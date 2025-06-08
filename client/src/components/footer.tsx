import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Elite Solutions",
    links: [
      "Premium Daily Operations",
      "Tailored Excellence Programs", 
      "Advanced Floor Mastery",
      "Executive Supply Solutions",
      "Strategic Support Services",
      "Biochem Environmental Excellence"
    ]
  },
  {
    title: "Executive Access",
    links: [
      "Secure Quote",
      "Partnership Inquiry",
      "Strategic Contact",
      "Industry Insights",
      "Privacy Standards", 
      "Professional Terms"
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
    <footer className="relative py-20 bg-workplace-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/logo.svg" 
                alt="Workplace Janitorial Services" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-workplace-dark mb-6 leading-relaxed font-medium">
              Workplace Janitorial Services - Winnipeg's premier commercial cleaning authority delivering 
              uncompromising excellence with comprehensive insurance protection and professional accountability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-workplace-blue text-white p-3 rounded-lg hover:bg-workplace-green transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-workplace-blue text-white p-3 rounded-lg hover:bg-workplace-green transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-workplace-blue text-white p-3 rounded-lg hover:bg-workplace-green transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue">{footerSections[0].title}</h4>
            <ul className="space-y-3">
              {footerSections[0].links.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-workplace-dark hover:text-workplace-blue transition-colors text-left text-base font-medium"
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
            <ul className="space-y-3">
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
                      className="text-workplace-dark hover:text-workplace-blue transition-colors text-left text-base font-medium"
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
            <div className="space-y-4">
              <div className="flex items-center bg-white p-4 rounded-lg border-2 border-workplace-blue">
                <Phone className="w-5 h-5 mr-3 text-workplace-green" />
                <span className="text-base font-medium text-workplace-dark">(204) 334-2817</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg border-2 border-workplace-blue">
                <Mail className="w-5 h-5 mr-3 text-workplace-green" />
                <span className="text-base text-workplace-dark">Executive consultation</span>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg border-2 border-workplace-blue">
                <MapPin className="w-5 h-5 mr-3 text-workplace-green mt-1" />
                <span className="text-base text-workplace-dark">2-761 Marion Street<br />Winnipeg, MB R2J 0K6</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-workplace-blue mt-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-workplace-dark text-lg font-medium">
              © 2025 Reverb Web Design. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                Privacy Policy
              </button>
              <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                Terms of Service
              </button>
              <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
