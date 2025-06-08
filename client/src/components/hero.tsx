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
    <section id="home" className="hero-gradient min-h-screen flex items-center text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Spotless Workspaces in 
              <span className="block text-cyan">Winnipeg</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Workplace Janitorial Services - quality office cleaning with comprehensive liability insurance and WCB coverage. 
              <span className="font-semibold text-cyan"> Get your free quote today!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => scrollToSection('quote')}
                className="bg-white text-primary px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                variant="outline"
                className="bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="feature-icon mx-auto mb-3 bg-white/20">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Quality Supplies</h3>
                <p className="text-sm opacity-80">Full line of washroom and kitchenette supplies</p>
              </div>
              <div className="text-center">
                <div className="feature-icon mx-auto mb-3 bg-white/20">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">WCB Coverage</h3>
                <p className="text-sm opacity-80">All staff covered by comprehensive insurance</p>
              </div>
              <div className="text-center">
                <div className="feature-icon mx-auto mb-3 bg-white/20">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">30-Min Guarantee</h3>
                <p className="text-sm opacity-80">Extra time at no additional cost</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Clean modern office workspace" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
