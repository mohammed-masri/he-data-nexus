
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedAIAssistant } from "../../features/EnhancedAIAssistant";
import { SmartInsightsPanel } from "../../foundation/SmartInsightsPanel";
import { Brain, MessageSquare, Lightbulb, TrendingUp, X } from "lucide-react";

interface AIAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallStats: {
    totalPillars: number;
    onTrack: number;
    exceedsTarget: number;
    needsAttention: number;
  };
  academicYear: string;
  semester: string;
  department: string;
}

export const AIAnalyticsModal = ({ 
  isOpen, 
  onClose, 
  overallStats, 
  academicYear, 
  semester, 
  department 
}: AIAnalyticsModalProps) => {
  const [activeTab, setActiveTab] = useState("assistant");

  // Smart insights data
  const smartInsights = [
    {
      id: "1",
      type: "opportunity" as const,
      title: "Engineering Program Excellence",
      description: "Engineering department shows 95% performance - highest across all programs. Consider expanding capacity to meet growing demand.",
      impact: "high" as const,
      actionable: true,
      metric: "Performance Score",
      value: "95%"
    },
    {
      id: "2",
      type: "alert" as const,
      title: "Student Satisfaction Decline",
      description: "Arts program satisfaction dropped 3% this quarter. Recommend immediate faculty engagement review.",
      impact: "medium" as const,
      actionable: true,
      metric: "Satisfaction Change",
      value: "-3%"
    },
    {
      id: "3",
      type: "trend" as const,
      title: "Research Output Increasing",
      description: "Faculty research publications up 25% year-over-year across all departments.",
      impact: "medium" as const,
      actionable: false,
      metric: "Research Growth",
      value: "+25%"
    },
    {
      id: "4",
      type: "recommendation" as const,
      title: "Cross-Department Collaboration",
      description: "Data shows potential for 15% efficiency gain through enhanced inter-departmental project coordination.",
      impact: "high" as const,
      actionable: true,
      metric: "Efficiency Potential",
      value: "+15%"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-ds-text-primary flex items-center">
              <div className="p-2 bg-gradient-to-r from-ds-primary to-ds-primary-dark rounded-xl mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              AI Analytics Hub
              <Badge className="ml-3 bg-emerald-100 text-emerald-800 border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 animate-pulse" />
                Live AI
              </Badge>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-ds-text-muted hover:text-ds-text-primary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-ds-bg-grey-light">
            <TabsTrigger 
              value="assistant" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-ds-primary"
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger 
              value="insights"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-ds-primary"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Smart Insights</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-ds-primary"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="predictive"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-ds-primary"
            >
              <Brain className="w-4 h-4" />
              <span>Predictive</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="space-y-4">
            <EnhancedAIAssistant 
              domain="Performance Analytics"
              filters={{ 
                performanceAreas: overallStats.totalPillars, 
                activePillars: overallStats.onTrack + overallStats.exceedsTarget,
                academicYear,
                semester,
                department
              }}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <SmartInsightsPanel 
              insights={smartInsights}
              className="border-0 shadow-none bg-transparent p-0"
            />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-ds-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ds-text-primary mb-2">AI Recommendations</h3>
              <p className="text-ds-text-muted mb-4">Personalized recommendations based on your performance data.</p>
              <Badge className="bg-blue-100 text-blue-700">Coming Soon</Badge>
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-4">
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-ds-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ds-text-primary mb-2">Predictive Analytics</h3>
              <p className="text-ds-text-muted mb-4">AI-powered forecasting and trend analysis.</p>
              <Badge className="bg-purple-100 text-purple-700">Coming Soon</Badge>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
