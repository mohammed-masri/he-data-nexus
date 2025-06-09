
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Download, Calendar, TrendingUp, Activity, Clock } from "lucide-react";

interface AnalyticsSidebarProps {
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

export const AnalyticsSidebar = ({ overallStats, academicYear, semester, department }: AnalyticsSidebarProps) => {
  const excellenceRate = Math.round((overallStats.exceedsTarget / overallStats.totalPillars) * 100);
  const overallHealth = Math.round(((overallStats.onTrack + overallStats.exceedsTarget) / overallStats.totalPillars) * 100);

  return (
    <div className="space-y-6">
      {/* Contextual Quick Actions */}
      <Card className="border-ds-border bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ds-text-primary flex items-center">
            <div className="p-1.5 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg mr-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-ds-border hover:border-ds-primary hover:bg-ds-secondary group transition-all duration-200 hover:shadow-md"
            onClick={() => console.log("Generate report")}
          >
            <Download className="w-4 h-4 mr-2 group-hover:text-ds-primary group-hover:animate-bounce transition-all duration-200" />
            Executive Summary
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-ds-border hover:border-ds-primary hover:bg-ds-secondary group transition-all duration-200 hover:shadow-md"
            onClick={() => console.log("Schedule meeting")}
          >
            <Calendar className="w-4 h-4 mr-2 group-hover:text-ds-primary transition-all duration-200" />
            Schedule Review
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-ds-border hover:border-ds-primary hover:bg-ds-secondary group transition-all duration-200 hover:shadow-md"
            onClick={() => console.log("Trending analysis")}
          >
            <TrendingUp className="w-4 h-4 mr-2 group-hover:text-ds-primary transition-all duration-200" />
            Trending Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Performance Summary Card */}
      <Card className="border-ds-border bg-gradient-to-br from-ds-secondary/30 via-white to-ds-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-ds-text-primary flex items-center">
              <div className="p-1.5 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg mr-2">
                <Activity className="w-4 h-4 text-white" />
              </div>
              Performance Summary
            </CardTitle>
            <div className="flex items-center space-x-1 text-xs text-ds-text-muted">
              <Clock className="w-3 h-3" />
              <span>Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-ds-border/50">
            <span className="text-xs font-medium text-ds-text-muted">Excellence Rate</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-ds-text-primary">
                {excellenceRate}%
              </span>
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                High
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-ds-border/50">
            <span className="text-xs font-medium text-ds-text-muted">On Track</span>
            <span className="text-lg font-bold text-ds-text-primary">
              {overallStats.onTrack}<span className="text-sm text-ds-text-muted">/{overallStats.totalPillars}</span>
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-ds-border/50">
            <span className="text-xs font-medium text-ds-text-muted">Needs Attention</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-orange-600">
                {overallStats.needsAttention}
              </span>
              {overallStats.needsAttention > 0 && (
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-ds-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-ds-text-muted">Overall Health</div>
              <div className="text-sm font-bold text-ds-text-primary">{overallHealth}%</div>
            </div>
            <div className="w-full bg-ds-bg-grey-light rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-ds-primary to-ds-primary-dark h-2.5 rounded-full transition-all duration-1000 shadow-sm"
                style={{ 
                  width: `${overallHealth}%`,
                  animation: 'slide-in-right 1s ease-out'
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context Information */}
      <Card className="border-ds-border bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-ds-text-primary mb-3">Current Context</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-ds-text-muted">Academic Year:</span>
              <Badge variant="outline" className="text-xs">{academicYear}</Badge>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ds-text-muted">Semester:</span>
              <Badge variant="outline" className="text-xs">{semester}</Badge>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ds-text-muted">Department:</span>
              <Badge variant="outline" className="text-xs">{department === 'all' ? 'All' : department}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
