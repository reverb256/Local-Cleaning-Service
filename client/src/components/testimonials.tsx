import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Office Manager",
    title: "Downtown Law Firm",
    content: "Workplace Janitorial has maintained our law office impeccably for three years. Their staff pass criminal background checks and their inspector ensures consistent quality through unannounced visits.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 2,
    name: "Facilities Director",
    title: "Winnipeg Medical Center",
    content: "Their vendor managed inventory program keeps our washroom supplies fully stocked. We never run out of toilet paper, hand soap, or sanitizers. The 30-day billing terms work perfectly for our accounting.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 3,
    name: "Operations Manager",
    title: "Technology Consulting Firm",
    content: "The 30-minute guarantee exceeded our expectations. Their staff completes all tasks and spends additional time on detail work at no extra cost. Comprehensive liability insurance gives us peace of mind.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-background"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-workplace-dark mb-6">What Our Clients Say</h2>
          <p className="text-2xl text-workplace-gray">
            Trusted by businesses across Winnipeg
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="design-container-premium glow-hover">
                      <div className="p-8 md:p-12">
                        <div className="flex items-center mb-8">
                          <div className="flex text-workplace-green text-2xl mr-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-current" />
                            ))}
                          </div>
                          <span className="text-workplace-gray text-lg font-medium">{testimonial.rating}.0/5.0</span>
                        </div>
                        <blockquote className="text-xl md:text-2xl text-workplace-dark mb-10 italic leading-relaxed font-medium">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="flex items-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover mr-6"
                          />
                          <div>
                            <div className="font-bold text-workplace-dark text-xl">{testimonial.name}</div>
                            <div className="text-workplace-blue text-lg font-medium">{testimonial.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-card rounded-full hover:bg-workplace-blue hover:bg-opacity-20"
          >
            <ChevronLeft className="w-6 h-6 text-workplace-blue" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-card rounded-full hover:bg-workplace-blue hover:bg-opacity-20"
          >
            <ChevronRight className="w-6 h-6 text-workplace-blue" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-workplace-blue scale-125' : 'bg-workplace-gray hover:bg-workplace-green'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
