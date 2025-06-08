import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { toast } = useToast();

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactData) => {
      const response = await apiRequest('POST', '/api/contacts', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll respond within 2 hours during business hours.",
      });
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    },
    onError: () => {
      toast({
        title: "Sending Failed",
        description: "Unable to send message. Please try again or call (204) 415-2910.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitContactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "(204) 415-2910",
      subtitle: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@elitecleanwpg.ca",
      subtitle: "We respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Main Street\nWinnipeg, MB R3C 1A1",
      subtitle: "Visit our office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 8 AM - 6 PM\nSat: 9 AM - 4 PM",
      subtitle: "Sunday: By appointment"
    }
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-background"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-workplace-dark mb-6">Contact Us</h2>
          <p className="text-2xl text-workplace-gray">
            Ready to transform your workspace? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card p-10">
            <h3 className="text-3xl font-bold text-workplace-dark mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(204) 555-0123"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Subject *
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Request Quote</SelectItem>
                      <SelectItem value="booking">Schedule Service</SelectItem>
                      <SelectItem value="question">General Question</SelectItem>
                      <SelectItem value="complaint">Service Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your cleaning needs..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-field resize-vertical"
                    required
                  />
                </div>

                {/* CAPTCHA Placeholder */}
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-600">
                  <div className="flex items-center justify-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I'm not a robot</span>
                    <div className="ml-auto text-xs text-gray-400">reCAPTCHA</div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={submitContactMutation.isPending}
                  className="w-full bg-workplace-blue text-white hover:bg-workplace-blue-dark py-4 text-lg font-semibold flex items-center justify-center"
                >
                  {submitContactMutation.isPending ? (
                    <div className="flex items-center">
                      <Send className="w-5 h-5 mr-2 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-10">
              <h3 className="text-3xl font-bold text-workplace-dark mb-8">Contact Information</h3>
                
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start glass-card p-6">
                      <div className="diamond-shape mr-6">
                        <div className="diamond-shape-content">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-workplace-dark text-xl mb-2">{info.title}</h4>
                        <p className="text-workplace-gray text-lg whitespace-pre-line font-medium mb-2">{info.content}</p>
                        <p className="text-workplace-blue text-base">{info.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="glass-card p-10">
              <h4 className="font-bold text-workplace-dark text-2xl mb-6">Our Location</h4>
              <div className="bg-workplace-blue bg-opacity-10 rounded-2xl p-6 mb-6">
                <div className="diamond-shape mx-auto mb-4">
                  <div className="diamond-shape-content">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-workplace-dark text-lg font-medium">2-761 Marion Street</p>
                  <p className="text-workplace-dark text-lg font-medium">Winnipeg, MB R2J 0K6</p>
                  <p className="text-workplace-gray text-base mt-2">Serving Greater Winnipeg Area</p>
                </div>
              </div>
              
              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border-2 border-workplace-blue">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569.8875!2d-97.089343!3d49.88262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea73c4c4b1b4b1%3A0xfb7b7b7b7b7b7b70!2s761%20Marion%20St%2C%20Winnipeg%2C%20MB%20R2J%200K6%2C%20Canada!5e0!3m2!1sen!2sca!4v1640995200000!5m2!1sen!2sca"
                  width="100%" 
                  height="300" 
                  style={{border: 0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Workplace Janitorial Services Location - 2-761 Marion Street, Winnipeg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
