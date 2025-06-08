import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'text' | 'quick-action';
}

const quickActions = [
  { id: 'quote', label: 'Get Quick Quote', action: 'quote' },
  { id: 'schedule', label: 'Schedule Service', action: 'schedule' },
  { id: 'emergency', label: 'Emergency Cleaning', action: 'emergency' },
  { id: 'contact', label: 'Speak to Representative', action: 'contact' }
];

const aiResponses = {
  greeting: "Hello! I'm your AI assistant for Workplace Janitorial Services. How can I help you with your office cleaning needs in Winnipeg today?",
  quote: "I'd be happy to help you get a quick quote! Can you tell me the approximate square footage of your office space?",
  schedule: "Perfect! Let me help you schedule a cleaning service. What type of cleaning service are you interested in - daily, weekly, or one-time deep cleaning?",
  emergency: "I understand you need emergency cleaning services. Our team can respond within 2 hours for urgent situations. What type of emergency cleaning do you need?",
  contact: "I'll connect you with one of our representatives right away. You can also call us directly at (204) 415-2910. What's the best way to reach you?",
  default: "I understand you're looking for information about our cleaning services. Our team specializes in premium office cleaning for Winnipeg businesses. Would you like a quote or to schedule a consultation?"
};

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addMessage(aiResponses.greeting, 'agent');
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (content: string, sender: 'user' | 'agent', type: 'text' | 'quick-action' = 'text') => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return aiResponses.quote;
    } else if (message.includes('schedule') || message.includes('book') || message.includes('appointment')) {
      return aiResponses.schedule;
    } else if (message.includes('emergency') || message.includes('urgent') || message.includes('immediate')) {
      return aiResponses.emergency;
    } else if (message.includes('contact') || message.includes('speak') || message.includes('representative')) {
      return aiResponses.contact;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Thanks for reaching out to Workplace Janitorial Services. I'm here to help with all your office cleaning needs in Winnipeg. What can I assist you with today?";
    } else if (message.includes('hours') || message.includes('time') || message.includes('when')) {
      return "We're available 24/7 for emergency services, and our regular business hours are Monday-Friday 8AM-6PM. Our cleaning teams work flexible schedules to accommodate your business needs. What time works best for you?";
    } else if (message.includes('area') || message.includes('winnipeg') || message.includes('location')) {
      return "We proudly serve all of Winnipeg and surrounding areas including St. Boniface, Transcona, and West Kildonan. Our team is familiar with commercial buildings throughout the city. What area is your office located in?";
    }
    
    return aiResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      setIsTyping(false);
      const response = generateAIResponse(inputValue);
      addMessage(response, 'agent');
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay
  };

  const handleQuickAction = (action: string, label: string) => {
    addMessage(label, 'user', 'quick-action');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = aiResponses[action as keyof typeof aiResponses] || aiResponses.default;
      addMessage(response, 'agent');
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">WJS Assistant</h3>
            <p className="text-xs opacity-90">Online • Typically responds in minutes</p>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-blue-100 dark:bg-blue-900' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Bot className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <div className={`rounded-lg p-3 text-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {messages.length === 1 && !isTyping && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action, action.label)}
                  className="text-xs h-8 text-left justify-start"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
            onClick={() => window.open('tel:+12044152910')}
          >
            <Phone className="w-3 h-3" />
            Call (204) 415-2910
          </Button>
        </div>
      </div>
    </div>
  );
}