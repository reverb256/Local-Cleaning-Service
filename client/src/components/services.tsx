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
                className={`service-card group design-container-elevated hover-floating hover-rotating-border ${service.featured ? 'design-container-premium text-white glow-edge-sweep' : 'hover-gradient-shift'}`}
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
        
        {/* Contract Cleaning Service Section */}
        <div className="mt-20 relative overflow-hidden rounded-3xl" style={{
          background: 'linear-gradient(135deg, #0277BD 0%, #00BCD4 100%)',
          minHeight: '400px'
        }}>
          <div className="absolute inset-0" style={{
            background: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400") center/cover',
            opacity: 0.15
          }}></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
            {/* Content Side */}
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                CONTRACT CLEANING SERVICE
              </h2>
              <p className="text-xl mb-8 leading-relaxed opacity-95">
                Cleaning programs are designed to maintain acceptable cleanliness that fits the budget. Regular 
                Cleaning Services can be bundled with other cleaning services to create a complete Cleaning Program.
              </p>
              
              {/* Service Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-workplace-green flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg">Customized cleaning schedules to fit your business needs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-workplace-green flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg">Comprehensive service bundles for complete facility maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-workplace-green flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg">Budget-conscious solutions without compromising quality</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  const element = document.getElementById('quote');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-workplace-green text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-200 shadow-xl"
              >
                Get Contract Quote
              </button>
            </div>

            {/* Floating Service Cards */}
            <div className="relative h-80 lg:h-96">
              {/* Office Cleaning Card */}
              <div className="absolute top-4 right-8 bg-white rounded-xl shadow-xl p-4 max-w-40 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                  alt="Office cleaning service" 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <p className="text-xs font-semibold text-workplace-dark">Office Deep Clean</p>
              </div>

              {/* Floor Care Card */}
              <div className="absolute bottom-16 right-4 bg-white rounded-xl shadow-xl p-4 max-w-40 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                  alt="Floor cleaning service" 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <p className="text-xs font-semibold text-workplace-dark">Floor Care</p>
              </div>

              {/* Sanitization Card */}
              <div className="absolute top-20 left-8 bg-white rounded-xl shadow-xl p-4 max-w-40 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                  alt="Sanitization service" 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <p className="text-xs font-semibold text-workplace-dark">Sanitization</p>
              </div>

              {/* Central Service Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-workplace-dark rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-white text-2xl">🧹</div>
              </div>
            </div>
          </div>
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
