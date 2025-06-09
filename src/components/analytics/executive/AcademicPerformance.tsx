
import { useState, useEffect } from "react";
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { AIAssistant } from "../shared/AIAssistant";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award, Brain, TrendingUp } from "lucide-react";
import { dynamicData } from "@/services/dynamicDataService";

interface AcademicPerformanceProps {
  filters: any;
}

export const AcademicPerformance = ({ filters }: AcademicPerformanceProps) => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [retentionData, setRetentionData] = useState<any>(null);
  const [showAIPredictions, setShowAIPredictions] = useState(false);

  useEffect(() => {
    const performance = dynamicData.generatePerformanceData(filters);
    const retention = dynamicData.generateRetentionData(filters);
    const predictions = dynamicData.generatePredictiveInsights('academic', filters);
    
    setPerformanceData({ ...performance, predictions });
    setRetentionData(retention);
  }, [filters]);

  const performanceTrends = [
    { semester: "Spring 23", avgGPA: 3.2, retention: 88, completion: 76 },
    { semester: "Fall 23", avgGPA: 3.4, retention: 90, completion: 78 },
    { semester: "Spring 24", avgGPA: 3.5, retention: 91, completion: 82 },
    { semester: "Fall 24", avgGPA: performanceData?.avgGPA || 3.6, retention: retentionData?.current || 92, completion: performanceData?.courseCompletion || 85 }
  ];

  const academicData = [
    { department: "Engineering", enrollment: 1250, gpa: 3.4, graduation: 87, predicted: "↗ Improving" },
    { department: "Business", enrollment: 980, gpa: 3.6, graduation: 92, predicted: "→ Stable" },
    { department: "Arts & Sciences", enrollment: 1450, gpa: 3.5, graduation: 89, predicted: "↗ Improving" },
    { department: "Medicine", enrollment: 320, gpa: 3.8, graduation: 95, predicted: "→ Excellent" },
    { department: "Education", enrollment: 440, gpa: 3.7, graduation: 91, predicted: "↗ Strong" }
  ];

  if (!performanceData || !retentionData) {
    return <div className="animate-pulse">Loading academic performance data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Academic Performance</h2>
          <p className="text-ds-text-muted">AI-enhanced metrics across all departments • Fall 2024</p>
        </div>
        <Button 
          onClick={() => setShowAIPredictions(!showAIPredictions)}
          variant={showAIPredictions ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Brain className="w-4 h-4 mr-2" />
          AI Academic Insights
        </Button>
      </div>

      {/* AI Assistant for Academic Performance */}
      <AIAssistant 
        context="Academic Performance" 
        onCommand={(cmd) => console.log("Academic AI Command:", cmd)}
      />

      {/* Academic KPIs with AI Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Average GPA"
          value={performanceData.avgGPA.toFixed(2)}
          change={4.1}
          changeType="increase"
          description="AI predicts 3% semester-end improvement"
        />
        <AnalyticsCard
          title="Course Completion"
          value={`${performanceData.courseCompletion.toFixed(1)}%`}
          change={6.2}
          changeType="increase"
          description="Above Fall 2023 by 7.2%"
        />
        <AnalyticsCard
          title="Dean's List"
          value="847"
          change={12.8}
          changeType="increase"
          description="AI: Record semester performance"
        />
        <AnalyticsCard
          title="At-Risk Students"
          value={retentionData.atRiskStudents.toString()}
          change={-15.3}
          changeType="increase"
          description={`AI intervention success: ${retentionData.interventionSuccess.toFixed(1)}%`}
        />
      </div>

      {/* AI Predictions Card */}
      {showAIPredictions && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              AI Academic Performance Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <h4 className="font-medium">Semester-End GPA Forecast</h4>
                  <p className="text-sm text-gray-600">{performanceData.predictions.prediction}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {performanceData.predictions.confidence}% Confidence
                </Badge>
              </div>
              <div className="text-xs text-blue-700">
                <strong>Key Factors:</strong> {performanceData.predictions.factors.join(', ')}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Trends with AI Analysis */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="text-ds-text-primary flex items-center">
            Academic Performance Trends
            <Badge variant="outline" className="ml-2">AI-Analyzed</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="avgGPA" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Area type="monotone" dataKey="retention" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Performance with AI Insights */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="text-ds-text-primary">Department Performance with AI Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-ds-bg-grey-light rounded-lg border border-ds-border">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-ds-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-ds-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ds-text-primary">{dept.department}</h4>
                    <p className="text-sm text-ds-text-secondary">{dept.enrollment} students enrolled</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-ds-text-primary">{dept.gpa}</div>
                    <div className="text-xs text-ds-text-muted">Avg GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-ds-text-primary">{dept.graduation}%</div>
                    <div className="text-xs text-ds-text-muted">Graduation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-600">{dept.predicted}</div>
                    <div className="text-xs text-ds-text-muted">AI Forecast</div>
                  </div>
                  <Badge variant={dept.gpa >= 3.5 ? "default" : "secondary"} 
                         className={dept.gpa >= 3.5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {dept.gpa >= 3.5 ? "Excellent" : "Good"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
