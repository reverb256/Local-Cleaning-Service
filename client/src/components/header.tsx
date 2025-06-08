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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('quote')}
              className="nav-link"
            >
              Executive Quote
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              Excellence
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link"
            >
              Partnership
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center text-sm text-workplace-dark font-medium">
              <Phone className="w-4 h-4 mr-2 text-workplace-blue" />
              <span>(204) 415-2910</span>
            </div>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Engage Excellence
            </Button>
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
            <div className="px-4 pt-4 pb-6 space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="nav-link w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="nav-link w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('quote')}
                className="nav-link w-full text-left"
              >
                Get Quote
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link w-full text-left"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-white border-opacity-20">
                <div className="flex items-center text-sm text-workplace-dark font-medium mb-4">
                  <Phone className="w-4 h-4 mr-2 text-workplace-blue" />
                  <span>(204) 415-2910</span>
                </div>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full btn-primary"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
