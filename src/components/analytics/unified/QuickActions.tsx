
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share, FileText, Mail, Calendar, BarChart3, Users, Presentation, Filter } from "lucide-react";

interface QuickActionsProps {
  viewMode: 'executive' | 'detailed';
  onExport?: () => void;
  onShare?: () => void;
  onGenerateReport?: () => void;
}

export const QuickActions = ({ viewMode, onExport, onShare, onGenerateReport }: QuickActionsProps) => {
  const executiveActions = [
    {
      icon: FileText,
      label: "Board Report",
      description: "AI-powered summary",
      onClick: onGenerateReport || (() => console.log("Generate board report"))
    },
    {
      icon: Presentation,
      label: "Executive Brief",
      description: "Strategic overview",
      onClick: () => console.log("Generate executive brief")
    },
    {
      icon: Share,
      label: "Share Dashboard", 
      description: "Send to stakeholders",
      onClick: onShare || (() => console.log("Share dashboard"))
    },
    {
      icon: Mail,
      label: "Email Alerts",
      description: "Configure notifications",
      onClick: () => console.log("Configure alerts")
    },
    {
      icon: Calendar,
      label: "Schedule Review",
      description: "Book strategy session",
      onClick: () => console.log("Schedule review")
    },
    {
      icon: Users,
      label: "Team Access",
      description: "Manage permissions",
      onClick: () => console.log("Manage access")
    }
  ];

  const detailedActions = [
    {
      icon: Download,
      label: "Export Data",
      description: "Download current metrics",
      onClick: onExport || (() => console.log("Export data"))
    },
    {
      icon: BarChart3,
      label: "Custom Report",
      description: "Build detailed analysis",
      onClick: () => console.log("Create custom report")
    },
    {
      icon: Filter,
      label: "Advanced Filters",
      description: "Detailed segmentation",
      onClick: () => console.log("Open advanced filters")
    },
    {
      icon: Share,
      label: "Share Analysis",
      description: "Send to team",
      onClick: onShare || (() => console.log("Share analysis"))
    },
    {
      icon: Calendar,
      label: "Schedule Export",
      description: "Automated reports",
      onClick: () => console.log("Schedule export")
    },
    {
      icon: Users,
      label: "Collaboration",
      description: "Share workspace",
      onClick: () => console.log("Manage collaboration")
    }
  ];

  const actions = viewMode === 'executive' ? executiveActions : detailedActions;

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          {viewMode === 'executive' ? 'Executive' : 'Analytics'} Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                onClick={action.onClick}
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-slate-50 transition-colors border-2 hover:border-slate-300"
              >
                <IconComponent className="w-6 h-6 text-indigo-600" />
                <div className="text-center">
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="text-xs text-slate-500">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
