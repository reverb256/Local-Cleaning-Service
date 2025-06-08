import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Send } from "lucide-react";

interface QuoteData {
  squareFootage: number;
  frequency: string;
  serviceType: string;
  additionalServices: string[];
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function QuoteCalculator() {
  const [formData, setFormData] = useState<QuoteData>({
    squareFootage: 0,
    frequency: '',
    serviceType: 'regular',
    additionalServices: [],
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const { toast } = useToast();

  const calculatePriceMutation = useMutation({
    mutationFn: async (data: Partial<QuoteData>) => {
      const response = await apiRequest('POST', '/api/calculate-quote', data);
      return response.json();
    },
    onSuccess: (data) => {
      setEstimatedPrice(data.estimatedPrice);
    },
    onError: () => {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate price. Please try again.",
        variant: "destructive",
      });
    }
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteData & { estimatedPrice: string }) => {
      const response = await apiRequest('POST', '/api/quotes', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Submitted!",
        description: "We'll contact you within 24 hours with a detailed quote.",
      });
      // Reset form
      setFormData({
        squareFootage: 0,
        frequency: '',
        serviceType: 'regular',
        additionalServices: [],
        name: '',
        email: '',
        phone: '',
        address: ''
      });
      setEstimatedPrice(0);
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "Unable to submit quote. Please try again or call (204) 415-2910.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (field: keyof QuoteData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // Auto-calculate price when key fields change
    if (['squareFootage', 'frequency', 'serviceType', 'additionalServices'].includes(field)) {
      if (newData.squareFootage > 0 && newData.frequency && newData.serviceType) {
        calculatePriceMutation.mutate({
          squareFootage: newData.squareFootage,
          frequency: newData.frequency,
          serviceType: newData.serviceType,
          additionalServices: newData.additionalServices
        });
      }
    }
  };

  const handleAdditionalServiceChange = (service: string, checked: boolean) => {
    const newServices = checked 
      ? [...formData.additionalServices, service]
      : formData.additionalServices.filter(s => s !== service);
    handleInputChange('additionalServices', newServices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.squareFootage || !formData.frequency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitQuoteMutation.mutate({
      ...formData,
      estimatedPrice: estimatedPrice.toString()
    });
  };

  return (
    <section id="quote" className="py-20" style={{background: 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#0277BD'}}>Executive Quote Generator</h2>
          <p className="text-xl" style={{color: '#2D2D2D'}}>
            Precision pricing for professional excellence
          </p>
        </div>

        <div className="design-container-primary p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Office Size */}
              <div>
                <Label htmlFor="squareFootage" className="text-base font-medium text-gray-900 mb-2 block">
                  Office Size (Square Feet) *
                </Label>
                <Input
                  id="squareFootage"
                  type="number"
                  placeholder="e.g., 2500"
                  value={formData.squareFootage || ''}
                  onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value) || 0)}
                  className="input-field"
                  required
                />
              </div>

              {/* Cleaning Frequency */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-2 block">
                  Cleaning Frequency *
                </Label>
                <Select 
                  value={formData.frequency} 
                  onValueChange={(value) => handleInputChange('frequency', value)}
                >
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Service Type */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-2 block">
                  Service Type *
                </Label>
                <RadioGroup 
                  value={formData.serviceType} 
                  onValueChange={(value) => handleInputChange('serviceType', value)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular" className="cursor-pointer">
                      <div className="font-medium">Regular</div>
                      <div className="text-sm text-gray-500">$0.08/sq ft</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <RadioGroupItem value="deep" id="deep" />
                    <Label htmlFor="deep" className="cursor-pointer">
                      <div className="font-medium">Deep Clean</div>
                      <div className="text-sm text-gray-500">$0.15/sq ft</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <RadioGroupItem value="eco" id="eco" />
                    <Label htmlFor="eco" className="cursor-pointer">
                      <div className="font-medium">Eco-Friendly</div>
                      <div className="text-sm text-gray-500">$0.10/sq ft</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional Services */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">
                  Additional Services
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="windows"
                      checked={formData.additionalServices.includes('windows')}
                      onCheckedChange={(checked) => handleAdditionalServiceChange('windows', checked as boolean)}
                    />
                    <Label htmlFor="windows" className="cursor-pointer">Window Cleaning (+$50)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="floors"
                      checked={formData.additionalServices.includes('floors')}
                      onCheckedChange={(checked) => handleAdditionalServiceChange('floors', checked as boolean)}
                    />
                    <Label htmlFor="floors" className="cursor-pointer">Floor Waxing (+$100)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="carpet"
                      checked={formData.additionalServices.includes('carpet')}
                      onCheckedChange={(checked) => handleAdditionalServiceChange('carpet', checked as boolean)}
                    />
                    <Label htmlFor="carpet" className="cursor-pointer">Carpet Deep Clean (+$75)</Label>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <Card className="bg-white border-2 border-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-sm text-gray-500 mb-2">Estimated Monthly Cost</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${estimatedPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {calculatePriceMutation.isPending ? "Calculating..." : "Based on your selections"}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
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
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                    Office Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main St, Winnipeg, MB"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={submitQuoteMutation.isPending}
                className="w-full design-container-premium py-4 text-lg font-semibold flex items-center justify-center glow-hover text-white"
                style={{
                  background: 'linear-gradient(135deg, #00BCD4 0%, #A4D65E 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 30px rgba(0, 188, 212, 0.3)'
                }}
              >
                {submitQuoteMutation.isPending ? (
                  <div className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    <span>Secure Executive Quote</span>
                  </div>
                )}
              </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
