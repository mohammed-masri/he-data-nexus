
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";

interface PredictiveAIComponentProps {
  domain: string;
  filters?: any;
}

export const PredictiveAIComponent = ({ domain, filters }: PredictiveAIComponentProps) => {
  // Generate prediction data based on filters
  const predictionData = Array.from({ length: 12 }, (_, i) => ({
    period: `Month ${i + 1}`,
    actual: i < 6 ? Math.floor(Math.random() * 1000) + 500 : null,
    predicted: Math.floor(Math.random() * 1200) + 400,
    confidence: Math.floor(Math.random() * 30) + 70,
  }));

  const getPredictiveMetrics = () => {
    switch (domain) {
      case "students-enrollment":
        return [
          { title: "Predicted Enrollment", value: "3,120", change: 15.8, changeType: "increase" as const },
          { title: "Retention Forecast", value: "93.2%", change: 2.4, changeType: "increase" as const },
          { title: "Risk Score", value: "Low", change: -12.1, changeType: "decrease" as const }
        ];
      default:
        return [
          { title: "Predicted Growth", value: "12.5%", change: 8.2, changeType: "increase" as const },
          { title: "Confidence Level", value: "89.7%", change: 3.1, changeType: "increase" as const },
          { title: "Alert Level", value: "Medium", change: 0, changeType: "neutral" as const }
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ds-text-primary">Predictive AI Analytics</h2>
            <p className="text-sm text-ds-text-muted">ML-powered forecasting and predictions</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <TrendingUp className="w-4 h-4 mr-2" />
          Generate Forecast
        </Button>
      </div>

      {/* Prediction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getPredictiveMetrics().map((metric, index) => (
          <AnalyticsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            description="AI-generated prediction"
          />
        ))}
      </div>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-ds-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-ds-text-primary mb-4">Prediction vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#1e40af" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-ds-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-ds-text-primary mb-4">Confidence Intervals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="confidence" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-medium text-purple-900">AI Insights</h3>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-purple-800">• Predicted 15% increase in enrollment based on current trends</p>
          <p className="text-purple-800">• Risk factors identified in retention patterns for Q3</p>
          <p className="text-purple-800">• Seasonal variations detected - recommend proactive measures</p>
        </div>
      </div>
    </div>
  );
};
