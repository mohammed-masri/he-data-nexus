
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Calendar, Users, ArrowLeftRight, 
  RefreshCw, BarChart3, Download, Zap 
} from "lucide-react";

interface ContextualQuickActionsProps {
  currentSemester: string;
  academicYear: string;
  onAction: (action: string, params?: any) => void;
}

export const ContextualQuickActions = ({ 
  currentSemester, 
  academicYear, 
  onAction 
}: ContextualQuickActionsProps) => {
  const quickActions = [
    {
      label: "Compare with Spring 2024",
      description: "Side-by-side semester comparison",
      icon: ArrowLeftRight,
      action: "semester-compare",
      params: { targetSemester: "spring", targetYear: "2024" },
      variant: "outline" as const
    },
    {
      label: "Same Period Last Year",
      description: "Fall 2023 vs Fall 2024",
      icon: Calendar,
      action: "year-compare",
      params: { targetYear: "2023-2024" },
      variant: "outline" as const
    },
    {
      label: "At-Risk Student Analysis",
      description: "Focus on intervention needs",
      icon: Users,
      action: "risk-analysis",
      params: { filter: "at-risk" },
      variant: "default" as const
    },
    {
      label: "Generate Executive Report",
      description: "AI-powered board presentation",
      icon: Zap,
      action: "executive-report",
      params: { format: "board-ready" },
      variant: "default" as const
    }
  ];

  const academicContextActions = [
    {
      label: "Enrollment Trends",
      description: "Multi-year analysis",
      icon: TrendingUp,
      action: "enrollment-trends"
    },
    {
      label: "Department Performance",
      description: "Cross-department insights",
      icon: BarChart3,
      action: "department-analysis"
    },
    {
      label: "Export Academic Report",
      description: "PDF with current filters",
      icon: Download,
      action: "export-report"
    },
    {
      label: "Refresh All Data",
      description: "Latest academic records",
      icon: RefreshCw,
      action: "refresh-data"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Quick Actions */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <Zap className="w-5 h-5 mr-2 text-ds-primary" />
            Smart Academic Actions
            <Badge className="ml-2 bg-ds-secondary text-ds-primary">
              Context-Aware
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={() => onAction(action.action, action.params)}
                className="h-auto p-4 flex flex-col items-start space-y-2 border-ds-border hover:bg-ds-secondary/50"
              >
                <div className="flex items-center space-x-2 w-full">
                  <action.icon className="w-4 h-4 text-ds-primary" />
                  <span className="font-medium text-left">{action.label}</span>
                </div>
                <p className="text-xs text-ds-text-secondary text-left w-full">
                  {action.description}
                </p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {academicContextActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onAction(action.action)}
            className="h-auto p-3 flex flex-col items-center space-y-2 border-ds-border hover:bg-ds-secondary/50"
          >
            <action.icon className="w-5 h-5 text-ds-primary" />
            <div className="text-center">
              <div className="text-xs font-medium">{action.label}</div>
              <div className="text-xs text-ds-text-secondary">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
