
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, Target, Sparkles, Brain } from "lucide-react";
import { dynamicData } from "@/services/dynamicDataService";

interface UnifiedMetricsProps {
  filters: any;
  viewMode: 'executive' | 'detailed';
}

export const UnifiedMetrics = ({ filters, viewMode }: UnifiedMetricsProps) => {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const enrollment = dynamicData.generateEnrollmentData(filters);
    const performance = dynamicData.generatePerformanceData(filters);
    const strategic = dynamicData.generateStrategicData(filters);
    
    setHeroData({ enrollment, performance, strategic });
  }, [filters]);

  if (!heroData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Enrollment",
      value: heroData.enrollment.current.toLocaleString(),
      change: 15.2,
      changeType: "increase" as const,
      description: "15% above target",
      icon: Users,
      color: "emerald",
      priority: "critical"
    },
    {
      title: "Academic Performance",
      value: `${heroData.performance.avgGPA.toFixed(2)} GPA`,
      change: 4.1,
      changeType: "increase" as const,
      description: "5-year high",
      icon: GraduationCap,
      color: "blue",
      priority: "critical"
    },
    {
      title: "Budget Efficiency",
      value: `${heroData.performance.budgetUtilization.toFixed(1)}%`,
      change: 2.3,
      changeType: "increase" as const,
      description: "Optimal range",
      icon: DollarSign,
      color: "indigo",
      priority: "high"
    },
    {
      title: "Strategic Position",
      value: `#${heroData.strategic.marketPosition}`,
      change: 0,
      changeType: "neutral" as const,
      description: "Regional ranking",
      icon: Target,
      color: "purple",
      priority: "high"
    }
  ];

  const getColorClasses = (color: string, priority: string) => {
    const baseColors = {
      emerald: "from-emerald-50 to-emerald-100/50 border-emerald-200/60 text-emerald-900",
      blue: "from-blue-50 to-blue-100/50 border-blue-200/60 text-blue-900",
      indigo: "from-indigo-50 to-indigo-100/50 border-indigo-200/60 text-indigo-900",
      purple: "from-purple-50 to-purple-100/50 border-purple-200/60 text-purple-900"
    };
    
    const priorityEnhancement = priority === 'critical' ? ' ring-2 ring-offset-2 ring-opacity-20 ' : '';
    const ringColor = priority === 'critical' ? `ring-${color}-300` : '';
    
    return `bg-gradient-to-br ${baseColors[color as keyof typeof baseColors]} ${priorityEnhancement} ${ringColor}`;
  };

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const colorClasses = getColorClasses(metric.color, metric.priority);
          
          return (
            <Card key={index} className={`border-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${colorClasses}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {metric.change !== 0 && (
                      <Badge variant="outline" className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm font-medium">
                        {metric.changeType === 'increase' ? (
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className="text-xs font-semibold">
                          {metric.change > 0 ? "+" : ""}{metric.change}%
                        </span>
                      </Badge>
                    )}
                    {metric.priority === 'critical' && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300 text-xs font-medium">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Critical
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">{metric.title}</p>
                  <p className="text-3xl font-bold leading-none">{metric.value}</p>
                  <p className="text-sm opacity-80 font-medium">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Executive Summary - Only show in executive view */}
      {viewMode === 'executive' && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
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
                <h4 className="font-semibold text-blue-900 mb-2">Key Achievements</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Record enrollment of {heroData.enrollment.current.toLocaleString()} students (15% above target)</li>
                  <li>• Highest academic performance in institutional history</li>
                  <li>• Budget efficiency at optimal 78.4% utilization</li>
                  <li>• Student satisfaction improved to 4.6/5.0</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">AI Strategic Recommendations</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Accelerate digital transformation (287% ROI potential)</li>
                  <li>• Focus on sophomore retention programs</li>
                  <li>• Expand research partnerships for #1 ranking</li>
                  <li>• Optimize resource allocation across departments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
