import { Button } from "@/components/ui/button";
import { Calculator, Calendar, Shield, Leaf, Clock } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 glass-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Exceptional Cleaning You Can 
              <span className="block bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Depend On
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed">
              Customized, cost-effective, and superior cleaning solutions for your office and industrial spaces by our trustworthy professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button 
                onClick={() => scrollToSection('quote')}
                className="bg-white text-workplace-dark hover:bg-workplace-blue hover:text-white transition-all duration-200 px-8 py-4 text-lg font-bold"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-workplace-blue text-white hover:bg-workplace-green transition-all duration-200 px-8 py-4 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Services
              </Button>
            </div>

            {/* Diamond Trust Indicators - Brand Signature */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="diamond-shape mx-auto mb-4">
                  <div className="diamond-shape-content">
                    <Leaf className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">OUR PEOPLE</h3>
                <p className="text-base opacity-90 text-white">Criminal background checks & WCB coverage</p>
              </div>
              <div className="text-center">
                <div className="diamond-shape mx-auto mb-4">
                  <div className="diamond-shape-content">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">WE RECOMMEND</h3>
                <p className="text-base opacity-90 text-white">Vendor managed inventory & Biochem Environmental</p>
              </div>
              <div className="text-center">
                <div className="diamond-shape mx-auto mb-4">
                  <div className="diamond-shape-content">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">GUARANTEED CLEAN</h3>
                <p className="text-base opacity-90 text-white">30-minute guarantee on additional cleaning</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in">
            <div className="glass-card overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Clean modern office workspace" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Guarantee Badge */}
            <div className="absolute -bottom-8 -left-8 glass-card p-6 text-center">
              <div className="text-3xl font-bold text-workplace-blue mb-2">SATISFACTION</div>
              <div className="text-lg font-semibold text-workplace-green">GUARANTEED</div>
              <div className="text-sm text-workplace-dark mt-1">OR IT'S FREE!</div>
            </div>
            
            {/* Contact CTA */}
            <div className="absolute -top-8 -right-8 glass-card p-4 text-center">
              <div className="text-workplace-blue font-bold text-lg">(204) 334-2817</div>
              <div className="text-workplace-dark text-sm">Call for Quote</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
