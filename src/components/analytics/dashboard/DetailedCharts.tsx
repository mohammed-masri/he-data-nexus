
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { DataVisualization } from "../foundation/DataVisualization";
import { analyticsDataService } from "@/services/analyticsDataService";

interface DetailedChartsProps {
  filters: any;
}

export const DetailedCharts = ({ filters }: DetailedChartsProps) => {
  const enrollmentData = analyticsDataService.generateEnrollmentTrends();
  const performanceData = analyticsDataService.generatePerformanceMetrics();
  const departmentData = analyticsDataService.generateDepartmentData();
  const budgetData = analyticsDataService.generateBudgetBreakdown();

  return (
    <div className="space-y-6">
      <AnalyticsGrid columns={1}>
        <DataVisualization
          data={enrollmentData}
          type="line"
          title="Enrollment Trends Over Time"
        />
      </AnalyticsGrid>
      <AnalyticsGrid columns={2}>
        <DataVisualization
          data={performanceData}
          type="bar"
          title="Key Performance Indicators"
        />
        <DataVisualization
          data={departmentData}
          type="pie"
          title="Enrollment Distribution by Department"
        />
        <DataVisualization
          data={budgetData}
          type="pie"
          title="Budget Allocation"
        />
        <DataVisualization
          data={performanceData}
          type="bar"
          title="Student Outcomes"
        />
      </AnalyticsGrid>
    </div>
  );
};
