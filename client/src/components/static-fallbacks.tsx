import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Send, Phone, Mail } from "lucide-react";

// Static Quote Calculator Component
export function StaticQuoteCalculator() {
  const [formData, setFormData] = useState({
    squareFootage: 0,
    frequency: '',
    serviceType: 'regular',
    additionalServices: [] as string[],
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const calculatePrice = () => {
    const baseRate = formData.serviceType === 'deep' ? 0.15 : formData.serviceType === 'eco' ? 0.10 : 0.12;
    const frequencyMultiplier = formData.frequency === 'weekly' ? 1 : formData.frequency === 'bi-weekly' ? 0.85 : 0.75;
    const additionalCost = formData.additionalServices.length * 50;
    
    const monthlyPrice = (formData.squareFootage * baseRate * frequencyMultiplier * 4) + additionalCost;
    setEstimatedPrice(monthlyPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static fallback - show contact information instead
    alert(`Thank you for your interest! Please contact us directly:\n\nPhone: (204) 415-2910\nEmail: info@workplacejanitorial.ca\n\nWe'll provide a detailed quote within 24 hours.`);
  };

  const handleAdditionalServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, additionalServices: [...prev.additionalServices, service] }));
    } else {
      setFormData(prev => ({ ...prev, additionalServices: prev.additionalServices.filter(s => s !== service) }));
    }
  };

  return (
    <section id="quote" className="py-24 bg-gradient-to-br from-workplace-light to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-workplace-dark mb-6">Get Your Instant Quote</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your cleaning service cost in seconds. Professional cleaning tailored to your space and budget.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="squareFootage" className="text-sm font-medium text-gray-700 mb-2 block">
                  Square Footage *
                </Label>
                <Input
                  id="squareFootage"
                  type="number"
                  placeholder="e.g., 2500"
                  value={formData.squareFootage || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setFormData(prev => ({ ...prev, squareFootage: value }));
                    if (value > 0) calculatePrice();
                  }}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Cleaning Frequency *
                </Label>
                <Select onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, frequency: value }));
                  if (formData.squareFootage > 0) calculatePrice();
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-900 mb-4 block">
                Service Type
              </Label>
              <RadioGroup value={formData.serviceType} onValueChange={(value) => {
                setFormData(prev => ({ ...prev, serviceType: value }));
                if (formData.squareFootage > 0) calculatePrice();
              }}>
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="cursor-pointer">
                    <div className="font-medium">Regular Clean</div>
                    <div className="text-sm text-gray-500">$0.12/sq ft</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="deep" id="deep" />
                  <Label htmlFor="deep" className="cursor-pointer">
                    <div className="font-medium">Deep Clean</div>
                    <div className="text-sm text-gray-500">$0.15/sq ft</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="eco" id="eco" />
                  <Label htmlFor="eco" className="cursor-pointer">
                    <div className="font-medium">Eco-Friendly</div>
                    <div className="text-sm text-gray-500">$0.10/sq ft</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-900 mb-4 block">
                Additional Services
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="windows"
                    checked={formData.additionalServices.includes('windows')}
                    onCheckedChange={(checked) => {
                      handleAdditionalServiceChange('windows', checked as boolean);
                      calculatePrice();
                    }}
                  />
                  <Label htmlFor="windows" className="cursor-pointer">Window Cleaning (+$50)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="floors"
                    checked={formData.additionalServices.includes('floors')}
                    onCheckedChange={(checked) => {
                      handleAdditionalServiceChange('floors', checked as boolean);
                      calculatePrice();
                    }}
                  />
                  <Label htmlFor="floors" className="cursor-pointer">Floor Waxing (+$100)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="carpet"
                    checked={formData.additionalServices.includes('carpet')}
                    onCheckedChange={(checked) => {
                      handleAdditionalServiceChange('carpet', checked as boolean);
                      calculatePrice();
                    }}
                  />
                  <Label htmlFor="carpet" className="cursor-pointer">Carpet Deep Clean (+$75)</Label>
                </div>
              </div>
            </div>

            <Card className="bg-workplace-light border-2 border-workplace-blue">
              <CardContent className="p-6 text-center">
                <div className="text-sm text-gray-500 mb-2">Estimated Monthly Cost</div>
                <div className="text-4xl font-bold text-workplace-blue mb-2">
                  ${estimatedPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Based on your selections
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  required
                />
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
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(204) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                  Business Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St, Winnipeg, MB"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                type="submit"
                className="bg-workplace-blue hover:bg-blue-700 text-white px-8 py-4 text-lg flex items-center justify-center"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Detailed Quote
              </Button>
              <a 
                href="tel:+12044152910" 
                className="bg-workplace-green text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (204) 415-2910
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Static Contact Form Component
export function StaticContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static fallback - show contact information
    alert(`Thank you for your message! We'll get back to you soon.\n\nFor immediate assistance:\nPhone: (204) 415-2910\nEmail: info@workplacejanitorial.ca`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-workplace-dark mb-6">Send us a message</h3>
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
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
            Subject
          </Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quote">Request Quote</SelectItem>
              <SelectItem value="service">Service Inquiry</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            type="submit"
            className="bg-workplace-blue hover:bg-blue-700 text-white px-8 py-3 flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <a 
            href="mailto:info@workplacejanitorial.ca" 
            className="bg-workplace-green text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Us
          </a>
        </div>
      </form>
    </div>
  );
}

// Static AI Chat Component
export function StaticAIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget">
      {isOpen && (
        <Card className="chat-window">
          <div className="bg-workplace-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <p className="text-xs text-white/90">Get in touch with our team</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 hover:bg-white/20"
              >
                ×
              </Button>
            </div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h4 className="font-bold text-workplace-dark mb-4">Contact Us</h4>
              <div className="space-y-3">
                <a 
                  href="tel:+12044152910" 
                  className="flex items-center justify-center space-x-2 bg-workplace-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>(204) 415-2910</span>
                </a>
                <a 
                  href="mailto:info@workplacejanitorial.ca" 
                  className="flex items-center justify-center space-x-2 bg-workplace-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Available Mon-Fri: 8AM-6PM, Sat: 9AM-4PM
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn bg-workplace-blue hover:bg-blue-700"
      >
        💬
      </Button>
    </div>
  );
}