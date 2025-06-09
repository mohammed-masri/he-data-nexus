
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { employeeDataService } from "@/services/employeeDataService";
import { Building, Users } from "lucide-react";

interface EmployeeDepartmentAnalyticsProps {
  filters: any;
}

export const EmployeeDepartmentAnalytics = ({ filters }: EmployeeDepartmentAnalyticsProps) => {
  const departmentData = employeeDataService.generateDepartmentEmployeeData();
  const distributionData = employeeDataService.generateMockEmployeeData().departmentDistribution;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <Building className="w-5 h-5 mr-2 text-ds-primary" />
            Faculty vs Staff by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={departmentData.map(item => ({ 
              name: item.name, 
              value: item.total,
              faculty: item.faculty,
              staff: item.staff
            }))}
            type="bar"
            title=""
          />
        </CardContent>
      </Card>

      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <Users className="w-5 h-5 mr-2 text-ds-primary" />
            Employee Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={distributionData}
            type="pie"
            title=""
          />
        </CardContent>
      </Card>
    </div>
  );
};
