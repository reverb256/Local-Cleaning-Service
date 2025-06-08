import { Clock, Award, CheckCircle, Shield, Zap, Users, Star, Calculator, Phone, Calendar, Mail, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InstallPWA from "@/components/install-pwa";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Professional Excellence. <span className="text-yellow-300">Guaranteed Results.</span>
                </h1>
                <p className="text-xl mb-8 opacity-95">
                  Transform your workspace with Winnipeg's most trusted commercial cleaning specialists. 
                  We deliver uncompromising quality, every time.
                </p>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mb-8">
                  <p className="text-white text-sm font-medium">
                    ✓ Serving 200+ Winnipeg businesses  •  ✓ 24/7 emergency response  •  ✓ Free consultation
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <Button 
                    onClick={() => scrollToSection('quote')}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 px-10 py-5 text-xl font-bold"
                  >
                    <Calculator className="w-6 h-6 mr-3" />
                    Get FREE Quote Now
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-5 text-lg border border-white border-opacity-30"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    View Services
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">ELITE PROFESSIONALS</h3>
                    <p className="text-base opacity-90">Rigorously vetted staff with comprehensive insurance protection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">ADVANCED SOLUTIONS</h3>
                    <p className="text-base opacity-90">Strategic inventory management & sanitary solutions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">PERFORMANCE PROMISE</h3>
                    <p className="text-base opacity-90">Immediate response guarantee for exceptional standards</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional cleaning team"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Your Success Is Our Priority
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Winnipeg Businesses Choose Us
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We're not just another cleaning company. We're your partner in creating exceptional workplace environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-xl p-6 rounded-2xl">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">30-Minute Guarantee</h3>
                <p className="text-sm text-white text-opacity-90">Extra attention when we finish early - no additional cost</p>
              </div>
              
              <div className="bg-white shadow-lg hover:shadow-xl border-2 border-blue-200 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Fully Insured & Bonded</h3>
                <p className="text-sm text-gray-700">Complete protection for your business and peace of mind</p>
              </div>
              
              <div className="bg-white shadow-lg hover:shadow-xl border-2 border-blue-200 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Same-Day Response</h3>
                <p className="text-sm text-gray-700">Emergency cleaning services available 24/7</p>
              </div>
              
              <div className="bg-white shadow-lg hover:shadow-xl border-2 border-blue-200 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">200+ Happy Clients</h3>
                <p className="text-sm text-gray-700">Trusted by Winnipeg's leading businesses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Contact Section */}
        <section id="contact" className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 mb-12">
              Contact us today for your free consultation and quote
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-700">(204) 415-2910</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-700">info@workplacejanitorial.ca</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Service Area</h3>
                <p className="text-gray-700">Greater Winnipeg Area</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 px-8 py-4 text-lg font-bold">
                <Calculator className="w-5 h-5 mr-2" />
                Get FREE Quote
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-green-600 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call (204) 415-2910
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <InstallPWA />
    </div>
  );
}
