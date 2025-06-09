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
              <li>• Selective hiring based on experience & attitude</li>
              <li>• Above industry average compensation</li>
              <li>• Guaranteed time on-site for quality work</li>
              <li>• Criminal background checks</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">We Recommend</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• 20+ years of professional experience</li>
              <li>• Detailed worksite plan development</li>
              <li>• Thorough needs assessment</li>
              <li>• Customized cleaning programs</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Service Policies</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Live professional customer service</li>
              <li>• Guaranteed time on-site</li>
              <li>• Quality assurance guarantee</li>
              <li>• Immediate follow-up on inquiries</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Guaranteed Clean</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Minimum 30 minutes extra time</li>
              <li>• No rush, thorough cleaning</li>
              <li>• Pride in workmanship</li>
              <li>• Comprehensive quality checks</li>
            </ul>
          </div>
        </div>

        {/* Service Process Breakdown */}
        <div className="bg-workplace-blue-deeper/80 backdrop-blur-sm rounded-2xl p-12 border border-blue-300/30">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            Our Comprehensive On-Boarding Process
          </h3>

        <div className="container-auto-fit grid-stretch-fill">
            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Trial Period</h5>
              <p className="text-black text-sm">Comprehensive assessment to identify your specific cleaning needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Custom Plan</h5>
              <p className="text-black text-sm">Design work-plan that fits your needs and budget exactly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Time Guarantee</h5>
              <p className="text-black text-sm">Designated time on-site plus 30 minutes for thorough cleaning</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Quality Control</h5>
              <p className="text-black text-sm">Thorough checks and balances to ensure service satisfaction</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Ongoing Support</h5>
              <p className="text-black text-sm">Flexible service with last-minute requests and daily work plans</p>
            </div>
          </div>
        </div>

        {/* Guarantee Promise */}
        <div className="text-center mt-16">
          <div className="inline-block bg-workplace-blue-deeper/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-300/30">
            <h4 className="text-2xl font-bold text-black mb-4">
              Why The Extra 30 Minutes Matters
            </h4>
            <p className="text-black text-lg max-w-3xl leading-relaxed">
              The faster the service, the lower the quality. Our extra 30 minutes allows cleaners to slow down, 
              work thoroughly, and take pride in their work. Many clients have valuable furniture and office 
              buildings that deserve careful, unhurried attention.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+12044152910" 
                className="bg-workplace-green text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
              >
                Get FREE Assessment
              </a>
              <button 
                onClick={() => document.getElementById('quote-calculator')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-white text-workplace-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Calculate Your Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```analysis
The code was modified to replace the original grid div with a new div that uses the classes "container-auto-fit" and "grid-stretch-fill" to allow containers to resize intelligently and fill awkward blank areas.
```

```replit_final_file
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
              <li>• Selective hiring based on experience & attitude</li>
              <li>• Above industry average compensation</li>
              <li>• Guaranteed time on-site for quality work</li>
              <li>• Criminal background checks</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">We Recommend</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• 20+ years of professional experience</li>
              <li>• Detailed worksite plan development</li>
              <li>• Thorough needs assessment</li>
              <li>• Customized cleaning programs</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Service Policies</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Live professional customer service</li>
              <li>• Guaranteed time on-site</li>
              <li>• Quality assurance guarantee</li>
              <li>• Immediate follow-up on inquiries</li>
            </ul>
          </div>

          <div className="design-container-floating p-8 text-center bg-workplace-blue-deeper/80 backdrop-blur-sm border border-blue-300/30">
            <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-6 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-black mb-4">Guaranteed Clean</h4>
            <ul className="text-black text-sm space-y-2 text-left">
              <li>• Minimum 30 minutes extra time</li>
              <li>• No rush, thorough cleaning</li>
              <li>• Pride in workmanship</li>
              <li>• Comprehensive quality checks</li>
            </ul>
          </div>
        </div>

        {/* Service Process Breakdown */}
        <div className="bg-workplace-blue-deeper/80 backdrop-blur-sm rounded-2xl p-12 border border-blue-300/30">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            Our Comprehensive On-Boarding Process
          </h3>

          <div className="container-auto-fit grid-stretch-fill">
            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Trial Period</h5>
              <p className="text-black text-sm">Comprehensive assessment to identify your specific cleaning needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Custom Plan</h5>
              <p className="text-black text-sm">Design work-plan that fits your needs and budget exactly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Time Guarantee</h5>
              <p className="text-black text-sm">Designated time on-site plus 30 minutes for thorough cleaning</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Quality Control</h5>
              <p className="text-black text-sm">Thorough checks and balances to ensure service satisfaction</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-workplace-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h5 className="text-black font-semibold mb-2">Ongoing Support</h5>
              <p className="text-black text-sm">Flexible service with last-minute requests and daily work plans</p>
            </div>
          </div>
        </div>

        {/* Guarantee Promise */}
        <div className="text-center mt-16">
          <div className="inline-block bg-workplace-blue-deeper/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-300/30">
            <h4 className="text-2xl font-bold text-black mb-4">
              Why The Extra 30 Minutes Matters
            </h4>
            <p className="text-black text-lg max-w-3xl leading-relaxed">
              The faster the service, the lower the quality. Our extra 30 minutes allows cleaners to slow down, 
              work thoroughly, and take pride in their work. Many clients have valuable furniture and office 
              buildings that deserve careful, unhurried attention.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+12044152910" 
                className="bg-workplace-green text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
              >
                Get FREE Assessment
              </a>
              <button 
                onClick={() => document.getElementById('quote-calculator')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-white text-workplace-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Calculate Your Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}