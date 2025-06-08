import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Leaf, Settings, CheckCircle } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Uncompromising Excellence",
    description: "Precision performance with 99.8% flawless execution guarantee"
  },
  {
    icon: Settings,
    title: "Strategic Customization",
    description: "Executive-level solutions engineered for operational superiority"
  },
  {
    icon: Leaf,
    title: "Advanced Sustainability",
    description: "Next-generation eco-systems and cutting-edge green methodologies"
  }
];

const certifications = [
  { icon: "🔒", text: "Bonded & Insured" },
  { icon: "🌿", text: "Green Certified" },
  { icon: "⭐", text: "BBB A+ Rating" }
];

export default function About() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-background"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in">
            <h2 className="text-5xl font-bold text-workplace-dark mb-8">Excellence Redefined</h2>
            <p className="text-xl text-workplace-gray mb-8 leading-relaxed">
              Workplace Janitorial commands Winnipeg's commercial cleaning landscape with 
              unmatched authority. Our decade-plus legacy of operational mastery has 
              established the gold standard that defines industry excellence and 
              sets the benchmark for professional supremacy.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start glass-card p-6">
                    <div className="diamond-shape mr-6">
                      <div className="diamond-shape-content">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-workplace-dark text-xl mb-3">{feature.title}</h4>
                      <p className="text-workplace-gray text-lg">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="glass-card p-8">
              <h4 className="font-bold text-workplace-dark text-xl mb-6">Our Certifications</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-workplace-blue bg-opacity-10 px-6 py-3 rounded-2xl border border-workplace-blue border-opacity-20">
                    <span className="text-base font-semibold text-workplace-dark">
                      {cert.icon} {cert.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional cleaning team in uniform" 
              className="rounded-2xl shadow-lg w-full mb-8"
            />
            
            {/* Service Excellence Promise */}
            <div className="design-container-accent p-8 glow-underglow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center design-container-floating" style={{backgroundColor: '#00BCD4', border: '2px solid #A4D65E'}}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#1A1A1A'}}>
                    Quality Beyond Time Commitment
                  </h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#2D2D2D'}}>
                    We don't just complete tasks—we perfect them. Every service includes thorough 
                    attention to detail that ensures your space meets our rigorous standards.
                  </p>
                  <div className="design-container-floating p-4" style={{
                    background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(164, 214, 94, 0.1))',
                    border: '1px solid rgba(0, 188, 212, 0.2)'
                  }}>
                    <p className="font-semibold text-sm glow-underglow" style={{color: '#1A1A1A'}}>
                      Our team takes pride in delivering exceptional results, every single time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
