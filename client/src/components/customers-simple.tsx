import marriottLogo from "@assets/image_1749417644086.png";
import longMcQuadeLogo from "@assets/image_1749408723724.png";
import grandeLogo from "@assets/image_1749408745351.png";
import memoryExpressLogo from "@assets/image_1749408766227.png";
import bensonLogo from "@assets/image_1749408781486.png";
import phasonLogo from "@assets/image_1749408787386.png";
import crownRoyalLogo from "@assets/image_1749408861303.png";
import gallagherLogo from "@assets/screenshot-1749408893954.png";

const customers = [
  {
    name: "Marriott Bonvoy",
    logo: marriottLogo,
    description: "Premium hospitality services",
    bgColor: "bg-red-50"
  },
  {
    name: "Long & McQuade",
    logo: longMcQuadeLogo,
    description: "Musical instrument retail excellence",
    bgColor: "bg-blue-50"
  },
  {
    name: "The Grande by Lakeview",
    logo: grandeLogo,
    description: "Luxury residential living",
    bgColor: "bg-green-50"
  },
  {
    name: "Memory Express",
    logo: memoryExpressLogo,
    description: "Technology retail solutions",
    bgColor: "bg-purple-50"
  },
  {
    name: "Benson Financial",
    logo: bensonLogo,
    description: "Financial planning services",
    bgColor: "bg-yellow-50"
  },
  {
    name: "Phason",
    logo: phasonLogo,
    description: "Agricultural technology innovation",
    bgColor: "bg-indigo-50"
  },
  {
    name: "Crown Royal",
    logo: crownRoyalLogo,
    description: "Premium spirits excellence",
    bgColor: "bg-amber-50"
  },
  {
    name: "Gallagher",
    logo: gallagherLogo,
    description: "Global insurance and risk management",
    bgColor: "bg-teal-50"
  }
];

export default function CustomersSimple() {
  return (
    <section id="customers" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-background"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-workplace-dark mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-2xl text-workplace-gray max-w-4xl mx-auto leading-relaxed">
            From Fortune 500 corporations to prestigious local establishments, 
            our elite cleaning services maintain the highest standards for 
            Canada's most discerning organizations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {customers.map((customer, index) => (
            <div
              key={customer.name}
              className="group relative bg-white rounded-2xl p-4 md:p-8 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:border-workplace-blue hover:shadow-xl hover:-translate-y-2"
            >
              <div className={`h-20 flex items-center justify-center p-2 rounded-lg ${customer.bgColor}`}>
                <img
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  className="max-h-full max-w-full object-contain filter contrast-125 brightness-110 group-hover:filter-none transition-all duration-300"
                />
              </div>
              
              <div className="absolute inset-x-0 -bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-workplace-dark text-white rounded-lg p-4 shadow-xl">
                  <h4 className="font-bold text-sm mb-1">{customer.name}</h4>
                  <p className="text-xs text-gray-300">{customer.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
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
        </div>

      </div>
    </section>
  );
}