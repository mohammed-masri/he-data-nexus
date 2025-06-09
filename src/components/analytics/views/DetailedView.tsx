
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictiveAnalyticsEngine } from "../features/PredictiveAnalyticsEngine";
import { EnhancedAIAssistant } from "../features/EnhancedAIAssistant";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { Brain, BarChart3, TrendingUp, Users, GraduationCap, DollarSign } from "lucide-react";
import { analyticsDataService } from "@/services/analyticsDataService";

interface DetailedViewProps {
  filters: any;
}

export const DetailedView = ({ filters }: DetailedViewProps) => {
  const data = analyticsDataService.generateMockData();

  const enrollmentData = [
    { name: "Fall 2020", value: 12450 },
    { name: "Spring 2021", value: 12680 },
    { name: "Fall 2021", value: 13120 },
    { name: "Spring 2022", value: 13350 },
    { name: "Fall 2022", value: 13890 },
    { name: "Spring 2023", value: 14120 },
    { name: "Fall 2023", value: 14650 },
    { name: "Spring 2024", value: 14920 },
    { name: "Fall 2024", value: 15420 }
  ];

  const departmentData = [
    { name: "Engineering", students: 3420, budget: 2.8 },
    { name: "Business", students: 2890, budget: 2.1 },
    { name: "Liberal Arts", students: 2650, budget: 1.9 },
    { name: "Sciences", students: 2180, budget: 2.2 },
    { name: "Health Sciences", students: 1890, budget: 1.8 },
    { name: "Education", students: 1590, budget: 1.4 }
  ];

  return (
    <div className="space-y-8">
      {/* Detailed Analytics Header */}
      <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <BarChart3 className="w-5 h-5 mr-2 text-ds-primary" />
            Comprehensive Analytics Dashboard
            <Badge className="ml-2 bg-ds-secondary text-ds-primary">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsGrid columns={4}>
            <MetricsCard
              title="Total Students"
              value={data.enrollment.current.toLocaleString()}
              change={8.5}
              changeType="increase"
              description="Active enrollment"
              icon={Users}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
            <MetricsCard
              title="Graduation Rate"
              value="89.2%"
              change={3.2}
              changeType="increase"
              description="4-year average"
              icon={GraduationCap}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
            <MetricsCard
              title="Budget Utilization"
              value="78.4%"
              change={2.1}
              changeType="increase"
              description="Optimal efficiency"
              icon={DollarSign}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
            <MetricsCard
              title="AI Predictions"
              value="94.2%"
              change={5.7}
              changeType="increase"
              description="Accuracy rate"
              icon={Brain}
              className="bg-gradient-to-br from-ds-bg to-ds-secondary/30 border-ds-border/60"
            />
          </AnalyticsGrid>
        </CardContent>
      </Card>

      {/* Main Content with AI Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Detailed Analytics Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-ds-border">
              <TabsTrigger value="overview" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                Overview
              </TabsTrigger>
              <TabsTrigger value="enrollment" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                Enrollment
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                Departments
              </TabsTrigger>
              <TabsTrigger value="predictive" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                AI Predictive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AnalyticsGrid columns={2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-ds-text-primary">
                      <TrendingUp className="w-5 h-5 mr-2 text-ds-primary" />
                      Enrollment Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataVisualization
                      data={enrollmentData}
                      type="line"
                      title=""
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-ds-text-primary">
                      <BarChart3 className="w-5 h-5 mr-2 text-ds-primary" />
                      Department Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataVisualization
                      data={departmentData.map(d => ({ name: d.name, value: d.students }))}
                      type="pie"
                      title=""
                    />
                  </CardContent>
                </Card>
              </AnalyticsGrid>
            </TabsContent>

            <TabsContent value="enrollment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ds-text-primary">Detailed Enrollment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataVisualization
                    data={enrollmentData}
                    type="line"
                    title=""
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ds-text-primary">Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataVisualization
                    data={departmentData.map(d => ({ name: d.name, value: d.students, budget: d.budget }))}
                    type="bar"
                    title=""
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictive" className="space-y-6">
              <PredictiveAnalyticsEngine filters={filters} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <EnhancedAIAssistant domain="detailed-analytics" filters={filters} />
        </div>
      </div>
    </div>
  );
};
