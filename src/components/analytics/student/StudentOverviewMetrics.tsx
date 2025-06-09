
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { studentDataService } from "@/services/studentDataService";
import { Users, GraduationCap, TrendingDown, Award } from "lucide-react";

interface StudentOverviewMetricsProps {
  filters: any;
}

export const StudentOverviewMetrics = ({ filters }: StudentOverviewMetricsProps) => {
  const studentData = studentDataService.generateMockStudentData();
  const metrics = studentDataService.calculateStudentMetrics(studentData);

  return (
    <AnalyticsGrid columns={4}>
      <MetricsCard
        title="Total Enrollment"
        value={metrics.totalEnrollment.toLocaleString()}
        change={8.5}
        changeType="increase"
        description="Active students"
        icon={Users}
        className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
      />
      <MetricsCard
        title="Graduation Rate"
        value={`${metrics.graduationRate.toFixed(1)}%`}
        change={3.2}
        changeType="increase"
        description="Last 4 years average"
        icon={GraduationCap}
        className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
      />
      <MetricsCard
        title="Retention Rate"
        value={`${metrics.retentionRate.toFixed(1)}%`}
        change={-1.8}
        changeType="decrease"
        description="Year-over-year"
        icon={TrendingDown}
        className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
      />
      <MetricsCard
        title="Average GPA"
        value={metrics.averageGpa.toFixed(2)}
        change={2.1}
        changeType="increase"
        description="Overall academic performance"
        icon={Award}
        className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
      />
    </AnalyticsGrid>
  );
};
