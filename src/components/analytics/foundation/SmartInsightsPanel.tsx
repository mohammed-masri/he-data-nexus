
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Target, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

interface Insight {
  id: string;
  type: "opportunity" | "alert" | "trend" | "recommendation";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionable: boolean;
  metric?: string;
  value?: string;
}

interface SmartInsightsPanelProps {
  insights: Insight[];
  className?: string;
}

export const SmartInsightsPanel = ({ insights, className = "" }: SmartInsightsPanelProps) => {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [hoveredInsight, setHoveredInsight] = useState<string | null>(null);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Target className="w-5 h-5 text-emerald-600" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "trend":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "recommendation":
        return <Lightbulb className="w-5 h-5 text-purple-600" />;
      default:
        return <Brain className="w-5 h-5 text-ds-primary" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50";
      case "alert":
        return "border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50";
      case "trend":
        return "border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50";
      case "recommendation":
        return "border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50";
      default:
        return "border-ds-border bg-gradient-to-r from-ds-bg-grey-light to-white hover:from-ds-bg-grey to-ds-bg-grey-light";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-semibold">Medium Impact</Badge>;
      case "low":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-semibold">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`border-0 shadow-2xl bg-gradient-to-br from-white to-ds-bg-grey-light/30 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-ds-primary/5 to-transparent border-b border-ds-border/50">
        <CardTitle className="flex items-center text-ds-text-primary">
          <div className="p-3 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl mr-3 shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          Smart Insights
          <Badge className="ml-auto bg-gradient-to-r from-ds-secondary to-ds-primary/20 text-ds-primary border-ds-primary/30 px-4 py-1 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer group transform hover:scale-102 ${getInsightColor(insight.type)} ${
              selectedInsight === insight.id ? 'ring-2 ring-ds-primary ring-opacity-50 shadow-lg' : 'shadow-md hover:shadow-lg'
            }`}
            onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
            onMouseEnter={() => setHoveredInsight(insight.id)}
            onMouseLeave={() => setHoveredInsight(null)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {getInsightIcon(insight.type)}
                </div>
                <h4 className="font-bold text-base text-ds-text-primary group-hover:text-ds-primary transition-colors">
                  {insight.title}
                </h4>
              </div>
              <div className="flex items-center space-x-3">
                {getImpactBadge(insight.impact)}
                {insight.actionable && (
                  <Badge variant="outline" className="text-xs bg-white border-ds-primary text-ds-primary font-semibold">
                    <Zap className="w-3 h-3 mr-1" />
                    Actionable
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-ds-text-secondary mb-4 leading-relaxed group-hover:text-ds-text-primary transition-colors">
              {insight.description}
            </p>
            
            {insight.metric && insight.value && (
              <div className="flex items-center justify-between text-sm bg-white/70 rounded-lg p-3 mb-4 border border-white/50">
                <span className="font-semibold text-ds-text-secondary">{insight.metric}</span>
                <span className="font-bold text-ds-primary text-lg">{insight.value}</span>
              </div>
            )}
            
            {selectedInsight === insight.id && (
              <div className="mt-4 pt-4 border-t border-white/50 animate-fade-in">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ds-text-muted flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Click to take action on this insight
                  </p>
                  <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-ds-primary to-ds-primary-dark hover:from-ds-primary-dark hover:to-ds-primary shadow-lg">
                    Take Action
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            )}
            
            {hoveredInsight === insight.id && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-ds-primary rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-to-br from-ds-bg-grey-light to-white rounded-full w-20 h-20 mx-auto mb-4 shadow-lg">
              <Brain className="w-12 h-12 text-ds-text-muted mx-auto" />
            </div>
            <p className="text-base font-semibold text-ds-text-muted mb-2">
              No insights available at the moment
            </p>
            <p className="text-sm text-ds-text-muted">
              Check back later for AI-generated recommendations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
