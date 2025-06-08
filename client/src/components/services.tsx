import { Briefcase, Sparkles, Hammer, Layers, Square, Leaf } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Premium Daily Operations",
    description: "Elite cleaning professionals delivering consistent excellence at your workspace",
    features: [
      "Performance guarantee with 30-minute rapid response commitment",
      "Precision scheduling with adaptive duty optimization",
      "Immediate spill response and emergency cleaning protocols",
      "Thoroughly vetted staff with comprehensive background verification"
    ]
  },
  {
    icon: Sparkles,
    title: "Tailored Excellence Programs",
    description: "Strategically designed cleaning solutions engineered for your unique business demands",
    features: [
      "Precision-crafted cleaning protocols",
      "Industry-specific expertise and compliance",
      "Dynamic service adaptability",
      "Dedicated account management with regular assessments"
    ]
  },
  {
    icon: Layers,
    title: "Advanced Floor Mastery",
    description: "Professional-grade floor preservation and enhancement services",
    features: [
      "Complete surface care and restoration",
      "State-of-the-art maintenance equipment",
      "Guaranteed superior results",
      "Proactive maintenance scheduling"
    ]
  },
  {
    icon: Leaf,
    title: "Executive Supply Solutions", 
    description: "Premium supply management ensuring your facilities maintain professional standards",
    features: [
      "High-quality paper products and essentials",
      "Professional-grade soaps and sanitization systems",
      "Complete waste management solutions",
      "Strategic vendor-managed inventory optimization"
    ]
  },
  {
    icon: Hammer,
    title: "Strategic Support Services",
    description: "Enhanced capacity solutions for dynamic operational demands",
    features: [
      "Specialized project execution",
      "Peak demand surge support",
      "Cost-effective extended coverage",
      "Seamless staff continuity solutions"
    ]
  },
  {
    icon: Leaf,
    title: "Sanitary & Sanitizer Solutions",
    description: "Professional hygiene management and sanitization services for complete workplace wellness",
    features: [
      "Sanitary bin management and maintenance",
      "Hand sanitizer dispensing systems",
      "Professional odor control solutions",
      "Complete washroom hygiene programs"
    ],
    featured: true
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 glass-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-workplace-dark mb-6">Elite Commercial Solutions</h2>
          <p className="text-2xl text-workplace-gray max-w-4xl mx-auto leading-relaxed">
            Transformative cleaning excellence engineered for discerning businesses who demand perfection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`service-card group design-container-elevated ${service.featured ? 'design-container-premium text-white glow-edge-sweep' : ''}`}
                style={service.featured ? {
                  background: 'linear-gradient(135deg, #0277BD 0%, #A4D65E 100%)',
                  color: 'white'
                } : {}}
              >
                <div className={`${service.featured ? 'text-white' : ''} mb-6`}>
                  <div className={`diamond-shape ${service.featured ? 'bg-white bg-opacity-20' : ''}`}>
                    <div className="diamond-shape-content">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-6 ${service.featured ? 'text-white' : 'text-workplace-dark'}`}>
                  {service.title}
                </h3>
                <p className={`text-lg mb-6 leading-relaxed ${service.featured ? 'text-white opacity-95' : 'text-workplace-gray'}`}>
                  {service.description}
                </p>
                <ul className={`text-base space-y-3 ${service.featured ? 'text-white opacity-90' : 'text-workplace-gray'}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${service.featured ? 'bg-white' : 'bg-workplace-blue'}`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="rounded-2xl p-12 shadow-2xl" style={{background: 'linear-gradient(to right, #0277BD, #A4D65E)'}}>
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Experience Excellence?</h3>
            <p className="text-white text-xl mb-4 opacity-95">Join 200+ Winnipeg businesses who trust us with their spaces</p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
              <p className="text-white text-sm font-medium">
                ✓ Free consultation  •  ✓ 24/7 emergency response  •  ✓ Fully insured & bonded
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('quote');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xl font-bold rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200 px-10 py-4"
                style={{background: 'linear-gradient(to right, #A4D65E, #00BCD4)', color: '#1A1A1A'}}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #90C545, #0099B3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #A4D65E, #00BCD4)'}
              >
                Get FREE Quote Now
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-white hover:text-workplace-dark transition-all duration-200 px-8 py-4 text-lg rounded-lg border border-white border-opacity-30"
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
