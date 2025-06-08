import Header from "@/components/header";
import Hero from "@/components/hero";
import ValueProposition from "@/components/value-proposition";
import Customers from "@/components/customers-simple";
import Services from "@/components/services";
import About from "@/components/about";
import QuoteCalculator from "@/components/quote-calculator";
import Testimonials from "@/components/testimonials";
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
        <ValueProposition />
        <Customers />
        <Services />
        <About />
        <QuoteCalculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <InstallPWA />
    </div>
  );
}
