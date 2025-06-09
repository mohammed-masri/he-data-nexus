
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../../foundation/AnalyticsGrid";
import { EnhancedMetricsCard } from "../../foundation/EnhancedMetricsCard";
import { InteractiveChart } from "../../foundation/InteractiveChart";
import { UserCheck, FileText, Percent, TrendingUp, Network, Users, Calendar, GraduationCap } from "lucide-react";

export const StudentLifecycleTab = () => {
  const lifecycleData = [
    { name: 'Applications', value: 12450, growth: 8.3 },
    { name: 'Admissions', value: 8466, growth: 5.2 },
    { name: 'Enrollments', value: 7196, growth: 3.2 },
    { name: 'Graduations', value: 6965, growth: 2.1 }
  ];

  const conversionData = [
    { name: 'Application to Admission', value: 68 },
    { name: 'Admission to Enrollment', value: 85 },
    { name: 'Enrollment to Graduation', value: 97 },
    { name: 'Overall Conversion', value: 56 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <AnalyticsGrid columns={4}>
        <EnhancedMetricsCard
          title="Application Volume"
          value="12,450"
          change={8.3}
          changeType="increase"
          description="Total applications received"
          insight="Record high application volume this academic year"
          icon={FileText}
          className="bg-gradient-to-br from-blue-50/80 to-white border-blue-200"
        />
        <EnhancedMetricsCard
          title="Admission Rate"
          value="68%"
          change={-2.1}
          changeType="decrease"
          description="Applications accepted ratio"
          insight="Maintaining selectivity while ensuring quality"
          icon={Percent}
          className="bg-gradient-to-br from-orange-50/80 to-white border-orange-200"
        />
        <EnhancedMetricsCard
          title="Enrollment Rate"
          value="85%"
          change={3.2}
          changeType="increase"
          description="Accepted students enrolled"
          insight="Strong yield rate indicating institutional appeal"
          icon={TrendingUp}
          className="bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200"
        />
        <EnhancedMetricsCard
          title="Alumni Network"
          value="18,500+"
          change={15}
          changeType="increase"
          description="Global alumni community"
          insight="Expanding global network with strong engagement"
          icon={Network}
          className="bg-gradient-to-br from-purple-50/80 to-white border-purple-200"
        />
      </AnalyticsGrid>

      {/* Lifecycle Charts */}
      <AnalyticsGrid columns={2}>
        <InteractiveChart
          title="Student Lifecycle Volume"
          data={lifecycleData}
          type="bar"
          insight="Strong growth across all lifecycle stages with healthy conversion rates"
          height={400}
        />
        <InteractiveChart
          title="Conversion Rate Analysis"
          data={conversionData}
          type="pie"
          insight="Excellent retention throughout the student journey"
          height={400}
        />
      </AnalyticsGrid>

      {/* Detailed Lifecycle Metrics */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <UserCheck className="w-5 h-5 mr-2 text-ds-primary" />
            Comprehensive Student Lifecycle Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsGrid columns={4}>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-700">+8.3%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">12,450</div>
              <div className="text-sm font-semibold text-ds-text-primary">Application Volume</div>
              <div className="text-xs text-ds-text-muted">Total applications received</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Percent className="w-4 h-4 text-orange-600" />
                <Badge className="bg-red-100 text-red-700">-2.1%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">68%</div>
              <div className="text-sm font-semibold text-ds-text-primary">Admission Rate</div>
              <div className="text-xs text-ds-text-muted">Applications accepted ratio</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <Badge className="bg-emerald-100 text-emerald-700">+3.2%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">85%</div>
              <div className="text-sm font-semibold text-ds-text-primary">Enrollment Rate</div>
              <div className="text-xs text-ds-text-muted">Accepted students enrolled</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Network className="w-4 h-4 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700">+15%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">18,500+</div>
              <div className="text-sm font-semibold text-ds-text-primary">Alumni Network</div>
              <div className="text-xs text-ds-text-muted">Global alumni community</div>
            </div>
          </AnalyticsGrid>
        </CardContent>
      </Card>
    </div>
  );
};
