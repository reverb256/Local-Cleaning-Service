import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Leaf, Settings, CheckCircle } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Reliability You Can Count On",
    description: "Consistent, dependable service with 99.5% on-time arrival rate"
  },
  {
    icon: Settings,
    title: "Customized Solutions",
    description: "Tailored cleaning plans that fit your schedule and budget"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Practices",
    description: "Green cleaning products and sustainable methods"
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
            <h2 className="text-5xl font-bold text-workplace-dark mb-8">About Workplace Janitorial</h2>
            <p className="text-xl text-workplace-gray mb-8 leading-relaxed">
              Workplace Janitorial provides reliable and professional commercial office 
              cleaning services to the Winnipeg area. With over 10 years of 
              experience in the office cleaning industry we have established the 
              practices and procedures that others in the industry strive for.
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
            
            {/* 30-Minute Guarantee */}
            <div className="glass-card p-8 bg-gradient-to-r from-workplace-blue to-workplace-green">
              <div className="flex items-center mb-6">
                <div className="diamond-shape bg-white bg-opacity-20 mr-6">
                  <div className="diamond-shape-content">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white">Our 30-Minute Guarantee</h3>
              </div>
              <p className="mb-6 text-white text-lg leading-relaxed">
                If we finish early, we'll spend an extra 30 minutes on detail work at no additional cost. 
                Your satisfaction is our priority.
              </p>
              <div className="glass-card p-4 bg-white bg-opacity-10">
                <div className="text-white text-base font-medium">
                  This guarantee applies to all regular cleaning services
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
