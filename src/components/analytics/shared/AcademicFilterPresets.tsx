
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, TrendingUp, Users, GraduationCap, 
  AlertTriangle, Target, Sparkles 
} from "lucide-react";

interface AcademicFilterPresetsProps {
  onPresetSelect: (preset: any) => void;
  currentFilters: any;
}

export const AcademicFilterPresets = ({ 
  onPresetSelect, 
  currentFilters 
}: AcademicFilterPresetsProps) => {
  const academicPresets = [
    {
      id: "current-performance",
      label: "Current Semester Performance",
      description: "Focus on Fall 2024 active metrics",
      icon: Target,
      filters: {
        timeRange: "current-semester",
        comparison: "none",
        status: "active"
      },
      category: "current"
    },
    {
      id: "year-comparison",
      label: "Year-over-Year Growth",
      description: "Fall 2024 vs Fall 2023",
      icon: TrendingUp,
      filters: {
        timeRange: "academic-year",
        comparison: "yoy",
        period: "fall"
      },
      category: "comparison"
    },
    {
      id: "at-risk-students",
      label: "At-Risk Student Analysis",
      description: "Students needing intervention",
      icon: AlertTriangle,
      filters: {
        riskLevel: "high",
        timeRange: "current-semester",
        intervention: "needed"
      },
      category: "intervention"
    },
    {
      id: "graduation-cohort",
      label: "Graduation Cohort Tracking",
      description: "4-year graduation trajectory",
      icon: GraduationCap,
      filters: {
        timeRange: "multi-year",
        cohort: "2021-entry",
        outcome: "graduation"
      },
      category: "outcomes"
    },
    {
      id: "enrollment-trends",
      label: "Enrollment Trends",
      description: "3-year enrollment patterns",
      icon: Users,
      filters: {
        timeRange: "multi-year",
        trend: "enrollment",
        departments: "all"
      },
      category: "trends"
    },
    {
      id: "semester-progression",
      label: "Semester Progression",
      description: "Mid-semester checkpoint",
      icon: Calendar,
      filters: {
        timeRange: "current-semester",
        checkpoint: "midterm",
        progression: "on-track"
      },
      category: "current"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "current": return "bg-blue-100 text-blue-700 border-blue-200";
      case "comparison": return "bg-green-100 text-green-700 border-green-200";
      case "intervention": return "bg-orange-100 text-orange-700 border-orange-200";
      case "outcomes": return "bg-purple-100 text-purple-700 border-purple-200";
      case "trends": return "bg-teal-100 text-teal-700 border-teal-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const isPresetActive = (preset: any) => {
    return JSON.stringify(preset.filters) === JSON.stringify(currentFilters);
  };

  return (
    <Card className="border-ds-border">
      <CardHeader>
        <CardTitle className="flex items-center text-ds-text-primary">
          <Sparkles className="w-5 h-5 mr-2 text-ds-primary" />
          Academic Filter Presets
          <Badge className="ml-2 bg-ds-secondary text-ds-primary">
            Smart Defaults
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {academicPresets.map((preset) => (
            <Button
              key={preset.id}
              variant={isPresetActive(preset) ? "default" : "outline"}
              onClick={() => onPresetSelect(preset.filters)}
              className="h-auto p-4 flex flex-col items-start space-y-3 border-ds-border hover:bg-ds-secondary/50"
            >
              <div className="flex items-center justify-between w-full">
                <preset.icon className="w-5 h-5 text-ds-primary" />
                <Badge className={getCategoryColor(preset.category)}>
                  {preset.category}
                </Badge>
              </div>
              <div className="text-left space-y-1">
                <div className="font-medium text-sm">{preset.label}</div>
                <div className="text-xs text-ds-text-secondary">
                  {preset.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
