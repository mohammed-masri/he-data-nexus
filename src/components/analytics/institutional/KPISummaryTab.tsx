
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { InteractiveChart } from "../foundation/InteractiveChart";
import { EnhancedMetricsCard } from "../foundation/EnhancedMetricsCard";
import { KPIPillarData } from "@/services/kpiDataService";
import { 
  TrendingUp, Users, GraduationCap, Building2, Brain, Award, Briefcase, Star,
  BookOpen, DollarSign, Lightbulb, BarChart, UserCheck,
  CheckCircle, Trophy, Network, Microscope, PieChart, Activity, 
  Sparkles
} from "lucide-react";

interface KPISummaryTabProps {
  pillars: KPIPillarData[];
}

export const KPISummaryTab = ({ pillars }: KPISummaryTabProps) => {
  const chartData = pillars.map(pillar => ({
    name: pillar.name.replace(' Outcomes', '').replace(' Collaboration', ''),
    value: pillar.overallScore,
    target: 85,
    status: pillar.status
  }));

  const statusData = [
    { name: 'Exceeds Target', value: pillars.filter(p => p.status === 'exceeds-target').length },
    { name: 'On Track', value: pillars.filter(p => p.status === 'on-track').length },
    { name: 'Needs Attention', value: pillars.filter(p => p.status === 'needs-attention').length }
  ];

  // Enhanced performance metrics for better visualization
  const performanceMetrics = [
    {
      title: "Student Success Rate",
      value: 94.2,
      target: 90,
      trend: 2.1,
      description: "Overall student achievement and completion rates",
      icon: GraduationCap,
      color: "green"
    },
    {
      title: "Faculty Excellence",
      value: 96.8,
      target: 95,
      trend: 1.5,
      description: "Teaching effectiveness and research output",
      icon: Users,
      color: "blue"
    },
    {
      title: "Research Impact",
      value: 87.5,
      target: 85,
      trend: 12.3,
      description: "Publication quality and citation metrics",
      icon: Microscope,
      color: "purple"
    },
    {
      title: "Industry Partnerships",
      value: 91.3,
      target: 88,
      trend: 5.2,
      description: "Corporate collaboration and placement rates",
      icon: Building2,
      color: "indigo"
    },
    {
      title: "Financial Health",
      value: 96.3,
      target: 95,
      trend: 1.8,
      description: "Budget utilization and revenue growth",
      icon: DollarSign,
      color: "emerald"
    },
    {
      title: "Innovation Index",
      value: 89.7,
      target: 85,
      trend: 8.4,
      description: "Technology adoption and innovation metrics",
      icon: Lightbulb,
      color: "amber"
    }
  ];

  // Department performance data for enhanced visualization
  const departmentData = [
    { name: "Engineering", performance: 95.2, students: 3420, satisfaction: 4.7 },
    { name: "Business", performance: 92.8, students: 2890, satisfaction: 4.5 },
    { name: "Arts & Sciences", performance: 89.6, students: 2150, satisfaction: 4.3 },
    { name: "Medicine", performance: 97.1, students: 1980, satisfaction: 4.8 },
    { name: "Computer Science", performance: 94.5, students: 2760, satisfaction: 4.6 }
  ];

  // Trend data for time series visualization
  const trendData = [
    { month: "Aug", enrollment: 14200, retention: 89.2, satisfaction: 4.3 },
    { month: "Sep", enrollment: 15100, retention: 91.5, satisfaction: 4.4 },
    { month: "Oct", enrollment: 15420, retention: 92.8, satisfaction: 4.5 },
    { month: "Nov", enrollment: 15380, retention: 93.1, satisfaction: 4.6 },
    { month: "Dec", enrollment: 15420, retention: 94.2, satisfaction: 4.7 }
  ];

  return (
    <div className="space-y-8">
      {/* Executive Dashboard Header */}
      <Card className="border-ds-border shadow-lg bg-gradient-to-br from-ds-secondary/30 via-white to-ds-bg-grey-light">
        <CardHeader className="border-b border-ds-border">
          <CardTitle className="text-ds-text-primary flex flex-col sm:flex-row sm:items-center gap-3 text-xl font-bold">
            <div className="flex items-center">
              <div className="p-3 bg-ds-primary rounded-xl mr-3 shadow-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span>Executive Performance Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <Badge className="bg-ds-primary text-white border-0 px-3 py-1 text-sm font-semibold">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Enhanced
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-sm font-semibold">
                <CheckCircle className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Key Performance Indicators Grid */}
          <AnalyticsGrid columns={3} className="mb-8 gap-6">
            <EnhancedMetricsCard
              title="Institutional Excellence"
              value="95.3%"
              change={3.2}
              changeType="increase"
              description="Overall institutional quality rating"
              insight="Highest excellence score in 5-year history"
              icon={Award}
              className="bg-gradient-to-br from-green-50 to-white border-green-200"
            />
            <EnhancedMetricsCard
              title="Student Success"
              value="94.2%"
              change={2.1}
              changeType="increase"
              description="Achievement and retention rates"
              insight="Above national average by 12%"
              icon={GraduationCap}
              className="bg-gradient-to-br from-blue-50 to-white border-blue-200"
            />
            <EnhancedMetricsCard
              title="Research Impact"
              value="87.5"
              change={12}
              changeType="increase"
              description="Research excellence index"
              insight="Top 5% nationally in innovation"
              icon={Microscope}
              className="bg-gradient-to-br from-purple-50 to-white border-purple-200"
            />
          </AnalyticsGrid>

          {/* Enhanced Data Visualizations */}
          <div className="space-y-8">
            {/* Performance Metrics Grid with Enhanced Cards */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-ds-text-primary flex items-center">
                <div className="w-1 h-6 bg-ds-primary rounded-full mr-3"></div>
                Key Performance Areas
              </h3>
              
              <AnalyticsGrid columns={3} className="gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index} className="border-ds-border hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-${metric.color}-100 rounded-lg group-hover:bg-${metric.color}-200 transition-colors`}>
                          <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                        </div>
                        <Badge className={`bg-${metric.color}-50 text-${metric.color}-700 border-${metric.color}-200`}>
                          +{metric.trend}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-ds-primary">
                          {metric.value}%
                        </div>
                        <div className="text-lg font-semibold text-ds-text-primary">
                          {metric.title}
                        </div>
                        <div className="text-sm text-ds-text-muted">
                          {metric.description}
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-ds-text-secondary">
                            <span>Progress</span>
                            <span>{metric.value}% of {metric.target}%</span>
                          </div>
                          <div className="w-full bg-ds-bg-grey-light rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-700`}
                              style={{ width: `${(metric.value / metric.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </AnalyticsGrid>
            </div>

            {/* Enhanced Interactive Charts */}
            <AnalyticsGrid columns={2} className="gap-6">
              <InteractiveChart
                title="Performance vs Strategic Targets"
                data={chartData}
                type="bar"
                insight="All performance pillars consistently meeting strategic targets with 12% average improvement"
                height={400}
                className="shadow-lg border-ds-border bg-white"
                onExport={() => console.log('Exporting chart...')}
                onRefresh={() => console.log('Refreshing data...')}
              />
              <InteractiveChart
                title="Performance Distribution"
                data={statusData}
                type="pie"
                insight="85% of areas exceeding targets, indicating robust institutional health"
                height={400}
                className="shadow-lg border-ds-border bg-white"
                onExport={() => console.log('Exporting chart...')}
                onRefresh={() => console.log('Refreshing data...')}
              />
            </AnalyticsGrid>

            {/* Department Performance Analysis */}
            <Card className="border-ds-border shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-ds-text-primary flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-ds-primary" />
                  Department Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveChart
                  title="Department Excellence Metrics"
                  data={departmentData.map(dept => ({
                    name: dept.name,
                    value: dept.performance,
                    students: dept.students,
                    satisfaction: dept.satisfaction
                  }))}
                  type="bar"
                  insight="Engineering and Medicine departments leading in performance metrics"
                  height={300}
                  className="bg-transparent border-0 shadow-none"
                />
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card className="border-ds-border shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-ds-text-primary flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-ds-primary" />
                  Academic Year Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveChart
                  title="Enrollment & Retention Trends"
                  data={trendData.map(item => ({
                    name: item.month,
                    value: item.retention,
                    enrollment: item.enrollment,
                    satisfaction: item.satisfaction
                  }))}
                  type="line"
                  insight="Consistent upward trend in retention rates throughout the academic year"
                  height={300}
                  className="bg-transparent border-0 shadow-none"
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
