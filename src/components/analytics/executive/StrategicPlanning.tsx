
import { useState, useEffect } from "react";
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { AIAssistant } from "../shared/AIAssistant";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Lightbulb, Calendar, Brain, AlertTriangle, CheckCircle } from "lucide-react";
import { dynamicData } from "@/services/dynamicDataService";

interface StrategicPlanningProps {
  filters: any;
}

export const StrategicPlanning = ({ filters }: StrategicPlanningProps) => {
  const [strategicData, setStrategicData] = useState<any>(null);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  useEffect(() => {
    const strategic = dynamicData.generateStrategicData(filters);
    const predictions = dynamicData.generatePredictiveInsights('strategic', filters);
    
    setStrategicData({ ...strategic, predictions });
  }, [filters]);

  const competitorData = [
    { name: "Sharjah Univ", enrollment: 8247, retention: 91.7, satisfaction: 4.6, position: "Current" },
    { name: "AUS", enrollment: 6200, retention: 94.2, satisfaction: 4.8, position: "Leader" },
    { name: "UAEU", enrollment: 12500, retention: 89.3, satisfaction: 4.4, position: "Size Leader" },
    { name: "Zayed Univ", enrollment: 8900, retention: 93.1, satisfaction: 4.7, position: "Close Competitor" }
  ];

  const projections = [
    { year: "2024", enrollment: 8247, revenue: 165, graduation: 2100, aiScore: 7.8 },
    { year: "2025", enrollment: 8800, revenue: 178, graduation: 2250, aiScore: 8.2 },
    { year: "2026", enrollment: 9200, revenue: 188, graduation: 2400, aiScore: 8.6 },
    { year: "2027", enrollment: 9600, revenue: 198, graduation: 2550, aiScore: 9.0 }
  ];

  const aiStrategicRecommendations = [
    {
      priority: "High",
      title: "Accelerate Digital Transformation",
      impact: "287% ROI Expected",
      timeline: "Q2 2025",
      description: "AI analysis shows digital infrastructure gaps. Immediate investment could improve ranking to #1.",
      status: "In Progress",
      confidence: 91.6
    },
    {
      priority: "Medium",
      title: "Expand Research Partnerships",
      impact: "15% Enrollment Growth",
      timeline: "Q3 2025",
      description: "Strategic partnerships with industry leaders could drive research revenue and attract top students.",
      status: "Planning",
      confidence: 78.4
    },
    {
      priority: "High",
      title: "Enhance Student Success Programs",
      impact: "5% Retention Improvement",
      timeline: "Q1 2025",
      description: "AI identifies key intervention points that could significantly improve sophomore retention.",
      status: "Ready",
      confidence: 85.2
    }
  ];

  if (!strategicData) {
    return <div className="animate-pulse">Loading strategic planning data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Strategic Planning & AI Insights</h2>
          <p className="text-ds-text-muted">AI-powered competitive analysis and strategic recommendations</p>
        </div>
        <Button 
          onClick={() => setShowAIRecommendations(!showAIRecommendations)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Brain className="w-4 h-4 mr-2" />
          AI Strategic Advisor
        </Button>
      </div>

      {/* AI Assistant for Strategic Planning */}
      <AIAssistant 
        context="Strategic Planning" 
        onCommand={(cmd) => console.log("Strategic AI Command:", cmd)}
      />

      {/* Strategic KPIs with AI Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Market Position"
          value={`#${strategicData.marketPosition}`}
          change={0}
          changeType="neutral"
          description="AI: Path to #1 identified"
        />
        <AnalyticsCard
          title="Growth Rate"
          value={`${strategicData.predictedGrowth.toFixed(1)}%`}
          change={2.3}
          changeType="increase"
          description="AI-predicted annual growth"
        />
        <AnalyticsCard
          title="ROI on Initiatives"
          value="287%"
          change={23.4}
          changeType="increase"
          description={strategicData.predictions.prediction}
        />
        <AnalyticsCard
          title="AI Readiness Score"
          value="8.2/10"
          change={12.5}
          changeType="increase"
          description={`Confidence: ${strategicData.predictions.confidence}%`}
        />
      </div>

      {/* AI Strategic Recommendations */}
      {showAIRecommendations && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Lightbulb className="w-5 h-5 mr-2" />
              AI Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiStrategicRecommendations.map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-green-900">{rec.title}</h4>
                        <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                          {rec.priority} Priority
                        </Badge>
                        <Badge variant="outline">
                          {rec.confidence}% Confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span><Calendar className="w-3 h-3 inline mr-1" />{rec.timeline}</span>
                        <span><TrendingUp className="w-3 h-3 inline mr-1" />{rec.impact}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={rec.status === 'Ready' ? 'default' : 'outline'}
                      className={rec.status === 'Ready' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {rec.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitive Analysis with AI Insights */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="text-ds-text-primary flex items-center">
            AI-Enhanced Competitive Landscape
            <Badge variant="outline" className="ml-2">Live Analysis</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {competitorData.map((comp, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                comp.position === 'Current' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    comp.position === 'Current' ? 'bg-blue-500' : 
                    comp.position === 'Leader' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{comp.name}</h4>
                    <p className="text-sm text-gray-600">{comp.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div>{comp.enrollment.toLocaleString()} students</div>
                  <div>{comp.retention}% retention</div>
                  <div>{comp.satisfaction}/5.0 satisfaction</div>
                </div>
              </div>
            ))}
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={competitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="enrollment" fill="#1e40af" />
              <Bar dataKey="retention" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI-Enhanced Future Projections */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="text-ds-text-primary">AI-Powered 3-Year Strategic Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="enrollment" stroke="#1e40af" strokeWidth={3} name="Enrollment" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue (M AED)" />
              <Line type="monotone" dataKey="aiScore" stroke="#7c3aed" strokeWidth={3} name="AI Readiness" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
