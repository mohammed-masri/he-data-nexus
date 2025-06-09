
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { employeeDataService } from "@/services/employeeDataService";
import { DollarSign, BarChart3 } from "lucide-react";

interface EmployeeSalaryAnalyticsProps {
  filters: any;
}

export const EmployeeSalaryAnalytics = ({ filters }: EmployeeSalaryAnalyticsProps) => {
  const salaryByPosition = employeeDataService.generateMockEmployeeData().salaryByPosition;
  const salaryByDepartment = employeeDataService.generateSalaryAnalysisData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <DollarSign className="w-5 h-5 mr-2 text-ds-primary" />
            Salary by Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={salaryByPosition.map(item => ({ 
              name: item.position, 
              value: item.salary / 1000 // Convert to thousands for readability
            }))}
            type="bar"
            title=""
          />
        </CardContent>
      </Card>

      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <BarChart3 className="w-5 h-5 mr-2 text-ds-primary" />
            Salary by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={salaryByDepartment.map(item => ({ 
              name: item.department, 
              value: item.avgSalary / 1000,
              count: item.count
            }))}
            type="bar"
            title=""
          />
        </CardContent>
      </Card>
    </div>
  );
};
