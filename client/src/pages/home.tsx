import Header from "@/components/header";
import Hero from "@/components/hero";
import ValuePropositionNew from "@/components/value-proposition-new";
import Customers from "@/components/customers-simple";
import Services from "@/components/services";
import AboutNew from "@/components/about-new";
import QuoteCalculator from "@/components/quote-calculator";
import Testimonials from "@/components/testimonials";
import FinalCTA from "@/components/final-cta";
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
        <ValuePropositionNew />
        <Customers />
        <Services />
        <AboutNew />
        <QuoteCalculator />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <InstallPWA />
    </div>
  );
}
