import { Briefcase, Sparkles, Hammer, Layers, Square, Leaf } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Regular Office Cleaning",
    description: "Daily, weekly, or bi-weekly cleaning to maintain a professional workspace",
    features: [
      "Desk and surface sanitization",
      "Trash removal and recycling", 
      "Restroom cleaning and restocking",
      "Kitchen and break room maintenance"
    ]
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Thorough cleaning for move-ins, seasonal maintenance, or special events",
    features: [
      "Complete disinfection service",
      "Carpet and upholstery cleaning",
      "Light fixture and ceiling fan cleaning", 
      "Baseboards and window sill detailing"
    ]
  },
  {
    icon: Layers,
    title: "Floor Care & Maintenance",
    description: "Professional floor cleaning, waxing, and maintenance services",
    features: [
      "Hardwood floor polishing",
      "Tile and grout deep cleaning",
      "Carpet shampooing and stain removal",
      "Floor waxing and sealing"
    ]
  },
  {
    icon: Square,
    title: "Window Cleaning", 
    description: "Crystal clear windows for a brighter, more professional appearance",
    features: [
      "Interior and exterior window cleaning",
      "Screen cleaning and maintenance",
      "Window sill and frame cleaning",
      "Streak-free professional results"
    ]
  },
  {
    icon: Hammer,
    title: "Post-Construction Cleanup",
    description: "Specialized cleaning after renovations or construction projects",
    features: [
      "Dust and debris removal",
      "Paint and adhesive cleanup", 
      "Construction material disposal",
      "Final touch-up cleaning"
    ]
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Cleaning",
    description: "Green cleaning solutions that protect your team and the environment",
    features: [
      "Non-toxic cleaning products",
      "Biodegradable solutions",
      "HEPA filtration vacuums",
      "Sustainable cleaning practices"
    ],
    featured: true
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive cleaning solutions tailored to your office needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`service-card ${service.featured ? 'bg-gradient-to-br from-primary to-green-600 text-white' : ''}`}
              >
                <div className={`${service.featured ? 'text-white' : 'text-primary'} text-4xl mb-4`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${service.featured ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${service.featured ? 'text-white/90' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <ul className={`text-sm space-y-2 ${service.featured ? 'text-white/80' : 'text-gray-500'}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
