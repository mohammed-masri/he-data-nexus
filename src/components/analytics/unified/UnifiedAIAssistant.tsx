
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, MessageSquare, Mic, MicOff, Sparkles, Send, 
  TrendingUp, AlertTriangle, Minimize2, Maximize2 
} from "lucide-react";

interface UnifiedAIAssistantProps {
  context: string;
  filters: any;
  viewMode: 'executive' | 'detailed';
}

export const UnifiedAIAssistant = ({ context, filters, viewMode }: UnifiedAIAssistantProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMode, setActiveMode] = useState<'insights' | 'chat' | 'voice'>('insights');
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const contextualResponses = {
        "executive-dashboard": {
          "enrollment": "Executive insight: Enrollment increased 15.2% above target. AI recommends maintaining current recruitment strategies while preparing for 8% Spring growth. Strategic focus should be on capacity planning for Engineering and Business programs.",
          "retention": "Executive alert: 156 students at risk across all departments. Immediate intervention recommended with 94% confidence for 5% retention improvement. Budget allocation of $280K recommended for targeted support programs.",
          "budget": "Executive summary: Budget efficiency optimal at 78.4%. Strategic reallocation of 5% to student success programs recommended for 287% ROI. Priority areas: academic support services and financial aid expansion.",
          "strategic": "Strategic AI Analysis: Institution positioned for #1 regional ranking by Q2 2025. Key differentiators: 23% enrollment growth, 89.2% graduation rate, and optimal budget efficiency. Recommend accelerating digital transformation initiatives.",
          "default": "Executive AI Analysis: Current performance exceeds all targets. Strategic positioning strong with sustained growth trajectory. Key opportunities identified in retention programs and technology infrastructure investment."
        },
        "detailed-analytics": {
          "enrollment": "Detailed analysis: 15.2% enrollment growth driven by 23% increase in STEM applications, 18% improvement in retention rates, and 12% growth in graduate programs. Department-level breakdown shows Engineering leading with 34% growth.",
          "retention": "Risk analysis: 156 students showing early indicators across Engineering (67 students), Business (52), and Liberal Arts (37). Intervention success rate historically 78% with targeted academic support and financial counseling.",
          "budget": "Budget deep-dive: 78.4% utilization optimal across all categories. Department-level analysis shows reallocation opportunities in facilities (12% overbudget) and technology (8% underutilized). Recommend strategic redistribution for student success programs.",
          "departments": "Department performance analysis: Engineering shows strongest metrics (enrollment +34%, retention 91.2%), Business demonstrates consistent growth (enrollment +18%, job placement 94%), Liberal Arts requires attention (retention 84.3%, below target).",
          "default": "Comprehensive analysis: Multi-domain performance indicators show sustained growth trajectory with strategic optimization opportunities across enrollment, retention, and budget allocation."
        }
      };

      const responses = contextualResponses[context as keyof typeof contextualResponses] || contextualResponses["executive-dashboard"];
      const contextKey = Object.keys(responses).find(key => 
        query.toLowerCase().includes(key) && key !== 'default'
      );
      
      const response = contextKey ? responses[contextKey as keyof typeof responses] : responses.default;
      setAiResponse(response);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        const voiceQueries = viewMode === 'executive' 
          ? ["Show me executive summary for this quarter", "What are the strategic priorities?", "Identify key performance indicators", "Generate board presentation insights"]
          : ["Provide detailed analysis for key metrics", "Show department performance breakdown", "Analyze enrollment trends", "Review budget allocation efficiency"];
        
        const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
        setQuery(randomQuery);
        setIsListening(false);
      }, 3000);
    }
  };

  const quickCommands = viewMode === 'executive' 
    ? ["Executive summary", "Strategic insights", "Risk alerts", "Generate board report"]
    : ["Detailed analysis", "Department breakdown", "Trend analysis", "Export data"];

  const proactiveInsights = [
    {
      type: "opportunity",
      title: viewMode === 'executive' ? "Strategic Opportunity" : "Growth Analysis",
      message: viewMode === 'executive' 
        ? "AI detected 23% enrollment capacity with optimal Spring expansion timing. Strategic investment in Engineering and Business programs recommended for maximum ROI."
        : "Detailed enrollment analysis shows 23% capacity with optimal expansion timing in Q2. Engineering program shows 67% application increase, Business at 52% growth rate.",
      urgency: "medium",
      confidence: 89,
      icon: TrendingUp,
      color: "emerald"
    },
    {
      type: "alert",
      title: viewMode === 'executive' ? "Executive Alert" : "Risk Assessment",
      message: viewMode === 'executive'
        ? "156 students at risk requiring immediate intervention. 5% retention improvement achievable with $280K targeted program investment."
        : "Risk model identifies 156 students: Engineering (67), Business (52), Liberal Arts (37). Historical intervention success rate 78% with academic support and financial counseling.",
      urgency: "high",
      confidence: 94,
      icon: AlertTriangle,
      color: "red"
    }
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsMinimized(false)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-ds-primary via-ds-primary-dark to-ds-primary hover:from-ds-primary-dark hover:via-ds-primary hover:to-ds-primary-dark text-white shadow-2xl border-4 border-white/20 backdrop-blur-sm"
          >
            <Brain className="w-8 h-8" />
          </Button>
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-lg">
              {proactiveInsights.length}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-96">
      <Card className="border-2 border-ds-border bg-white/95 backdrop-blur-lg shadow-2xl">
        <CardHeader className="pb-4 bg-gradient-to-r from-ds-secondary/80 to-ds-bg-grey/80">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-ds-text-primary flex items-center">
              <div className="p-2 bg-white rounded-xl mr-3 shadow-sm">
                <Brain className="w-5 h-5 text-ds-primary" />
              </div>
              AI Assistant
              <Badge variant="outline" className="ml-2 text-xs border-ds-border">
                {viewMode === 'executive' ? 'Executive' : 'Detailed'}
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-emerald-100 text-emerald-800 text-xs flex items-center font-medium border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-ds-text-muted hover:text-ds-text-primary"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex space-x-1 bg-white/80 p-1 rounded-xl shadow-sm border border-ds-border">
            <Button
              variant={activeMode === 'insights' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveMode('insights')}
              className={`flex-1 text-xs font-medium ${
                activeMode === 'insights' 
                  ? 'bg-ds-primary text-white' 
                  : 'text-ds-text-secondary hover:text-ds-primary'
              }`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Insights
            </Button>
            <Button
              variant={activeMode === 'chat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveMode('chat')}
              className={`flex-1 text-xs font-medium ${
                activeMode === 'chat' 
                  ? 'bg-ds-primary text-white' 
                  : 'text-ds-text-secondary hover:text-ds-primary'
              }`}
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button
              variant={activeMode === 'voice' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveMode('voice')}
              className={`flex-1 text-xs font-medium ${
                activeMode === 'voice' 
                  ? 'bg-ds-primary text-white' 
                  : 'text-ds-text-secondary hover:text-ds-primary'
              }`}
            >
              <Mic className="w-3 h-3 mr-1" />
              Voice
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="max-h-96 overflow-y-auto">
          {activeMode === 'insights' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-ds-text-primary text-sm">{viewMode === 'executive' ? 'Executive' : 'Analytical'} Insights</h4>
                <Badge variant="outline" className="text-xs font-medium border-ds-border">
                  {proactiveInsights.length} Active
                </Badge>
              </div>
              {proactiveInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                const urgencyColors = {
                  high: 'bg-red-50/80 border-red-200 text-red-800',
                  medium: 'bg-orange-50/80 border-orange-200 text-orange-800',
                  low: 'bg-blue-50/80 border-blue-200 text-blue-800'
                };
                
                return (
                  <div key={index} className={`p-4 rounded-xl border-2 backdrop-blur-sm ${urgencyColors[insight.urgency as keyof typeof urgencyColors]}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-semibold">{insight.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs font-medium bg-white/80">
                        {insight.confidence}%
                      </Badge>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed mb-3">{insight.message}</p>
                    <Button size="sm" variant="outline" className="w-full text-xs bg-white/80 hover:bg-white font-medium border-ds-border">
                      Take Action
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          
          {activeMode === 'chat' && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder={`Ask AI about your ${viewMode} data...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 min-h-[60px] text-sm border-ds-border"
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
                    className="p-2 bg-ds-primary hover:bg-ds-primary-dark text-white"
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
                    className="cursor-pointer hover:bg-ds-secondary text-xs border-ds-border"
                    onClick={() => setQuery(command)}
                  >
                    {command}
                  </Badge>
                ))}
              </div>

              {isLoading && (
                <div className="flex items-center text-sm text-ds-primary">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  AI is analyzing your request...
                </div>
              )}

              {aiResponse && (
                <div className="bg-white p-3 rounded-lg border border-ds-border">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-ds-primary" />
                    <span className="text-sm font-medium text-ds-primary">AI Insight</span>
                  </div>
                  <p className="text-sm text-ds-text-primary">{aiResponse}</p>
                </div>
              )}
            </div>
          )}
          
          {activeMode === 'voice' && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-ds-secondary to-ds-bg-grey rounded-full mx-auto flex items-center justify-center">
                <Mic className="w-10 h-10 text-ds-primary" />
              </div>
              <div>
                <p className="text-sm text-ds-text-primary font-medium">{viewMode === 'executive' ? 'Executive' : 'Analytics'} Voice Assistant</p>
                <p className="text-xs text-ds-text-secondary mt-1">Ready to provide {viewMode} insights</p>
              </div>
              <Button 
                onClick={handleVoiceToggle}
                className={`w-full ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-ds-primary hover:bg-ds-primary-dark'
                } text-white`}
              >
                <Mic className="w-4 h-4 mr-2" />
                {isListening ? 'Stop Listening' : 'Start Voice Session'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
