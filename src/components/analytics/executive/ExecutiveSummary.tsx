
import { useState, useEffect } from "react";
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { AIAssistant } from "../shared/AIAssistant";
import { PredictiveAIComponent } from "../features/PredictiveAIComponent";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, AlertTriangle, CheckCircle, Brain, Zap } from "lucide-react";
import { dynamicData } from "@/services/dynamicDataService";

interface ExecutiveSummaryProps {
  filters: any;
}

export const ExecutiveSummary = ({ filters }: ExecutiveSummaryProps) => {
  const [enrollmentData, setEnrollmentData] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [showAIPredictions, setShowAIPredictions] = useState(false);

  useEffect(() => {
    // Load dynamic data based on filters
    const enrollment = dynamicData.generateEnrollmentData(filters);
    const performance = dynamicData.generatePerformanceData(filters);
    const incremental = dynamicData.generateIncrementalUpdates();
    
    setEnrollmentData({ ...enrollment, ...incremental });
    setPerformanceData(performance);
  }, [filters]);

  const trendData = [
    { month: 'Aug', enrollment: 6850, retention: 89, satisfaction: 87 },
    { month: 'Sep', enrollment: 7420, retention: 91, satisfaction: 89 },
    { month: 'Oct', enrollment: 7890, retention: 90, satisfaction: 91 },
    { month: 'Nov', enrollment: 8125, retention: 92, satisfaction: 90 },
    { month: 'Dec', enrollment: enrollmentData?.current || 8247, retention: 91.7, satisfaction: 92 }
  ];

  const aiInsights = [
    {
      type: "positive",
      title: "Strong Fall Performance",
      description: `${enrollmentData?.current || 8247} students enrolled - 15% above target. AI predicts sustained growth through Spring.`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      type: "warning", 
      title: "Mid-Semester Alert",
      description: "AI detects slight retention risk pattern. Proactive intervention recommended for 156 students.",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      type: "positive",
      title: "Budget Optimization",
      description: `${performanceData?.budgetUtilization.toFixed(1) || 78.4}% utilization with improved efficiency. AI suggests strategic reallocation opportunities.`,
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  if (!enrollmentData || !performanceData) {
    return <div className="animate-pulse">Loading executive dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Executive Dashboard</h2>
          <p className="text-ds-text-muted">Fall 2024 Semester • Live Data • Last updated: {enrollmentData.lastSyncTime}</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => setShowAIPredictions(!showAIPredictions)}
            variant={showAIPredictions ? "default" : "outline"}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Predictions
          </Button>
          <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
            Live Data
          </Badge>
        </div>
      </div>

      {/* AI Predictions Section */}
      {showAIPredictions && (
        <PredictiveAIComponent domain="executive-summary" filters={filters} />
      )}

      {/* AI Assistant */}
      <AIAssistant 
        context="Executive Summary" 
        onCommand={(cmd) => console.log("AI Command:", cmd)}
      />

      {/* Dynamic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Enrollment"
          value={enrollmentData.current.toLocaleString()}
          change={15.2}
          changeType="increase"
          description={`${enrollmentData.recordsUpdated} records updated today`}
        />
        <AnalyticsCard
          title="Retention Rate"
          value="91.7%"
          change={-1.8}
          changeType="decrease"
          description="AI monitoring intervention programs"
        />
        <AnalyticsCard
          title="Budget Utilization"
          value={`${performanceData.budgetUtilization.toFixed(1)}%`}
          change={2.3}
          changeType="increase"
          description="On track for fiscal year"
        />
        <AnalyticsCard
          title="Satisfaction Score"
          value={`${performanceData.satisfactionScore.toFixed(1)}/5.0`}
          change={5.8}
          changeType="increase"
          description="AI-powered feedback analysis"
        />
      </div>

      {/* AI-Powered Insights */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            AI Insights & Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-ds-bg-grey-light rounded-lg border border-ds-border">
                <div className={`p-2 rounded-full bg-white ${insight.color}`}>
                  <insight.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-ds-text-primary">{insight.title}</h4>
                  <p className="text-sm text-ds-text-secondary">{insight.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="text-ds-text-primary">Fall 2024 Enrollment Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrollment" stroke="#1e40af" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="text-ds-text-primary">Performance Metrics (Live)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="retention" fill="#10b981" />
                <Bar dataKey="satisfaction" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
