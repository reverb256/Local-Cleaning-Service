import { Clock, Shield, Award, Users, CheckCircle, Star } from "lucide-react";

export default function AboutNew() {
  const features = [
    {
      icon: Shield,
      title: "Elite Professional Standards",
      description: "Rigorously vetted staff with comprehensive insurance protection and ongoing training programs."
    },
    {
      icon: Award,
      title: "Industry-Leading Solutions",
      description: "Advanced equipment and eco-friendly products that deliver superior results every time."
    },
    {
      icon: Users,
      title: "Dedicated Account Management", 
      description: "Personal service coordinators ensure consistent quality and seamless communication."
    }
  ];

  const certifications = [
    { icon: "🏆", text: "ISSA Certified" },
    { icon: "🛡️", text: "Fully Insured & Bonded" },
    { icon: "♻️", text: "Green Cleaning Certified" },
    { icon: "⭐", text: "BBB A+ Rating" }
  ];

  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Excellence Redefined</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Workplace Janitorial commands Winnipeg's commercial cleaning landscape with 
              unmatched authority. Our decade-plus legacy of operational mastery has 
              established the gold standard that defines industry excellence and 
              sets the benchmark for professional supremacy.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start bg-white rounded-xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl mb-3">{feature.title}</h4>
                      <p className="text-gray-700 text-lg">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h4 className="font-bold text-gray-900 text-xl mb-6">Our Certifications</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-blue-50 px-6 py-3 rounded-xl border border-blue-200">
                    <span className="text-base font-semibold text-gray-900">
                      {cert.icon} {cert.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional cleaning team in uniform" 
              className="rounded-2xl shadow-lg w-full mb-8"
            />
            
            {/* 30-Minute Guarantee - Enhanced */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-green-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">30-Minute Guarantee</h3>
                  <p className="text-white text-opacity-90 text-lg">Excellence Beyond Expectations</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed mb-4">
                  When we finish early, we invest an additional 30 minutes in detail work at no extra cost. 
                  Your complete satisfaction drives our commitment to perfection.
                </p>
                <div className="flex items-center text-white text-opacity-90">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="font-medium">Applies to all regular cleaning services</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-2">What This Means</h4>
                  <p className="text-white text-opacity-90 text-sm">Extra attention to high-touch surfaces, thorough final inspection, and additional detail cleaning</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-2">Your Benefit</h4>
                  <p className="text-white text-opacity-90 text-sm">Consistently superior results that exceed industry standards, guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}