import { Clock, Shield, CheckCircle, Users } from "lucide-react";

export default function ServiceGuarantee() {
  return (
    <section className="py-24 bg-gradient-to-br from-workplace-blue to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Guarantee Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-workplace-green px-6 py-3 rounded-full mb-6">
            <Shield className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-lg">Satisfaction Guaranteed or It's Free!</span>
          </div>
          <h2 className="text-5xl font-bold text-black mb-6">
            The 30-Minute Guarantee
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
            Unlike rushed "in & out" cleaning services, we guarantee your dedicated cleaner stays 
            <strong className="text-workplace-green"> 30 minutes longer</strong> than required for thorough, 
            quality cleaning you can depend on.
          </p>
        </div>

        {/* Four Diamond Service Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Our People</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Background-checked professionals</li>
              <li>• Comprehensive training program</li>
              <li>• Consistent team assignments</li>
              <li>• Workplace safety certified</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Our Service</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• 30-minute guarantee commitment</li>
              <li>• Detailed quality checklists</li>
              <li>• Zone-based cleaning methodology</li>
              <li>• Real-time service tracking</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Our Quality</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Satisfaction guaranteed or free</li>
              <li>• Regular quality inspections</li>
              <li>• Client feedback integration</li>
              <li>• Continuous improvement focus</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Our Promise</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Reliable scheduling</li>
              <li>• Transparent pricing</li>
              <li>• Emergency response available</li>
              <li>• Long-term partnerships</li>
            </ul>
          </div>
        </div>

        {/* Guarantee Details */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">What Makes Us Different</h3>
              <div className="space-y-4 text-black">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-workplace-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Extended Service Time</h4>
                    <p className="text-sm leading-relaxed">
                      While competitors rush through in 15-20 minutes, our cleaners stay 30 minutes longer 
                      to ensure every detail meets our high standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-workplace-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Zone-Based Methodology</h4>
                    <p className="text-sm leading-relaxed">
                      Systematic approach covering high-traffic areas, workstations, common areas, 
                      and specialized zones for comprehensive coverage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-workplace-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Quality Assurance</h4>
                    <p className="text-sm leading-relaxed">
                      Regular quality checks, client feedback integration, and continuous training 
                      ensure consistent, professional results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-workplace-green to-green-600 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6 text-center">30-Minute Guarantee</h4>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg">Satisfaction Guaranteed</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  <span>If you're not completely satisfied, we'll re-clean for free</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span>30 minutes longer than standard cleaning time</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Quality checklist verified before completion</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-white text-workplace-green font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Get Your Guarantee Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}