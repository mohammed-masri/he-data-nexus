
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Lightbulb, TrendingUp, Send, Mic, Sparkles } from "lucide-react";
import { useState } from "react";

interface EnhancedAIAssistantProps {
  domain: string;
  filters?: any;
}

export const EnhancedAIAssistant = ({ domain, filters }: EnhancedAIAssistantProps) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responses, setResponses] = useState<Array<{type: 'user' | 'ai', message: string, timestamp: string, confidence?: number}>>([]);

  const recentInsights = [
    {
      type: "trend",
      title: "Enrollment Surge Detected",
      description: "Engineering applications up 34% compared to last year",
      confidence: 94.2,
      timestamp: "2 hours ago"
    },
    {
      type: "risk",
      title: "Retention Alert",
      description: "15 students in Computer Science showing early warning signs",
      confidence: 87.8,
      timestamp: "4 hours ago"
    },
    {
      type: "opportunity",
      title: "Scholarship Optimization",
      description: "Redistribution could improve retention by 8.3%",
      confidence: 91.5,
      timestamp: "6 hours ago"
    }
  ];

  const suggestedQueries = [
    "Show me students at risk of dropping out this semester",
    "Compare enrollment trends across all departments",
    "What's the ROI of our scholarship programs?",
    "Which programs have the highest job placement rates?",
    "Forecast enrollment for next academic year",
    "Identify top performing academic departments"
  ];

  const handleSendQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    const userMessage = { type: 'user' as const, message: query, timestamp: new Date().toLocaleTimeString() };
    setResponses(prev => [...prev, userMessage]);
    
    // Simulate AI processing
    setTimeout(() => {
      const contextualResponses = {
        "enrollment": "Based on current data, enrollment is trending 15.2% above target for Fall 2024. The Engineering department shows the strongest growth at 23%, followed by Business at 18%. AI recommends maintaining current recruitment strategies while preparing capacity expansion for Spring 2025.",
        "retention": "Retention analysis identifies 156 students across all departments showing early warning indicators. Primary risk factors include: academic performance below 2.5 GPA (34%), financial difficulties (28%), and social integration challenges (22%). Immediate intervention recommended for 42 high-risk students.",
        "budget": "Budget utilization stands at optimal 78.4% efficiency. AI analysis suggests reallocating 5% from facilities maintenance to student success programs could improve retention by 3.2% while maintaining fiscal responsibility.",
        "scholarship": "Scholarship program analysis shows 287% ROI potential through strategic redistribution. Current allocation favors academic merit (60%) vs need-based (40%). AI recommends shifting to 45% merit, 55% need-based for optimal retention impact.",
        "default": `AI Analysis for ${domain}: Current performance metrics show positive momentum across all key indicators. Based on your filters (${Object.entries(filters).map(([k,v]) => `${k}: ${v}`).join(', ')}), I recommend focusing on strategic initiatives that leverage your strongest performing areas while addressing identified risk factors.`
      };
      
      const contextKey = Object.keys(contextualResponses).find(key => 
        query.toLowerCase().includes(key) && key !== 'default'
      );
      
      const response = contextKey ? contextualResponses[contextKey as keyof typeof contextualResponses] : contextualResponses.default;
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-100% confidence
      
      const aiMessage = { 
        type: 'ai' as const, 
        message: response, 
        timestamp: new Date().toLocaleTimeString(),
        confidence 
      };
      
      setResponses(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 2000);
    
    setQuery("");
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const voiceQueries = [
          "Show me enrollment trends for this semester",
          "What are the key risk factors for student retention?",
          "Generate a summary of department performance",
          "Identify opportunities for budget optimization"
        ];
        const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
        setQuery(randomQuery);
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSuggestedQuery = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <Card className="h-full border-ds-border bg-gradient-to-br from-ds-bg to-ds-secondary/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-ds-primary" />
            <span className="text-ds-text-primary">AI Analytics Assistant</span>
          </div>
          <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20">
            <div className="w-2 h-2 bg-ds-primary rounded-full mr-1 animate-pulse" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-ds-bg-grey">
            <TabsTrigger value="chat" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Chat</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Insights</TabsTrigger>
            <TabsTrigger value="suggestions" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="h-64 bg-ds-bg-grey/50 rounded-lg p-4 overflow-y-auto space-y-3">
              {responses.length === 0 && (
                <div className="text-center text-ds-text-muted text-sm py-8">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-ds-primary/50" />
                  Start a conversation with AI to get insights about your analytics data
                </div>
              )}
              {responses.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-ds-primary text-white' 
                      : 'bg-white border border-ds-border text-ds-text-primary'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                      <span>{message.timestamp}</span>
                      {message.type === 'ai' && message.confidence && (
                        <span>{message.confidence}% confidence</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-ds-border p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-ds-primary animate-pulse" />
                      <span className="text-sm text-ds-text-secondary">AI is analyzing your request...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Ask about your analytics data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                className="flex-1 border-ds-border"
              />
              <Button 
                onClick={handleVoiceInput}
                variant="outline"
                size="sm"
                className={`border-ds-border ${isListening ? 'bg-red-100 border-red-300 text-red-600' : 'text-ds-text-secondary hover:text-ds-primary'}`}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendQuery} 
                size="sm"
                disabled={!query.trim() || isProcessing}
                className="bg-ds-primary hover:bg-ds-primary-dark text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestedQueries.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuery(suggestion)}
                  className="text-xs border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-3">
            {recentInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-ds-bg-grey/50 rounded-lg border border-ds-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {insight.type === 'trend' && <TrendingUp className="w-4 h-4 text-ds-primary" />}
                    {insight.type === 'risk' && <MessageSquare className="w-4 h-4 text-orange-600" />}
                    {insight.type === 'opportunity' && <Lightbulb className="w-4 h-4 text-emerald-600" />}
                    <span className="font-medium text-sm text-ds-text-primary">{insight.title}</span>
                  </div>
                  <span className="text-xs text-ds-text-muted">{insight.timestamp}</span>
                </div>
                <p className="text-sm text-ds-text-secondary mb-2">{insight.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs border-ds-border">
                    {insight.confidence}% confidence
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs text-ds-primary hover:bg-ds-secondary/50">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-2">
            {suggestedQueries.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full text-left justify-start text-sm p-3 h-auto text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
                onClick={() => handleSuggestedQuery(suggestion)}
              >
                <MessageSquare className="w-4 h-4 mr-2 text-ds-primary/70" />
                {suggestion}
              </Button>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
