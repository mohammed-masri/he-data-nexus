
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Lightbulb } from "lucide-react";
import { analyticsDataService } from "@/services/analyticsDataService";
import { MetricsCalculations } from "@/services/metricsCalculations";

interface ExecutiveInsightsProps {
  filters: any;
}

export const ExecutiveInsights = ({ filters }: ExecutiveInsightsProps) => {
  const data = analyticsDataService.generateMockData();
  const insights = MetricsCalculations.generateInsights(data);
  const overallScore = MetricsCalculations.calculateOverallScore(data);

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-blue-700" />
          Executive Summary - Fall 2024 Performance
          <Badge className="ml-auto bg-blue-100 text-blue-800">
            <Brain className="w-3 h-3 mr-1" />
            AI-Generated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Key Achievements
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Record enrollment of {MetricsCalculations.formatNumber(data.enrollment.current)} students (15% above target)</li>
              <li>• Highest academic performance in institutional history</li>
              <li>• Budget efficiency at optimal {MetricsCalculations.formatPercentage(data.financial.budgetUtilization)} utilization</li>
              <li>• Student satisfaction improved to 4.6/5.0</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              AI Strategic Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              {insights.map((insight, index) => (
                <li key={index}>• {insight}</li>
              ))}
              <li>• Accelerate digital transformation (287% ROI potential)</li>
              <li>• Focus on sophomore retention programs</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">Overall Performance Score</span>
            <Badge className="bg-emerald-100 text-emerald-800 text-lg font-bold px-4 py-2">
              {overallScore}/100
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
