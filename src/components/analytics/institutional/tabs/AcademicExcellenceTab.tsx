
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../../foundation/AnalyticsGrid";
import { EnhancedMetricsCard } from "../../foundation/EnhancedMetricsCard";
import { InteractiveChart } from "../../foundation/InteractiveChart";
import { GraduationCap, Award, Users, Star, CheckCircle, TrendingUp, UserCheck, Calendar } from "lucide-react";

export const AcademicExcellenceTab = () => {
  const performanceData = [
    { name: 'Graduation Rate', value: 96.8, target: 95 },
    { name: 'Retention Rate', value: 94.2, target: 90 },
    { name: 'GPA Average', value: 3.6, target: 3.5 },
    { name: 'Satisfaction', value: 4.7, target: 4.5 }
  ];

  const trendData = [
    { name: 'Jan', value: 95 },
    { name: 'Feb', value: 96 },
    { name: 'Mar', value: 96.5 },
    { name: 'Apr', value: 96.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <AnalyticsGrid columns={4}>
        <EnhancedMetricsCard
          title="Graduation Rate"
          value="96.8%"
          change={1.5}
          changeType="increase"
          description="On-time completion rate"
          insight="Highest graduation rate in 5-year history"
          icon={Award}
          className="bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200"
        />
        <EnhancedMetricsCard
          title="Student Retention"
          value="94.2%"
          change={2.1}
          changeType="increase"
          description="Year-over-year retention"
          insight="Strong improvement in student engagement programs"
          icon={Users}
          className="bg-gradient-to-br from-blue-50/80 to-white border-blue-200"
        />
        <EnhancedMetricsCard
          title="Academic Performance"
          value="3.6/4.0"
          change={0.1}
          changeType="increase"
          description="Average cumulative GPA"
          insight="Consistent academic excellence across all programs"
          icon={Star}
          className="bg-gradient-to-br from-purple-50/80 to-white border-purple-200"
        />
        <EnhancedMetricsCard
          title="Student Satisfaction"
          value="4.7/5"
          change={0.3}
          changeType="increase"
          description="Overall educational experience"
          insight="Highest satisfaction score achieved this year"
          icon={CheckCircle}
          className="bg-gradient-to-br from-orange-50/80 to-white border-orange-200"
        />
      </AnalyticsGrid>

      {/* Performance Charts */}
      <AnalyticsGrid columns={2}>
        <InteractiveChart
          title="Academic Performance vs Targets"
          data={performanceData}
          type="bar"
          insight="All academic metrics exceeding targets with consistent improvement"
          height={400}
        />
        <InteractiveChart
          title="Graduation Rate Trends"
          data={trendData}
          type="line"
          insight="Upward trend in graduation rates showing consistent improvement"
          height={400}
        />
      </AnalyticsGrid>

      {/* Detailed Academic Metrics */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <GraduationCap className="w-5 h-5 mr-2 text-ds-primary" />
            Comprehensive Academic Excellence Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsGrid columns={4}>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <Badge className="bg-emerald-100 text-emerald-700">+1.5%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">96.8%</div>
              <div className="text-sm font-semibold text-ds-text-primary">Graduation Rate</div>
              <div className="text-xs text-ds-text-muted">On-time completion rate</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-700">+2.1%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">94.2%</div>
              <div className="text-sm font-semibold text-ds-text-primary">Student Retention</div>
              <div className="text-xs text-ds-text-muted">Year-over-year retention</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-4 h-4 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700">+0.1</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">3.6/4.0</div>
              <div className="text-sm font-semibold text-ds-text-primary">Academic Performance</div>
              <div className="text-xs text-ds-text-muted">Average cumulative GPA</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                <Badge className="bg-orange-100 text-orange-700">+0.3</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">4.7/5</div>
              <div className="text-sm font-semibold text-ds-text-primary">Student Satisfaction</div>
              <div className="text-xs text-ds-text-muted">Overall educational experience</div>
            </div>
          </AnalyticsGrid>
        </CardContent>
      </Card>
    </div>
  );
};
