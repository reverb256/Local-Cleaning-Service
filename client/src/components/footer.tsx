import { Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";
import { Link } from "wouter";

import wjs_logo_windows from "@assets/wjs-logo-windows.png";

const footerSections = [
  {
    title: "Elite Solutions",
    links: [
      "Premium Daily Operations",
      "Tailored Excellence Programs", 
      "Advanced Floor Mastery",
      "Executive Supply Solutions",
      "Strategic Support Services",
      "Sanitary & Sanitizer Services"
    ]
  },
  {
    title: "Executive Access",
    links: [
      "Secure Quote",
      "Partnership Inquiry",
      "Strategic Contact",
      "Client Success"
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
          <div className="design-container-accent p-6">
            <div className="flex items-center mb-6">
              <img 
                src={wjs_logo_windows} 
                alt="Workplace Janitorial Services" 
                className="h-10 w-auto glow-underglow"
              />
            </div>
            <p className="text-workplace-dark mb-6 leading-relaxed font-medium">
              Workplace Janitorial Services - Winnipeg's premier commercial cleaning authority delivering 
              uncompromising excellence with comprehensive insurance protection and professional accountability.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/workplacejanitorialservices" target="_blank" rel="noopener noreferrer" className="design-container-floating p-3 text-white glow-hover" style={{background: 'linear-gradient(45deg, #00BCD4, #A4D65E)'}}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/workplace-janitorial-services" target="_blank" rel="noopener noreferrer" className="design-container-floating p-3 text-white glow-hover" style={{background: 'linear-gradient(45deg, #A4D65E, #00BCD4)'}}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="design-container-elevated p-6">
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue glow-underglow">{footerSections[0].title}</h4>
            <ul className="space-y-3">
              {footerSections[0].links.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-workplace-dark hover:text-workplace-blue transition-all text-left text-base font-medium design-container-floating px-3 py-2 w-full glow-hover"
                    style={{
                      border: '1px solid rgba(0, 188, 212, 0.1)',
                      background: 'rgba(164, 214, 94, 0.05)'
                    }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="design-container-elevated p-6">
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue glow-underglow">{footerSections[1].title}</h4>
            <ul className="space-y-3">
              {footerSections[1].links.map((link, index) => {
                const sectionMap: { [key: string]: string } = {
                  "Secure Quote": "quote",
                  "Partnership Inquiry": "about",
                  "Strategic Contact": "contact",
                  "Client Success": "testimonials"
                };
                const sectionId = sectionMap[link];
                
                return (
                  <li key={index}>
                    <button 
                      onClick={() => sectionId ? scrollToSection(sectionId) : undefined}
                      className="text-workplace-dark hover:text-workplace-blue transition-all text-left text-base font-medium design-container-floating px-3 py-2 w-full glow-hover"
                      style={{
                        border: '1px solid rgba(164, 214, 94, 0.1)',
                        background: 'rgba(0, 188, 212, 0.05)'
                      }}
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="design-container-premium p-6">
            <h4 className="text-2xl font-bold mb-6 text-workplace-blue glow-underglow">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center design-container-accent p-4 glow-hover">
                <Phone className="w-5 h-5 mr-3 text-white" style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 188, 212, 0.6))'
                }} />
                <span className="text-base font-medium text-workplace-dark">(204) 415-2910</span>
              </div>
              <div className="flex items-center design-container-accent p-4 glow-hover">
                <Mail className="w-5 h-5 mr-3 text-white" style={{
                  filter: 'drop-shadow(0 0 8px rgba(164, 214, 94, 0.6))'
                }} />
                <span className="text-base text-workplace-dark">Executive consultation</span>
              </div>
              <div className="flex items-start design-container-accent p-4 glow-hover">
                <MapPin className="w-5 h-5 mr-3 text-white mt-1" style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 188, 212, 0.6))'
                }} />
                <span className="text-base text-workplace-dark">2-761 Marion Street<br />Winnipeg, MB R2J 0K6</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-workplace-blue mt-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-workplace-dark text-lg font-medium">
              All rights reserved. Workplace Janitorial Services | Office Cleaning Winnipeg.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="/privacy-policy">
                <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                  Privacy Policy
                </button>
              </Link>
              <Link href="/terms-of-service">
                <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                  Terms of Service
                </button>
              </Link>
              <Link href="/sitemap">
                <button className="bg-white px-4 py-2 rounded-lg border-2 border-workplace-blue text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all font-medium">
                  Sitemap
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Minimal Website Credit */}
        <div className="text-center py-4 mt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            vibecoded by <a href="https://reverb256.ca" target="_blank" rel="noopener noreferrer" className="relative inline-block px-3 py-1 rounded-md border-2 border-transparent text-blue-600 hover:text-white hover:bg-blue-600 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-lg group vibecode-link">
              <span className="relative z-10 font-medium">Reverb Web Design</span>
              <span className="absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">✨</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
