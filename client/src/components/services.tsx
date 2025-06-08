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
