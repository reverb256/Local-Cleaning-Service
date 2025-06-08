import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ServiceGuarantee from "@/components/service-guarantee";
import BusinessZones from "@/components/business-zones";
import QuoteCalculator from "@/components/quote-calculator";
import Customers from "@/components/customers-simple";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
// import AIChat from "@/components/ai-chat";
import InstallPWA from "@/components/install-pwa";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <ServiceGuarantee />
        <BusinessZones />
        <QuoteCalculator />
        <Customers />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <InstallPWA />
    </div>
  );
}
