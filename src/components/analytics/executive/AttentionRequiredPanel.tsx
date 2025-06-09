
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, Clock, TrendingDown, Users, 
  DollarSign, Target, ArrowRight, CheckCircle 
} from "lucide-react";

interface AttentionRequiredPanelProps {
  filters: any;
}

export const AttentionRequiredPanel = ({ filters }: AttentionRequiredPanelProps) => {
  
  const attentionItems = [
    {
      priority: "high",
      category: "Retention Risk",
      title: "156 Students Showing Early Warning Signs",
      description: "AI analysis identified sophomore students with declining performance patterns",
      impact: "Potential 5% retention improvement with intervention",
      timeframe: "Action needed by Dec 15",
      confidence: 94,
      action: "View At-Risk List",
      icon: Users
    },
    {
      priority: "medium",
      category: "Budget Alert",
      title: "IT Infrastructure Budget 89% Utilized",
      description: "Current spending pace suggests potential Q4 budget shortfall",
      impact: "$180K potential overrun without adjustment",
      timeframe: "Review by Jan 10",
      confidence: 87,
      action: "Review Allocations",
      icon: DollarSign
    },
    {
      priority: "medium",
      category: "Strategic Goal",
      title: "Digital Transformation 67% Complete",
      description: "On track but critical milestones approaching in Q1 2025",
      impact: "Path to #1 regional ranking depends on completion",
      timeframe: "Milestone due Feb 1",
      confidence: 91,
      action: "View Timeline",
      icon: Target
    },
    {
      priority: "low",
      category: "Performance",
      title: "Faculty Satisfaction Slightly Declined",
      description: "3.2% decrease in faculty satisfaction scores this semester",
      impact: "Monitor for potential teaching quality impacts",
      timeframe: "Review in 30 days",
      confidence: 78,
      action: "Schedule Review",
      icon: TrendingDown
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-900';
      case 'medium': return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'low': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default: return 'bg-slate-50 border-slate-200 text-slate-900';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Attention Summary */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-orange-900 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            Executive Attention Required
            <Badge className="ml-auto bg-orange-100 text-orange-800">
              4 Items Today
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-700">1</div>
              <div className="text-sm text-red-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-700">2</div>
              <div className="text-sm text-orange-600">Medium Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-700">1</div>
              <div className="text-sm text-yellow-600">Low Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attention Items */}
      <div className="space-y-4">
        {attentionItems.map((item, index) => {
          const IconComponent = item.icon;
          const priorityColor = getPriorityColor(item.priority);
          const badgeColor = getPriorityBadgeColor(item.priority);
          
          return (
            <Card key={index} className={`border-2 shadow-sm hover:shadow-md transition-all duration-200 ${priorityColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white rounded-lg">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={`text-xs ${badgeColor}`}>
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.confidence}% confidence
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90">{item.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Impact:</span>
                    <p className="opacity-80">{item.impact}</p>
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span>
                    <p className="opacity-80 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.timeframe}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/50">
                  <Button size="sm" variant="outline" className="bg-white hover:bg-slate-50">
                    {item.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mark Reviewed
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
