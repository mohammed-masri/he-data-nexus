
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mic, MicOff, Sparkles, Brain, Send } from "lucide-react";

interface AIAssistantProps {
  context: string;
  onCommand?: (command: string) => void;
}

export const AIAssistant = ({ context, onCommand }: AIAssistantProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const responses = {
        "enrollment": "Based on Fall 2024 data, enrollment increased by 12.5% compared to last year. AI predicts continued growth if current recruitment strategies continue.",
        "retention": "Retention rates show concern in sophomore year. AI recommends implementing targeted intervention programs for students with GPA below 2.5.",
        "budget": "Budget utilization is optimal at 78.4%. AI suggests reallocating 5% from facilities to student success programs for better ROI.",
        "strategic": "AI analysis shows your institution is positioned #2 regionally. Key opportunity: Digital transformation initiative completion could improve ranking to #1."
      };
      
      const contextKey = Object.keys(responses).find(key => 
        query.toLowerCase().includes(key) || context.toLowerCase().includes(key)
      );
      
      const response = contextKey ? responses[contextKey as keyof typeof responses] : 
        `AI Analysis for ${context}: Based on current data trends, performance indicators show positive momentum with areas for strategic improvement. Key metrics suggest focusing on student success initiatives for maximum impact.`;
      
      setAiResponse(response);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setQuery("Show me the key insights for this quarter");
        setIsListening(false);
      }, 3000);
    }
  };

  const quickCommands = [
    "Generate executive summary",
    "Show at-risk indicators", 
    "Compare to last year",
    "Create board report"
  ];

  return (
    <Card className="border-ds-border bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          AI Assistant
          <Badge variant="outline" className="ml-2 text-xs">
            {context}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask AI about your data or give a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-h-[60px] text-sm"
          />
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleVoiceToggle}
              variant={isListening ? "destructive" : "outline"}
              size="sm"
              className="p-2"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              onClick={handleAskAI}
              disabled={!query.trim() || isLoading}
              size="sm"
              className="p-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickCommands.map((command, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-purple-100 text-xs"
              onClick={() => setQuery(command)}
            >
              {command}
            </Badge>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center text-sm text-purple-600">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI is analyzing your request...
          </div>
        )}

        {aiResponse && (
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">AI Insight</span>
            </div>
            <p className="text-sm text-gray-700">{aiResponse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
