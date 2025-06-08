import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

import wjs_logo_windows from "@assets/wjs-logo-windows.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="glass-header sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src={wjs_logo_windows} 
                alt="Workplace Janitorial Services - Professional Office Cleaning Winnipeg" 
                className="h-12 w-auto"
              />
            </div>
          </div>
          
          {/* Desktop Navigation - Value-Focused Flow */}
          <div className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link px-4 py-2 text-workplace-dark hover:text-workplace-blue transition-colors"
            >
              Our Solutions
            </button>
            <button 
              onClick={() => scrollToSection('customers')}
              className="nav-link px-4 py-2 text-workplace-dark hover:text-workplace-blue transition-colors"
            >
              Trusted By 200+
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link px-4 py-2 text-workplace-dark hover:text-workplace-blue transition-colors"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => scrollToSection('quote')}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Get FREE Quote
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </button>
          </div>



          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card mt-2 mx-4 mb-4">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Priority Actions First */}
              <div className="space-y-2 pb-4 border-b border-gray-200">
                <button 
                  onClick={() => scrollToSection('quote')}
                  className="w-full bg-yellow-400 text-workplace-dark hover:bg-yellow-500 py-3 px-4 rounded-lg font-bold text-center transition-all"
                >
                  Get FREE Quote Now
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-workplace-blue text-white hover:bg-workplace-green py-3 px-4 rounded-lg font-medium text-center transition-all flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (204) 415-2910
                </button>
              </div>
              
              {/* Value-Focused Navigation */}
              <button 
                onClick={() => scrollToSection('services')}
                className="nav-link w-full text-left py-2"
              >
                Our Solutions
              </button>
              <button 
                onClick={() => scrollToSection('customers')}
                className="nav-link w-full text-left py-2"
              >
                Trusted By 200+ Businesses
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link w-full text-left py-2"
              >
                Why Choose Us
              </button>
              
              {/* Trust Indicators */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-workplace-gray text-center">
                  30-Minute Guarantee • Free Consultation • Same-Day Response
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
