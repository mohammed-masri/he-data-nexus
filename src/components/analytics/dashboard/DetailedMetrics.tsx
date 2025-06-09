
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { analyticsDataService } from "@/services/analyticsDataService";
import { MetricsCalculations } from "@/services/metricsCalculations";
import { Users, GraduationCap, DollarSign, Target, BookOpen, Award } from "lucide-react";

interface DetailedMetricsProps {
  filters: any;
}

export const DetailedMetrics = ({ filters }: DetailedMetricsProps) => {
  const data = analyticsDataService.generateMockData();

  return (
    <div className="space-y-6">
      <AnalyticsGrid columns={3}>
        <MetricsCard
          title="Total Enrollment"
          value={MetricsCalculations.formatNumber(data.enrollment.current)}
          change={15.2}
          changeType="increase"
          description="vs last semester"
          icon={Users}
        />
        <MetricsCard
          title="Retention Rate"
          value={MetricsCalculations.formatPercentage(data.performance.retentionRate)}
          change={2.1}
          changeType="increase"
          description="first-year students"
          icon={BookOpen}
        />
        <MetricsCard
          title="Graduation Rate"
          value={MetricsCalculations.formatPercentage(data.performance.graduationRate)}
          change={1.8}
          changeType="increase"
          description="6-year completion"
          icon={Award}
        />
        <MetricsCard
          title="Average GPA"
          value={data.performance.avgGPA.toFixed(2)}
          change={0.1}
          changeType="increase"
          description="all students"
          icon={GraduationCap}
        />
        <MetricsCard
          title="Revenue per Student"
          value={MetricsCalculations.formatCurrency(data.financial.revenuePerStudent)}
          change={3.2}
          changeType="increase"
          description="annual average"
          icon={DollarSign}
        />
        <MetricsCard
          title="Market Ranking"
          value={`#${data.strategic.marketPosition}`}
          change={0}
          changeType="neutral"
          description="regional position"
          icon={Target}
        />
      </AnalyticsGrid>
    </div>
  );
};
