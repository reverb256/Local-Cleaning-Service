import { Shield, Clock, Star, Award, Users, CheckCircle } from "lucide-react";

export default function ValueProposition() {
  const valuePoints = [
    {
      icon: Clock,
      title: "30-Minute Guarantee",
      description: "When we finish early, we invest extra time in detail work at no additional cost",
      highlight: true
    },
    {
      icon: Users,
      title: "200+ Satisfied Clients",
      description: "Trusted by Winnipeg's leading businesses across all industries",
      highlight: false
    },
    {
      icon: Shield,
      title: "Fully Insured & Bonded",
      description: "Complete protection for your business with comprehensive coverage",
      highlight: false
    },
    {
      icon: Star,
      title: "24/7 Emergency Response",
      description: "Available when you need us most with rapid response guarantee",
      highlight: false
    }
  ];

  const benefits = [
    "Free consultation and customized cleaning plan",
    "Same-day response to all inquiries",
    "Eco-friendly cleaning products and methods",
    "Professional-grade equipment and supplies",
    "Flexible scheduling to fit your business hours",
    "Dedicated account manager for personalized service"
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 bg-opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Your Success Is Our Priority
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-workplace-dark mb-6">
            Why Winnipeg Businesses Choose Us
          </h2>
          <p className="text-xl text-workplace-gray max-w-3xl mx-auto">
            We're not just another cleaning company. We're your partner in creating exceptional workplace environments that reflect your professional standards.
          </p>
        </div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valuePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${
                  point.highlight 
                    ? 'bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-xl' 
                    : 'bg-white shadow-lg hover:shadow-xl border-2 border-blue-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  point.highlight ? 'bg-white bg-opacity-20' : 'bg-workplace-blue bg-opacity-10'
                }`}>
                  <Icon className={`w-6 h-6 ${point.highlight ? 'text-white' : 'text-workplace-blue'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  point.highlight ? 'text-white' : 'text-workplace-dark'
                }`}>
                  {point.title}
                </h3>
                <p className={`text-sm ${
                  point.highlight ? 'text-white text-opacity-90' : 'text-workplace-gray'
                }`}>
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-workplace-dark mb-6">
                What You Get With Every Service
              </h3>
              <p className="text-lg text-workplace-gray mb-8">
                We go beyond basic cleaning to deliver comprehensive solutions that enhance your business environment and support your success.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-workplace-gray">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h4>
                <p className="text-lg mb-6 opacity-95">
                  Join the 200+ Winnipeg businesses who trust us with their most important spaces.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      const element = document.getElementById('quote');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-yellow-400 text-workplace-dark hover:bg-yellow-500 py-3 px-6 rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
                  >
                    Get Your Free Quote Now
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-white hover:text-workplace-dark py-3 px-6 rounded-lg border border-white border-opacity-30 transition-all duration-200"
                  >
                    Schedule Free Consultation
                  </button>
                </div>
                <p className="text-sm opacity-80 mt-4 text-center">
                  No obligation • Response within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}