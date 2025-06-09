
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingUp, Target, Zap } from "lucide-react";

interface PredictiveAnalyticsEngineProps {
  filters: any;
}

export const PredictiveAnalyticsEngine = ({ filters }: PredictiveAnalyticsEngineProps) => {
  const riskPredictionData = [
    { name: "Very High Risk", value: 42, intervention: "Immediate" },
    { name: "High Risk", value: 118, intervention: "Within 7 days" },
    { name: "Medium Risk", value: 285, intervention: "Within 30 days" },
    { name: "Low Risk", value: 620, intervention: "Monitor" },
    { name: "Very Low Risk", value: 1840, intervention: "Standard support" }
  ];

  const predictionAccuracyData = [
    { name: "Jan", accuracy: 78.5, predictions: 450 },
    { name: "Feb", accuracy: 82.1, predictions: 520 },
    { name: "Mar", accuracy: 85.3, predictions: 610 },
    { name: "Apr", accuracy: 87.8, predictions: 680 },
    { name: "May", accuracy: 89.2, predictions: 720 },
    { name: "Jun", accuracy: 91.4, predictions: 780 }
  ];

  const enrollmentForecastData = [
    { name: "Fall 2024", actual: 15420, predicted: 15350, confidence: 95.2 },
    { name: "Spring 2025", actual: null, predicted: 15680, confidence: 88.7 },
    { name: "Fall 2025", actual: null, predicted: 16120, confidence: 82.3 },
    { name: "Spring 2026", actual: null, predicted: 16450, confidence: 75.9 }
  ];

  const aiInsights = [
    {
      type: "Critical",
      message: "Engineering program showing 23% higher attrition risk than historical average",
      action: "Review curriculum difficulty and support services",
      confidence: 94.8
    },
    {
      type: "Opportunity", 
      message: "Business program capacity can be increased by 15% based on demand forecasting",
      action: "Consider expanding faculty and resources",
      confidence: 87.2
    },
    {
      type: "Warning",
      message: "Financial aid budget may be insufficient for projected enrollment growth",
      action: "Reassess scholarship allocation strategy",
      confidence: 91.5
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Predictive Analytics Engine</h2>
          <p className="text-slate-600">AI-powered forecasting and risk prediction</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-purple-100 text-purple-800">
            <Brain className="w-3 h-3 mr-1" />
            ML Enabled
          </Badge>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Zap className="w-4 h-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      <AnalyticsGrid columns={4}>
        <MetricsCard
          title="Prediction Accuracy"
          value="91.4%"
          change={8.7}
          changeType="increase"
          description="Model performance"
          icon={Target}
          className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/60"
        />
        <MetricsCard
          title="Students at Risk"
          value="160"
          change={-12.8}
          changeType="decrease"
          description="Requiring intervention"
          icon={AlertTriangle}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/60"
        />
        <MetricsCard
          title="Forecast Confidence"
          value="88.7%"
          change={3.2}
          changeType="increase"
          description="Next semester enrollment"
          icon={TrendingUp}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/60"
        />
        <MetricsCard
          title="AI Insights Generated"
          value="47"
          change={15.3}
          changeType="increase"
          description="This week"
          icon={Brain}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60"
        />
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Student Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={riskPredictionData}
              type="pie"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Enrollment Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={enrollmentForecastData.map(item => ({
                name: item.name,
                value: item.predicted,
                actual: item.actual
              }))}
              type="line"
              title=""
            />
          </CardContent>
        </Card>
      </AnalyticsGrid>

      {/* AI Insights Panel */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI-Generated Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-white/80 rounded-lg border border-purple-200/60">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={insight.type === 'Critical' ? 'destructive' : 
                             insight.type === 'Warning' ? 'secondary' : 'default'}
                  >
                    {insight.type}
                  </Badge>
                  <span className="text-sm text-purple-600 font-medium">
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-slate-800 font-medium mb-1">{insight.message}</p>
                <p className="text-sm text-slate-600">{insight.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
