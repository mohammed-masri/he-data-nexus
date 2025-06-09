
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, CheckCircle, Brain, ArrowRight } from "lucide-react";

interface SmartInsightsPanelProps {
  filters: any;
}

export const SmartInsightsPanel = ({ filters }: SmartInsightsPanelProps) => {
  const smartInsights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Strategic Growth Opportunity",
      description: "AI analysis shows 23% enrollment capacity remaining. Spring 2025 expansion recommended.",
      impact: "High",
      timeframe: "Q1 2025",
      confidence: 89,
      action: "View Expansion Plan"
    },
    {
      type: "alert",
      icon: AlertTriangle, 
      title: "Retention Risk Detected",
      description: "156 students showing early warning signs. Proactive intervention could improve retention by 5%.",
      impact: "Medium",
      timeframe: "Immediate",
      confidence: 94,
      action: "View At-Risk Students"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Performance Excellence",
      description: "Academic performance trending 15% above historical average. Maintain current trajectory.",
      impact: "Positive",
      timeframe: "Ongoing",
      confidence: 91,
      action: "View Metrics"
    }
  ];

  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-indigo-900 flex items-center">
          <Brain className="w-6 h-6 mr-3 text-indigo-700" />
          AI Smart Insights & Recommendations
          <Badge className="ml-auto bg-indigo-100 text-indigo-800">
            Real-time Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {smartInsights.map((insight, index) => {
            const IconComponent = insight.icon;
            const colorClasses = {
              opportunity: "bg-green-50 border-green-200 text-green-800",
              alert: "bg-orange-50 border-orange-200 text-orange-800", 
              success: "bg-blue-50 border-blue-200 text-blue-800"
            };
            
            return (
              <div key={index} className={`p-4 rounded-lg border-2 ${colorClasses[insight.type as keyof typeof colorClasses]}`}>
                <div className="flex items-start justify-between mb-3">
                  <IconComponent className="w-5 h-5 mt-1" />
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                
                <h4 className="font-semibold mb-2 text-sm">{insight.title}</h4>
                <p className="text-xs mb-3 opacity-90">{insight.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium">Impact: {insight.impact}</span>
                  <span className="text-xs">Timeline: {insight.timeframe}</span>
                </div>
                
                <Button size="sm" variant="outline" className="w-full text-xs">
                  {insight.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
