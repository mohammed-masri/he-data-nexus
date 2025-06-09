
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { studentDataService } from "@/services/studentDataService";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Users, Target } from "lucide-react";

interface AttritionAnalyticsProps {
  filters: any;
}

export const AttritionAnalytics = ({ filters }: AttritionAnalyticsProps) => {
  const chartData = studentDataService.generateChartData();
  const studentData = studentDataService.generateMockStudentData();
  const metrics = studentDataService.calculateStudentMetrics(studentData);

  const atRiskStudents = [
    { id: 1, name: "Ahmed Al-Hassan", gpa: 2.1, absences: 8, riskLevel: "High" },
    { id: 2, name: "Fatima Al-Zahra", gpa: 2.4, absences: 5, riskLevel: "Medium" },
    { id: 3, name: "Omar Al-Rashid", gpa: 2.3, absences: 6, riskLevel: "High" },
  ];

  // Convert attrition reasons to proper ChartData format
  const attritionReasonsData = chartData.attritionReasons.map(item => ({
    name: item.reason,
    value: item.percentage,
    count: item.count
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Attrition & Retention Analytics</h2>
          <p className="text-slate-600">Student retention insights and risk analysis</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {atRiskStudents.length} At Risk
        </Badge>
      </div>

      <AnalyticsGrid columns={4}>
        <MetricsCard
          title="Attrition Rate"
          value={`${metrics.attritionRate.toFixed(1)}%`}
          change={-2.3}
          changeType="decrease"
          description="Year-over-year improvement"
          icon={TrendingDown}
          className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/60"
        />
        <MetricsCard
          title="Students at Risk"
          value={atRiskStudents.length.toString()}
          change={-15.2}
          changeType="decrease"
          description="Early intervention candidates"
          icon={AlertTriangle}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/60"
        />
        <MetricsCard
          title="Retention Rate"
          value={`${metrics.retentionRate.toFixed(1)}%`}
          change={1.8}
          changeType="increase"
          description="First-year retention"
          icon={Users}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60"
        />
        <MetricsCard
          title="Intervention Success"
          value="87.3%"
          change={5.2}
          changeType="increase"
          description="Students who improved"
          icon={Target}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/60"
        />
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Attrition Reasons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={attritionReasonsData}
              type="pie"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
              Retention by Cohort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={chartData.retentionAnalysis.map(item => ({
                name: item.cohort,
                value: item.year1,
              }))}
              type="bar"
              title=""
            />
          </CardContent>
        </Card>
      </AnalyticsGrid>

      {/* At-Risk Students List */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Students Requiring Immediate Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <h4 className="font-semibold text-orange-900">{student.name}</h4>
                  <p className="text-sm text-orange-700">
                    GPA: {student.gpa} • {student.absences} absences
                  </p>
                </div>
                <Badge 
                  variant={student.riskLevel === 'High' ? 'destructive' : 'secondary'}
                  className="ml-4"
                >
                  {student.riskLevel} Risk
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
