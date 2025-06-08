import { Phone } from "lucide-react";
import wjs_logo_windows from "@assets/wjs-logo-windows.png";

export default function StaticHeader() {
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
            <a href="#hero" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Solutions</a>
            <a href="#quote" className="nav-link">Quote</a>
            <a href="#customers" className="nav-link">Clients</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            
            {/* CTA Button */}
            <a 
              href="tel:+12044152910"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ml-4"
            >
              <Phone className="h-4 w-4 mr-2" />
              (204) 415-2910
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <a 
              href="tel:+12044152910"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}