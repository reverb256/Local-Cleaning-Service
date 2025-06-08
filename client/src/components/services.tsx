import { Briefcase, Sparkles, Hammer, Layers, Square, Leaf } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "3-5 Day/Week Office Cleaning",
    description: "Office cleaning staff at your work site performing tasks to achieve desired results",
    features: [
      "On site guaranteed for 30 minutes more than required",
      "Adhere to schedule with varying duty frequencies",
      "Extra time provides immediate attention to spills/accidents",
      "Professional staff with criminal background checks"
    ]
  },
  {
    icon: Sparkles,
    title: "Customized Office Cleaning",
    description: "Tailored cleaning programs designed to meet your specific business needs",
    features: [
      "Custom cleaning schedules",
      "Specialized industry requirements",
      "Flexible service arrangements",
      "Account manager walk-throughs"
    ]
  },
  {
    icon: Layers,
    title: "Floor Care Cleaning",
    description: "Professional floor maintenance and care services",
    features: [
      "Comprehensive floor maintenance",
      "Professional cleaning equipment",
      "Quality results guaranteed",
      "Regular maintenance schedules"
    ]
  },
  {
    icon: Leaf,
    title: "Bathroom Supplies", 
    description: "Full line of quality supplies to stock your washrooms and kitchenettes",
    features: [
      "Paper towels and toilet paper",
      "Hand soaps and sanitizers",
      "Garbage bags and urinal screens",
      "Vendor managed inventory program"
    ]
  },
  {
    icon: Hammer,
    title: "Supplemental Janitor Services",
    description: "Extra capacity for your existing office cleaning team",
    features: [
      "Special projects support",
      "Extra high seasonal demand coverage",
      "Evening work without overtime payments",
      "Replacement of vacationing employees"
    ]
  },
  {
    icon: Leaf,
    title: "Biochem Environmental Partnership",
    description: "Natural products that are very effective in odor control",
    features: [
      "Touch-free feminine hygiene disposal units",
      "Automatic sink taps and soap dispensers",
      "Touch-free urinal flushing units",
      "Hand sanitizer units kill 99% of bacteria"
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
          <h2 className="text-5xl font-bold text-workplace-dark mb-6">Office Cleaning Services</h2>
          <p className="text-2xl text-workplace-gray max-w-4xl mx-auto leading-relaxed">
            Customized, cost-effective, and superior cleaning solutions for your office and industrial spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`service-card group ${service.featured ? 'hero-gradient text-white' : ''}`}
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
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-8">
            <h3 className="text-2xl font-bold text-workplace-dark mb-4">Ready to Transform Your Workspace?</h3>
            <p className="text-workplace-gray mb-6">Get a personalized quote for your cleaning needs</p>
            <button 
              onClick={() => {
                const element = document.getElementById('quote');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-lg"
            >
              Get Your Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
