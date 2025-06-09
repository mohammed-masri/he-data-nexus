import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Share, Mail, Calendar, 
  Users, Settings, BarChart3, Target, MessageSquare, Zap 
} from "lucide-react";

export const ExecutiveQuickActions = () => {
  
  const quickActions = [
    {
      icon: FileText,
      label: "Board Report",
      description: "Generate AI summary",
      color: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200",
      onClick: () => console.log("Generate board report"),
      priority: "high"
    },
    {
      icon: Target,
      label: "Goal Tracking",
      description: "View progress",
      color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200",
      onClick: () => console.log("View goals"),
      priority: "high"
    },
    {
      icon: Share,
      label: "Share Dashboard",
      description: "Send to stakeholders",
      color: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200",
      onClick: () => console.log("Share dashboard"),
      priority: "medium"
    },
    {
      icon: MessageSquare,
      label: "AI Assistant",
      description: "Ask questions",
      color: "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200",
      onClick: () => console.log("Open AI assistant"),
      priority: "medium"
    },
    {
      icon: Download,
      label: "Export Data",
      description: "Current metrics",
      color: "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200",
      onClick: () => console.log("Export data"),
      priority: "low"
    },
    {
      icon: Calendar,
      label: "Schedule Review",
      description: "Book strategy session",
      color: "bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200",
      onClick: () => console.log("Schedule review"),
      priority: "low"
    }
  ];

  const highPriorityActions = quickActions.filter(action => action.priority === "high");
  const otherActions = quickActions.filter(action => action.priority !== "high");

  return (
    <Card className="border-slate-200/60 bg-gradient-to-br from-white to-slate-50/30 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <div className="p-2 bg-blue-100 rounded-xl mr-3">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          Executive Actions
          <Badge className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium">
            Quick Access
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* High Priority Actions - Larger Size */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Priority Actions</h4>
          <div className="grid grid-cols-1 gap-3">
            {highPriorityActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action.onClick}
                  className={`h-auto p-4 flex items-center space-x-3 transition-all duration-200 border-2 ${action.color} font-medium shadow-sm hover:shadow-md`}
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold">{action.label}</div>
                    <div className="text-xs opacity-80">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Other Actions - Compact Grid */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Additional Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            {otherActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action.onClick}
                  className={`h-auto p-3 flex flex-col items-center space-y-2 transition-all duration-200 border ${action.color} text-center`}
                >
                  <IconComponent className="w-4 h-4" />
                  <div>
                    <div className="text-xs font-medium">{action.label}</div>
                    <div className="text-xs opacity-75">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
