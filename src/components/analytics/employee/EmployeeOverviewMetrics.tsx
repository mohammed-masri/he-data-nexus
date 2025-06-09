
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { employeeDataService } from "@/services/employeeDataService";
import { Users, GraduationCap, DollarSign, Clock, Building, UserCheck } from "lucide-react";

interface EmployeeOverviewMetricsProps {
  filters: any;
}

export const EmployeeOverviewMetrics = ({ filters }: EmployeeOverviewMetricsProps) => {
  const data = employeeDataService.generateMockEmployeeData();

  return (
    <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40">
      <CardHeader>
        <CardTitle className="flex items-center text-ds-text-primary">
          <Users className="w-5 h-5 mr-2 text-ds-primary" />
          Employee Analytics Overview
          <Badge className="ml-2 bg-ds-secondary text-ds-primary">
            Live Data
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnalyticsGrid columns={3}>
          <MetricsCard
            title="Total Employees"
            value={data.totalEmployees.toLocaleString()}
            change={5.2}
            changeType="increase"
            description="Active workforce"
            icon={Users}
            className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
          />
          <MetricsCard
            title="Faculty Members"
            value={data.facultyCount.toLocaleString()}
            change={3.8}
            changeType="increase"
            description="Teaching & research"
            icon={GraduationCap}
            className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
          />
          <MetricsCard
            title="Average Salary"
            value={`AED ${(data.averageSalary / 1000).toFixed(0)}K`}
            change={4.1}
            changeType="increase"
            description="Annual compensation"
            icon={DollarSign}
            className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
          />
        </AnalyticsGrid>

        <div className="mt-6">
          <AnalyticsGrid columns={3}>
            <MetricsCard
              title="Staff Members"
              value={data.staffCount.toLocaleString()}
              change={6.5}
              changeType="increase"
              description="Administrative & support"
              icon={UserCheck}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
            <MetricsCard
              title="Avg Experience"
              value={`${data.averageExperience} years`}
              change={2.3}
              changeType="increase"
              description="Workforce experience"
              icon={Clock}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
            <MetricsCard
              title="Departments"
              value="7"
              change={0}
              changeType="neutral"
              description="Academic units"
              icon={Building}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
          </AnalyticsGrid>
        </div>
      </CardContent>
    </Card>
  );
};
