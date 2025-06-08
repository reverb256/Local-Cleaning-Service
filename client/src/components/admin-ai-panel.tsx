import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Brain, Settings, Zap, Eye, Clock, CheckCircle, XCircle } from "lucide-react";

interface AICommand {
  id: number;
  command: string;
  target: string;
  action: string;
  status: string;
  result?: string;
  createdAt: string;
  executedAt?: string;
}

interface SiteContent {
  id: number;
  sectionId: string;
  content: any;
  version: string;
  updatedAt: string;
}

export default function AdminAIPanel() {
  const [command, setCommand] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch recent AI commands
  const { data: commands = [], isLoading: commandsLoading } = useQuery({
    queryKey: ['/api/admin/ai-commands'],
    enabled: isExpanded
  });

  // Fetch site content versions
  const { data: siteContent = [], isLoading: contentLoading } = useQuery({
    queryKey: ['/api/admin/site-content'],
    enabled: isExpanded
  });

  // Submit AI command mutation
  const submitCommandMutation = useMutation({
    mutationFn: async (data: { command: string; sessionId: string }) => {
      const response = await apiRequest('POST', '/api/admin/ai-command', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "AI Command Executed",
        description: data.result || "Command processed successfully",
      });
      setCommand("");
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-commands'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/site-content'] });
    },
    onError: (error) => {
      toast({
        title: "Command Failed",
        description: "Failed to execute AI command. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    submitCommandMutation.mutate({
      command: command.trim(),
      sessionId
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="design-container-floating hover-floating p-4 bg-workplace-blue-deeper text-white shadow-2xl"
          size="lg"
        >
          <Brain className="w-6 h-6 mr-2" />
          AI Admin Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-workplace-blue-deeper to-workplace-cyan-deep text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">AI Site Management</h2>
                <p className="text-blue-100">Dynamic content control and automation</p>
              </div>
            </div>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Command Interface */}
            <div className="space-y-6">
              <Card className="design-container-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-workplace-blue" />
                    AI Command Interface
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-workplace-dark mb-2 block">
                        Natural Language Command
                      </label>
                      <Textarea
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder="Example: Update the hero section title to 'Excellence in Commercial Cleaning' or Change the contact phone number to (204) 555-0123"
                        className="min-h-[100px] border-workplace-cyan-deep/20 focus:border-workplace-blue"
                        disabled={submitCommandMutation.isPending}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!command.trim() || submitCommandMutation.isPending}
                      className="w-full bg-workplace-blue hover:bg-workplace-blue-deeper"
                    >
                      {submitCommandMutation.isPending ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Execute Command
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-workplace-blue mb-2">Example Commands:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• "Update the services section to include 'Medical Grade Sanitization'"</li>
                      <li>• "Change the contact email to admin@workplacejanitorial.ca"</li>
                      <li>• "Add a testimonial from Marriott about excellent service"</li>
                      <li>• "Update the quote calculator base price to $0.15 per square foot"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Commands */}
              <Card className="design-container-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-workplace-green-deeper" />
                    Recent Commands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {commandsLoading ? (
                    <div className="text-center py-4">Loading commands...</div>
                  ) : commands.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No commands executed yet</div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {commands.slice(0, 10).map((cmd: AICommand) => (
                        <div key={cmd.id} className="border rounded-lg p-3 hover-gradient-shift">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-workplace-dark truncate">
                                {cmd.command}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {cmd.target}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {cmd.action}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(cmd.status)}
                              <Badge className={`text-xs ${getStatusColor(cmd.status)}`}>
                                {cmd.status}
                              </Badge>
                            </div>
                          </div>
                          {cmd.result && (
                            <p className="text-xs text-green-600 mt-2 bg-green-50 p-2 rounded">
                              {cmd.result}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Content Management */}
            <div className="space-y-6">
              <Card className="design-container-floating">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-workplace-teal-deep" />
                    Content Versions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contentLoading ? (
                    <div className="text-center py-4">Loading content...</div>
                  ) : siteContent.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No content versions found</div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {siteContent.map((content: SiteContent) => (
                        <div key={content.id} className="border rounded-lg p-3 hover-pulse-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-workplace-dark capitalize">
                                {content.sectionId.replace('_', ' ')}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Version {content.version}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {new Date(content.updatedAt).toLocaleDateString()}
                            </Badge>
                          </div>
                          {content.content && Object.keys(content.content).length > 0 && (
                            <div className="mt-2 text-xs text-gray-500">
                              {Object.keys(content.content).slice(0, 3).join(', ')}
                              {Object.keys(content.content).length > 3 && '...'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Capabilities */}
              <Card className="design-container-premium">
                <CardHeader>
                  <CardTitle className="text-workplace-blue">AI Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Text Updates', icon: '📝' },
                      { name: 'Color Changes', icon: '🎨' },
                      { name: 'Service Management', icon: '🧹' },
                      { name: 'Contact Updates', icon: '📞' },
                      { name: 'Pricing Changes', icon: '💰' },
                      { name: 'Content Sections', icon: '📋' }
                    ].map((capability) => (
                      <div key={capability.name} className="text-center p-3 bg-blue-50 rounded-lg hover-scale-glow">
                        <div className="text-2xl mb-1">{capability.icon}</div>
                        <div className="text-xs font-medium text-workplace-blue">
                          {capability.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}