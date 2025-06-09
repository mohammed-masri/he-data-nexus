
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../../foundation/AnalyticsGrid";
import { EnhancedMetricsCard } from "../../foundation/EnhancedMetricsCard";
import { InteractiveChart } from "../../foundation/InteractiveChart";
import { Microscope, BookOpen, TrendingUp, DollarSign, Lightbulb, Award, Brain, FileText } from "lucide-react";

export const ResearchInnovationTab = () => {
  const researchData = [
    { name: 'Publications', value: 250, target: 200 },
    { name: 'Citations', value: 875, target: 750 },
    { name: 'Grants ($M)', value: 4.2, target: 3.5 },
    { name: 'Patents', value: 18, target: 15 }
  ];

  const impactData = [
    { name: 'Jan', value: 720 },
    { name: 'Feb', value: 780 },
    { name: 'Mar', value: 820 },
    { name: 'Apr', value: 875 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <AnalyticsGrid columns={4}>
        <EnhancedMetricsCard
          title="Research Publications"
          value="250+"
          change={25}
          changeType="increase"
          description="Annual peer-reviewed papers"
          insight="Significant increase in high-impact publications"
          icon={BookOpen}
          className="bg-gradient-to-br from-purple-50/80 to-white border-purple-200"
        />
        <EnhancedMetricsCard
          title="Citation Impact"
          value="87.5"
          change={12.3}
          changeType="increase"
          description="Research quality index"
          insight="Growing international recognition and influence"
          icon={TrendingUp}
          className="bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200"
        />
        <EnhancedMetricsCard
          title="Grant Funding"
          value="$4.2M"
          change={18}
          changeType="increase"
          description="Annual research funding"
          insight="Record funding securing multiple major grants"
          icon={DollarSign}
          className="bg-gradient-to-br from-blue-50/80 to-white border-blue-200"
        />
        <EnhancedMetricsCard
          title="Innovation Index"
          value="Top 5%"
          change={8}
          changeType="increase"
          description="National innovation ranking"
          insight="Leading innovation in key research areas"
          icon={Lightbulb}
          className="bg-gradient-to-br from-orange-50/80 to-white border-orange-200"
        />
      </AnalyticsGrid>

      {/* Research Charts */}
      <AnalyticsGrid columns={2}>
        <InteractiveChart
          title="Research Output vs Targets"
          data={researchData}
          type="bar"
          insight="All research metrics significantly exceeding annual targets"
          height={400}
        />
        <InteractiveChart
          title="Citation Impact Trends"
          data={impactData}
          type="line"
          insight="Consistent growth in research citations and impact"
          height={400}
        />
      </AnalyticsGrid>

      {/* Detailed Research Metrics */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Microscope className="w-5 h-5 mr-2 text-ds-primary" />
            Comprehensive Research & Innovation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsGrid columns={4}>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700">+25%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">250+</div>
              <div className="text-sm font-semibold text-ds-text-primary">Research Publications</div>
              <div className="text-xs text-ds-text-muted">Annual peer-reviewed papers</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <Badge className="bg-emerald-100 text-emerald-700">+12.3%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">87.5</div>
              <div className="text-sm font-semibold text-ds-text-primary">Citation Impact</div>
              <div className="text-xs text-ds-text-muted">Research quality index</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-700">+18%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">$4.2M</div>
              <div className="text-sm font-semibold text-ds-text-primary">Grant Funding</div>
              <div className="text-xs text-ds-text-muted">Annual research funding</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border border-ds-border">
              <div className="flex items-center justify-between mb-2">
                <Lightbulb className="w-4 h-4 text-orange-600" />
                <Badge className="bg-orange-100 text-orange-700">+8%</Badge>
              </div>
              <div className="text-2xl font-bold text-ds-primary mb-1">Top 5%</div>
              <div className="text-sm font-semibold text-ds-text-primary">Innovation Index</div>
              <div className="text-xs text-ds-text-muted">National innovation ranking</div>
            </div>
          </AnalyticsGrid>
        </CardContent>
      </Card>
    </div>
  );
};
