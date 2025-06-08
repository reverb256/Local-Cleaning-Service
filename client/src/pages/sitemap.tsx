import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Briefcase, Calculator, Users, Phone, Shield, FileText, MapPin } from "lucide-react";
import { Link } from "wouter";

const siteStructure = [
  {
    title: "Main Pages",
    icon: Home,
    pages: [
      { name: "Home", path: "/", description: "Professional Excellence. Guaranteed Results." },
      { name: "Elite Commercial Solutions", path: "/#services", description: "Transformative cleaning excellence for discerning businesses" },
      { name: "Executive Quote Generator", path: "/#quote", description: "Precision pricing for professional excellence" },
      { name: "Excellence Redefined", path: "/#about", description: "Decade-plus legacy of operational mastery" },
      { name: "Strategic Contact", path: "/#contact", description: "Partnership inquiries and consultation" }
    ]
  },
  {
    title: "Service Solutions",
    icon: Briefcase,
    pages: [
      { name: "Premium Daily Operations", path: "/#services", description: "Elite cleaning professionals delivering consistent excellence" },
      { name: "Tailored Excellence Programs", path: "/#services", description: "Strategically designed cleaning solutions" },
      { name: "Advanced Floor Mastery", path: "/#services", description: "Professional-grade floor preservation services" },
      { name: "Executive Supply Solutions", path: "/#services", description: "Premium supply management for professional standards" },
      { name: "Strategic Support Services", path: "/#services", description: "Enhanced capacity solutions for dynamic demands" },
      { name: "Biochem Environmental Excellence", path: "/#services", description: "Advanced eco-solutions for superior hygiene control" }
    ]
  },
  {
    title: "Business Information",
    icon: MapPin,
    pages: [
      { name: "Contact Information", path: "/#contact", description: "2-761 Marion Street, Winnipeg, MB R2J 0K6" },
      { name: "Phone Consultation", path: "tel:2043342817", description: "(204) 334-2817 - Executive consultation line" },
      { name: "Service Area", path: "/#about", description: "Winnipeg and surrounding commercial districts" }
    ]
  },
  {
    title: "Legal & Policies",
    icon: Shield,
    pages: [
      { name: "Privacy Policy", path: "/privacy-policy", description: "Comprehensive privacy protection framework" },
      { name: "Terms of Service", path: "/terms-of-service", description: "Professional service terms and conditions" },
      { name: "Sitemap", path: "/sitemap", description: "Complete website navigation structure" }
    ]
  }
];

export default function Sitemap() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      window.location.href = `/${sectionId}`;
    }
  };

  return (
    <div className="min-h-screen bg-workplace-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-workplace-dark mb-4">Sitemap</h1>
          <p className="text-xl text-workplace-gray">
            Complete navigation structure for Workplace Janitorial Services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {siteStructure.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <div key={sectionIndex} className="bg-white p-8 rounded-lg border-2 border-workplace-blue">
                <div className="flex items-center mb-6">
                  <SectionIcon className="w-6 h-6 text-workplace-blue mr-3" />
                  <h2 className="text-2xl font-bold text-workplace-dark">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="border-l-4 border-workplace-cyan pl-4 py-2 hover:bg-workplace-light transition-colors">
                      {page.path.startsWith('tel:') ? (
                        <a href={page.path} className="block">
                          <h3 className="text-lg font-semibold text-workplace-blue hover:text-workplace-green transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-sm text-workplace-gray">{page.description}</p>
                        </a>
                      ) : page.path.startsWith('/#') ? (
                        <button onClick={() => scrollToSection(page.path)} className="block text-left w-full">
                          <h3 className="text-lg font-semibold text-workplace-blue hover:text-workplace-green transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-sm text-workplace-gray">{page.description}</p>
                        </button>
                      ) : (
                        <Link href={page.path} className="block">
                          <h3 className="text-lg font-semibold text-workplace-blue hover:text-workplace-green transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-sm text-workplace-gray">{page.description}</p>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-workplace-blue text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Professional Excellence?</h2>
          <p className="text-lg mb-6">
            Contact Winnipeg's premier commercial cleaning authority today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote">
              <Button className="bg-white text-workplace-blue hover:bg-gray-100">
                <Calculator className="w-4 h-4 mr-2" />
                Get Executive Quote
              </Button>
            </Link>
            <Link href="/#contact">
              <Button className="bg-workplace-green text-white hover:bg-workplace-green-dark">
                <Phone className="w-4 h-4 mr-2" />
                Strategic Consultation
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-workplace-gray">
            <strong>Workplace Janitorial Services</strong><br />
            2-761 Marion Street, Winnipeg, MB R2J 0K6<br />
            Phone: (204) 334-2817
          </p>
        </div>
      </div>
    </div>
  );
}