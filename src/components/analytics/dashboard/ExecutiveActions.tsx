
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Presentation, Mail, Calendar, Users, Download } from "lucide-react";

interface ExecutiveActionsProps {
  onExport?: () => void;
  onShare?: () => void;
  onGenerateReport?: () => void;
}

export const ExecutiveActions = ({ onExport, onShare, onGenerateReport }: ExecutiveActionsProps) => {
  const actions = [
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
      icon: Download,
      label: "Export Data",
      description: "Download metrics",
      onClick: onExport || (() => console.log("Export data"))
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

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Executive Quick Actions
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
