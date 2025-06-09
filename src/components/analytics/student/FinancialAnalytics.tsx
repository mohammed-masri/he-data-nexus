
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calculator, PieChart } from "lucide-react";

interface FinancialAnalyticsProps {
  filters: any;
}

export const FinancialAnalytics = ({ filters }: FinancialAnalyticsProps) => {
  const scholarshipROIData = [
    { name: "$5,000 - $10,000", value: 425, retention: 94.2, graduation: 87.8 },
    { name: "$10,000 - $20,000", value: 380, retention: 96.1, graduation: 91.3 },
    { name: "$20,000 - $30,000", value: 220, retention: 97.8, graduation: 94.5 },
    { name: "$30,000+", value: 145, retention: 98.9, graduation: 96.2 }
  ];

  const costPerStudentData = [
    { name: "Engineering", value: 52000, retention: 89.5 },
    { name: "Business", value: 38000, retention: 91.2 },
    { name: "Health Sciences", value: 58000, retention: 93.8 },
    { name: "Arts & Sciences", value: 35000, retention: 88.7 },
    { name: "IT", value: 45000, retention: 90.3 }
  ];

  const revenueBreakdownData = [
    { name: "Tuition", value: 68.5 },
    { name: "Government Funding", value: 18.2 },
    { name: "Research Grants", value: 8.1 },
    { name: "Donations", value: 3.4 },
    { name: "Other", value: 1.8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Financial Analytics</h2>
          <p className="text-ds-text-secondary">Cost analysis and financial aid ROI tracking</p>
        </div>
        <Badge className="bg-ds-secondary text-ds-primary">
          <DollarSign className="w-3 h-3 mr-1" />
          $42.3M Total Aid
        </Badge>
      </div>

      <AnalyticsGrid columns={4}>
        <MetricsCard
          title="Cost per Student"
          value="$44,200"
          change={-2.1}
          changeType="decrease"
          description="Average annual cost"
          icon={Calculator}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Scholarship ROI"
          value="4.8x"
          change={12.3}
          changeType="increase"
          description="Return on scholarship investment"
          icon={TrendingUp}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Financial Aid Coverage"
          value="68.4%"
          change={5.7}
          changeType="increase"
          description="Students receiving aid"
          icon={PieChart}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Revenue Growth"
          value="8.3%"
          change={8.3}
          changeType="increase"
          description="Year-over-year growth"
          icon={DollarSign}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-ds-primary" />
              Scholarship ROI by Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={scholarshipROIData}
              type="bar"
              title=""
            />
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-ds-primary" />
              Cost per Student by Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={costPerStudentData}
              type="bar"
              title=""
            />
          </CardContent>
        </Card>
      </AnalyticsGrid>

      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-ds-primary" />
            Revenue Sources Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            data={revenueBreakdownData}
            type="pie"
            title=""
          />
        </CardContent>
      </Card>
    </div>
  );
};
