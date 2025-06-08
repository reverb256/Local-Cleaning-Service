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
    <section id="home" className="relative flex items-center overflow-hidden hero-section">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 glass-background"></div>
      
      <div className="relative z-10 container-responsive max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center hero-grid">
          <div className="animate-fade-in-up text-white hero-content order-1">
            <h1 className="text-responsive-hero font-bold mb-6 lg:mb-8 leading-tight">
              Professional Excellence. 
              <span className="block bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Guaranteed Results.
              </span>
            </h1>
            <p className="text-responsive-large mb-6 opacity-95 leading-relaxed">
              Transform your workspace with our premium cleaning solutions. Winnipeg's most trusted commercial cleaning specialists deliver uncompromising quality, every time.
            </p>
            
            {/* Urgency and Social Proof */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mb-8">
              <p className="text-white text-sm font-medium">
                ✓ Serving 200+ Winnipeg businesses  •  ✓ 24/7 emergency response  •  ✓ Free consultation
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                onClick={() => scrollToSection('quote')}
                className="text-xl font-bold flex items-center justify-center shadow-xl transform hover:scale-105 glow-pulse transition-all duration-200 px-10 py-5"
                style={{background: 'linear-gradient(to right, #A4D65E, #00BCD4)', color: '#1A1A1A'}}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #90C545, #0099B3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #A4D65E, #00BCD4)'}
              >
                <Calculator className="w-6 h-6 mr-3" />
                <span>Get FREE Quote Now</span>
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-white hover:text-workplace-dark transition-all duration-200 px-8 py-5 text-lg flex items-center justify-center border border-white border-opacity-30 glow-hover"
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span>View Services</span>
              </Button>
            </div>

            {/* Diamond Trust Indicators - Brand Signature */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center glow-floating" style={{animationDelay: '0s'}}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow">
                  <div className="diamond-shape-content">
                    <Leaf className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">ELITE PROFESSIONALS</h3>
                <p className="text-base opacity-90 text-white">Rigorously vetted staff with comprehensive insurance protection</p>
              </div>
              <div className="text-center glow-floating" style={{animationDelay: '1.3s'}}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow">
                  <div className="diamond-shape-content">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">ADVANCED SOLUTIONS</h3>
                <p className="text-base opacity-90 text-white">Strategic inventory management & sanitary solutions</p>
              </div>
              <div className="text-center glow-floating" style={{animationDelay: '2.6s'}}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow">
                  <div className="diamond-shape-content">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">PERFORMANCE PROMISE</h3>
                <p className="text-base opacity-90 text-white">Immediate response guarantee for exceptional standards</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in hidden lg:block order-2">
            <div className="glass-card overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Clean modern office workspace" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Guarantee Badge */}
            <div className="absolute bottom-4 right-4 glass-card p-6 text-center">
              <div className="text-2xl font-bold text-workplace-blue mb-2">SATISFACTION</div>
              <div className="text-lg font-semibold text-workplace-green">GUARANTEED</div>
              <div className="text-sm text-workplace-dark mt-1">OR IT'S FREE!</div>
            </div>
            
            {/* Contact CTA */}
            <div className="absolute -top-8 -right-8 glass-card p-4 text-center">
              <div className="text-workplace-blue font-bold text-lg">(204) 415-2910</div>
              <div className="text-workplace-dark text-sm">Call for Quote</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
