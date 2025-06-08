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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Elite Clean</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in Winnipeg, we've been providing exceptional commercial cleaning services 
              for over a decade. Our mission is to create healthier, more productive workspaces 
              through reliable, customized, and environmentally responsible cleaning solutions.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="text-primary text-xl mr-3 mt-1">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="border-t pt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Our Certifications</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium">
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
            <Card className="bg-gradient-to-r from-cyan to-primary text-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Our 30-Minute Guarantee</h3>
                </div>
                <p className="mb-4 text-white/90">
                  If we finish early, we'll spend an extra 30 minutes on detail work at no additional cost. 
                  Your satisfaction is our priority.
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-3">⏰</div>
                  <div className="text-sm text-white/80">
                    This guarantee applies to all regular cleaning services
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
