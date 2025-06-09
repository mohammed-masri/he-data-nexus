
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { employeeDataService } from "@/services/employeeDataService";
import { BarChart3, TrendingUp } from "lucide-react";

interface EmployeeWorkloadAnalyticsProps {
  filters: any;
}

export const EmployeeWorkloadAnalytics = ({ filters }: EmployeeWorkloadAnalyticsProps) => {
  const workloadData = employeeDataService.generateMockEmployeeData().workloadDistribution;
  const trendsData = employeeDataService.generateWorkloadTrendsData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <BarChart3 className="w-5 h-5 mr-2 text-ds-primary" />
            Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={workloadData}
            type="pie"
            title=""
          />
        </CardContent>
      </Card>

      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <TrendingUp className="w-5 h-5 mr-2 text-ds-primary" />
            Workload Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={trendsData.map(item => ({ 
              name: item.semester, 
              value: item.teaching,
              research: item.research,
              admin: item.admin,
              other: item.other
            }))}
            type="line"
            title=""
          />
        </CardContent>
      </Card>
    </div>
  );
};
