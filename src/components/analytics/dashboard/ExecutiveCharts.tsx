
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { DataVisualization } from "../foundation/DataVisualization";
import { analyticsDataService } from "@/services/analyticsDataService";

interface ExecutiveChartsProps {
  filters: any;
}

export const ExecutiveCharts = ({ filters }: ExecutiveChartsProps) => {
  const enrollmentData = analyticsDataService.generateEnrollmentTrends();
  const performanceData = analyticsDataService.generatePerformanceMetrics();
  const departmentData = analyticsDataService.generateDepartmentData();

  return (
    <AnalyticsGrid columns={2}>
      <DataVisualization
        data={enrollmentData}
        type="line"
        title="Enrollment Trends"
        className="lg:col-span-2"
      />
      <DataVisualization
        data={performanceData}
        type="bar"
        title="Performance Metrics"
      />
      <DataVisualization
        data={departmentData}
        type="pie"
        title="Enrollment by Department"
      />
    </AnalyticsGrid>
  );
};
