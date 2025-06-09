
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, TrendingUp, Target, Users, Lightbulb, 
  BarChart3, ArrowRight, Sparkles 
} from "lucide-react";

interface ExecutiveInsightsGridProps {
  filters: any;
}

export const ExecutiveInsightsGrid = ({ filters }: ExecutiveInsightsGridProps) => {
  
  const insights = [
    {
      type: "predictive",
      title: "Spring 2025 Enrollment Forecast",
      description: "AI models predict 8% growth potential based on current application trends and market conditions.",
      confidence: 87,
      impact: "High",
      category: "Growth Opportunity",
      data: "Based on 47 data points",
      action: "View Forecast Model",
      icon: TrendingUp,
      color: "emerald"
    },
    {
      type: "optimization",
      title: "Resource Allocation Opportunity",
      description: "AI identified 5% budget reallocation opportunity from facilities to student success programs for better ROI.",
      confidence: 92,
      impact: "Medium",
      category: "Financial Optimization",
      data: "ROI improvement: +23%",
      action: "View Recommendations",
      icon: Target,
      color: "blue"
    },
    {
      type: "predictive",
      title: "Faculty Hiring Recommendation",
      description: "Predictive analytics suggest hiring 3 additional CS faculty members to meet projected demand.",
      confidence: 84,
      impact: "High",
      category: "Strategic Planning",
      data: "Demand forecast: +34%",
      action: "View Analysis",
      icon: Users,
      color: "indigo"
    },
    {
      type: "insight",
      title: "Competitive Positioning Analysis",
      description: "AI analysis of peer institutions shows opportunity to capture 12% market share through digital offerings.",
      confidence: 79,
      impact: "High",
      category: "Market Intelligence",
      data: "Competitive gap identified",
      action: "View Comparison",
      icon: BarChart3,
      color: "purple"
    },
    {
      type: "optimization",
      title: "Student Success Intervention",
      description: "ML models identified specific interventions that could improve 4-year graduation rates by 7%.",
      confidence: 91,
      impact: "High",
      category: "Student Success",
      data: "Success rate: +7%",
      action: "View Program Details",
      icon: Lightbulb,
      color: "orange"
    },
    {
      type: "predictive",
      title: "Technology Investment Priority",
      description: "AI recommends prioritizing cloud infrastructure investment for 287% ROI over 3 years.",
      confidence: 88,
      impact: "High",
      category: "Technology Strategy",
      data: "3-year ROI: 287%",
      action: "View Business Case",
      icon: Sparkles,
      color: "teal"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
      purple: "bg-purple-50 border-purple-200 text-purple-900",
      orange: "bg-orange-50 border-orange-200 text-orange-900",
      teal: "bg-teal-50 border-teal-200 text-teal-900"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'predictive': return Brain;
      case 'optimization': return Target;
      case 'insight': return Lightbulb;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Insights Header */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-indigo-900 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-indigo-600" />
            AI Strategic Insights & Recommendations
            <Badge className="ml-auto bg-indigo-100 text-indigo-800">
              6 New Insights
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-700">3</div>
              <div className="text-sm text-indigo-600">Predictive Models</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">2</div>
              <div className="text-sm text-purple-600">Optimizations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">1</div>
              <div className="text-sm text-blue-600">Market Intelligence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          const TypeIcon = getTypeIcon(insight.type);
          const colorClasses = getColorClasses(insight.color);
          
          return (
            <Card key={index} className={`border-2 shadow-sm hover:shadow-md transition-all duration-200 ${colorClasses}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-white rounded-lg">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {insight.category}
                      </Badge>
                      <CardTitle className="text-lg font-semibold">{insight.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className="bg-white text-xs">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {insight.confidence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90">{insight.description}</p>
                
                <div className="flex justify-between items-center text-xs opacity-75">
                  <span>{insight.data}</span>
                  <span>AI-Generated</span>
                </div>
                
                <Button size="sm" variant="outline" className="w-full bg-white hover:bg-slate-50">
                  {insight.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
