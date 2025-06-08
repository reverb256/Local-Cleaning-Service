import { Phone, Calendar, Calculator, CheckCircle, Clock, Users } from "lucide-react";

export default function FinalCTA() {
  const benefits = [
    "30-minute guarantee on all services",
    "Free consultation and customized plan", 
    "Same-day response guarantee",
    "200+ satisfied Winnipeg businesses",
    "Fully insured and bonded",
    "24/7 emergency availability"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-workplace-blue via-workplace-blue to-workplace-green overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium mb-8">
            <Users className="w-5 h-5 mr-2" />
            Ready to Join 200+ Satisfied Clients?
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Exceptional Service Experience Starts Here
          </h2>
          
          <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Take the next step toward a cleaner, more professional workspace. Our team is ready to exceed your expectations with our signature 30-minute guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits Column */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">
              What You Get When You Choose Us
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 mt-8">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-yellow-300 mr-3" />
                <h4 className="text-xl font-bold text-white">Limited Time Offer</h4>
              </div>
              <p className="text-white text-opacity-90">
                Schedule your free consultation this month and receive a complimentary deep-clean service with your first regular cleaning package.
              </p>
            </div>
          </div>

          {/* Action Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-workplace-dark mb-6 text-center">
                Get Started in 3 Easy Steps
              </h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-workplace-blue text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <span className="text-workplace-gray">Get your free quote in 60 seconds</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-workplace-blue text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <span className="text-workplace-gray">Schedule your free consultation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-workplace-blue text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <span className="text-workplace-gray">Experience the difference</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => scrollToSection('quote')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-workplace-dark hover:from-yellow-500 hover:to-yellow-600 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Your FREE Quote Now
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-workplace-blue text-white hover:bg-workplace-green py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (204) 415-2910
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full border-2 border-workplace-blue text-workplace-blue hover:bg-workplace-blue hover:text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </button>
              </div>
              
              <p className="text-xs text-workplace-gray text-center mt-4">
                No obligation • Response within 2 hours • Free consultation valued at $150
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust Statement */}
        <div className="text-center mt-16">
          <p className="text-white text-lg font-medium">
            "Thank you for considering Workplace Janitorial Services. We're committed to earning your trust and exceeding your expectations every single day."
          </p>
          <p className="text-white text-opacity-80 mt-2">
            — The WJS Team
          </p>
        </div>
      </div>
    </section>
  );
}