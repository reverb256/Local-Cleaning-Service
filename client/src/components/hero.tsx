import { Button } from "@/components/ui/button";
import { Calculator, Calendar, Shield, Leaf, Clock } from "lucide-react";
import abstractBackground1 from "@assets/image_1749435064843.png";
import abstractBackground2 from "@assets/image_1749435068929.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex items-center overflow-hidden hero-section">
      {/* Dynamic Abstract Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${abstractBackground1})`,
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center transition-opacity duration-1000 animate-pulse"
        style={{
          backgroundImage: `url(${abstractBackground2})`,
          backgroundBlendMode: 'soft-light',
          animationDelay: '2s'
        }}
      ></div>
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
              <div className="text-center design-container-floating p-6" style={{
                animationDelay: '0s',
                background: 'rgba(0, 188, 212, 0.15)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(164, 214, 94, 0.3)'
              }}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow" style={{
                  background: 'linear-gradient(45deg, #00BCD4, #A4D65E)',
                  boxShadow: '0 0 20px rgba(0, 188, 212, 0.4)'
                }}>
                  <div className="diamond-shape-content">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">ELITE PROFESSIONALS</h3>
                <p className="text-base opacity-90 text-white">Rigorously vetted staff with comprehensive insurance protection</p>
              </div>
              <div className="text-center design-container-floating p-6" style={{
                animationDelay: '1.3s',
                background: 'rgba(164, 214, 94, 0.15)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(0, 188, 212, 0.3)'
              }}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow" style={{
                  background: 'linear-gradient(45deg, #A4D65E, #00BCD4)',
                  boxShadow: '0 0 20px rgba(164, 214, 94, 0.4)'
                }}>
                  <div className="diamond-shape-content">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">ADVANCED SOLUTIONS</h3>
                <p className="text-base opacity-90 text-white">Strategic inventory management & sanitary solutions</p>
              </div>
              <div className="text-center design-container-floating p-6" style={{
                animationDelay: '2.6s',
                background: 'rgba(0, 188, 212, 0.15)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(164, 214, 94, 0.3)'
              }}>
                <div className="diamond-shape mx-auto mb-4 glow-underglow" style={{
                  background: 'linear-gradient(45deg, #00BCD4, #A4D65E)',
                  boxShadow: '0 0 20px rgba(0, 188, 212, 0.4)'
                }}>
                  <div className="diamond-shape-content">
                    <Clock className="w-6 h-6 text-white" />
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
            
            {/* Contact CTA - Top Right */}
            <div className="absolute top-4 right-4 glass-card p-4 text-center rounded-xl" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="text-workplace-blue font-bold text-base">(204) 415-2910</div>
              <div className="text-workplace-dark text-xs">Call for Quote</div>
            </div>
            
            {/* Floating Guarantee Badge - Bottom Center */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-card p-4 text-center rounded-xl" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              minWidth: '200px'
            }}>
              <div className="text-xl font-bold text-workplace-blue mb-1">SATISFACTION</div>
              <div className="text-base font-semibold text-workplace-green mb-1">GUARANTEED</div>
              <div className="text-xs text-workplace-dark">OR IT'S FREE!</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Abstract Accent Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-30 animate-float-slow">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(164, 214, 94, 0.4), rgba(0, 188, 212, 0.2))',
            filter: 'blur(20px)',
            animationDelay: '0s'
          }}
        ></div>
      </div>
      
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-25 animate-float-reverse">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 188, 212, 0.4), rgba(164, 214, 94, 0.2))',
            filter: 'blur(15px)',
            animationDelay: '3s'
          }}
        ></div>
      </div>
      
      <div className="absolute top-1/2 right-1/4 w-16 h-16 opacity-20 animate-pulse">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
            filter: 'blur(10px)',
            animationDelay: '1.5s'
          }}
        ></div>
      </div>
    </section>
  );
}
