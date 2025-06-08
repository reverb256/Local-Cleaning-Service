import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import QuoteCalculator from "@/components/quote-calculator";
import CustomersSimple from "@/components/customers-simple";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function SimpleApp() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <QuoteCalculator />
        <CustomersSimple />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}