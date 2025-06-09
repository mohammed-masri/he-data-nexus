
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Building, Target } from "lucide-react";

interface CareerReadinessAnalyticsProps {
  filters: any;
}

export const CareerReadinessAnalytics = ({ filters }: CareerReadinessAnalyticsProps) => {
  const industryPlacementData = [
    { name: "Technology", value: 320, salary: 75000 },
    { name: "Healthcare", value: 280, salary: 68000 },
    { name: "Finance", value: 240, salary: 72000 },
    { name: "Engineering", value: 220, salary: 70000 },
    { name: "Education", value: 180, salary: 48000 },
    { name: "Government", value: 160, salary: 55000 }
  ];

  const careerOutcomeData = [
    { name: "Employed within 6 months", value: 87.3 },
    { name: "Pursuing further education", value: 8.7 },
    { name: "Still seeking employment", value: 4.0 }
  ];

  const internshipData = [
    { name: "Completed Internships", value: 1240 },
    { name: "Job Offers from Internships", value: 820 },
    { name: "Return Offers", value: 680 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Career Readiness Analytics</h2>
          <p className="text-ds-text-secondary">Employment outcomes and industry placement tracking</p>
        </div>
        <Badge className="bg-ds-secondary text-ds-primary">
          <Briefcase className="w-3 h-3 mr-1" />
          87.3% Employment Rate
        </Badge>
      </div>

      <AnalyticsGrid columns={4}>
        <MetricsCard
          title="Employment Rate"
          value="87.3%"
          change={3.2}
          changeType="increase"
          description="Within 6 months of graduation"
          icon={Briefcase}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Average Salary"
          value="$68,500"
          change={5.8}
          changeType="increase"
          description="Starting salary median"
          icon={TrendingUp}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Employer Partners"
          value="245"
          change={12.4}
          changeType="increase"
          description="Active recruiting partners"
          icon={Building}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
        <MetricsCard
          title="Internship Success"
          value="66.1%"
          change={8.1}
          changeType="increase"
          description="Conversion to full-time offers"
          icon={Target}
          className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
        />
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-ds-primary" />
              Industry Placement Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={industryPlacementData}
              type="bar"
              title=""
            />
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-ds-primary" />
              Career Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={careerOutcomeData}
              type="pie"
              title=""
            />
          </CardContent>
        </Card>
      </AnalyticsGrid>

      <Card className="border-ds-border bg-gradient-to-r from-ds-bg-grey-light to-ds-secondary/30">
        <CardHeader>
          <CardTitle className="text-ds-text-primary flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-ds-primary" />
            Internship Program Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internshipData.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-ds-primary">{metric.value.toLocaleString()}</div>
                <p className="text-sm text-ds-text-secondary">{metric.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
