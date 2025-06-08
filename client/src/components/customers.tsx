import { motion } from "framer-motion";

const customers = [
  {
    name: "Marriott Bonvoy",
    logo: "/attached_assets/image_1749408680607.png",
    description: "Premium hospitality services"
  },
  {
    name: "Long & McQuade",
    logo: "/attached_assets/image_1749408723724.png",
    description: "Musical instrument retail excellence"
  },
  {
    name: "The Grande by Lakeview",
    logo: "/attached_assets/image_1749408745351.png",
    description: "Luxury residential living"
  },
  {
    name: "Memory Express",
    logo: "/attached_assets/image_1749408766227.png",
    description: "Technology retail solutions"
  },
  {
    name: "Benson Financial",
    logo: "/attached_assets/image_1749408781486.png",
    description: "Financial planning services"
  },
  {
    name: "Phason",
    logo: "/attached_assets/image_1749408787386.png",
    description: "Agricultural technology innovation"
  },
  {
    name: "Crown Royal",
    logo: "/attached_assets/image_1749408861303.png",
    description: "Premium spirits excellence"
  },
  {
    name: "Gallagher",
    logo: "/attached_assets/screenshot-1749408893954.png",
    description: "Global insurance and risk management"
  }
];

export default function Customers() {
  return (
    <section id="customers" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-background"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-5xl font-bold text-workplace-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            className="text-2xl text-workplace-gray max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From Fortune 500 corporations to prestigious local establishments, 
            our elite cleaning services maintain the highest standards for 
            Canada's most discerning organizations.
          </motion.p>
        </div>

        {/* Customer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Logo Container */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 transition-all duration-300 group-hover:border-workplace-blue group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="h-20 flex items-center justify-center">
                  <img
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Hover Info */}
              <div className="absolute inset-x-0 -bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-workplace-dark text-white rounded-lg p-4 shadow-xl">
                  <h4 className="font-bold text-sm mb-1">{customer.name}</h4>
                  <p className="text-xs text-gray-300">{customer.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-workplace-blue max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-workplace-dark mb-6">
              Excellence Recognized Across Industries
            </h3>
            <p className="text-xl text-workplace-gray leading-relaxed mb-8">
              Our commitment to unparalleled service quality has earned the trust 
              of leading organizations across hospitality, retail, technology, 
              finance, and manufacturing sectors throughout Western Canada.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-workplace-blue mb-2">50+</div>
                <div className="text-workplace-gray">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-workplace-green mb-2">99.8%</div>
                <div className="text-workplace-gray">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-workplace-blue mb-2">24/7</div>
                <div className="text-workplace-gray">Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}