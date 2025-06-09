
import { useState, useEffect } from "react";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { analyticsDataService } from "@/services/analyticsDataService";
import { MetricsCalculations } from "@/services/metricsCalculations";
import { Users, GraduationCap, DollarSign, Target } from "lucide-react";

interface ExecutiveMetricsProps {
  filters: any;
}

export const ExecutiveMetrics = ({ filters }: ExecutiveMetricsProps) => {
  const [data, setData] = useState(analyticsDataService.generateMockData());

  useEffect(() => {
    // Simulate data refresh based on filters
    setData(analyticsDataService.generateMockData());
  }, [filters]);

  const enrollmentChange = MetricsCalculations.calculateGrowthRate(data.enrollment.current, data.enrollment.previous);
  const performanceChange = 4.1; // Mock calculation
  const budgetChange = 2.3; // Mock calculation

  return (
    <AnalyticsGrid columns={4}>
      <MetricsCard
        title="Total Enrollment"
        value={MetricsCalculations.formatNumber(data.enrollment.current)}
        change={enrollmentChange}
        changeType={MetricsCalculations.getChangeType(data.enrollment.current, data.enrollment.previous)}
        description="15% above target"
        icon={Users}
        className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60"
      />
      <MetricsCard
        title="Academic Performance"
        value={`${data.performance.avgGPA.toFixed(2)} GPA`}
        change={performanceChange}
        changeType="increase"
        description="5-year high"
        icon={GraduationCap}
        className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/60"
      />
      <MetricsCard
        title="Budget Efficiency"
        value={MetricsCalculations.formatPercentage(data.financial.budgetUtilization)}
        change={budgetChange}
        changeType="increase"
        description="Optimal range"
        icon={DollarSign}
        className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200/60"
      />
      <MetricsCard
        title="Strategic Position"
        value={`#${data.strategic.marketPosition}`}
        change={0}
        changeType="neutral"
        description="Regional ranking"
        icon={Target}
        className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/60"
      />
    </AnalyticsGrid>
  );
};
