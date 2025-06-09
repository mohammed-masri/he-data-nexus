
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { MetricsCard } from "../foundation/MetricsCard";
import { studentDataService } from "@/services/studentDataService";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Award, TrendingUp, Users } from "lucide-react";

interface ScholarshipAnalyticsProps {
  filters: any;
}

export const ScholarshipAnalytics = ({ filters }: ScholarshipAnalyticsProps) => {
  const studentData = studentDataService.generateMockStudentData();
  const metrics = studentDataService.calculateStudentMetrics(studentData);

  const scholarshipTypeData = Object.entries(metrics.financialMetrics.scholarshipDistribution).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const performanceData = [
    { name: "Scholarship Recipients", avgGpa: 3.7, graduationRate: 94 },
    { name: "Non-Recipients", avgGpa: 3.2, graduationRate: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Scholarship Analytics</h2>
          <p className="text-slate-600">Financial aid distribution and impact analysis</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-800">
          <Award className="w-3 h-3 mr-1" />
          {metrics.scholarshipRecipients} Recipients
        </Badge>
      </div>

      <AnalyticsGrid columns={4}>
        <MetricsCard
          title="Total Recipients"
          value={metrics.scholarshipRecipients.toString()}
          change={12.5}
          changeType="increase"
          description="Active scholarship holders"
          icon={Users}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60"
        />
        <MetricsCard
          title="Total Value"
          value={`$${(metrics.financialMetrics.totalScholarshipValue / 1000000).toFixed(1)}M`}
          change={8.3}
          changeType="increase"
          description="Annual scholarship value"
          icon={DollarSign}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/60"
        />
        <MetricsCard
          title="Average Amount"
          value={`$${Math.round(metrics.financialMetrics.averageScholarshipAmount).toLocaleString()}`}
          change={3.7}
          changeType="increase"
          description="Per recipient average"
          icon={Award}
          className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/60"
        />
        <MetricsCard
          title="Impact Score"
          value="94.2%"
          change={5.1}
          changeType="increase"
          description="Recipient success rate"
          icon={TrendingUp}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/60"
        />
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-emerald-600" />
              Scholarship Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={scholarshipTypeData}
              type="pie"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceData.map((group, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-slate-900">{group.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Average GPA</p>
                      <p className="text-2xl font-bold text-blue-600">{group.avgGpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Graduation Rate</p>
                      <p className="text-2xl font-bold text-emerald-600">{group.graduationRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnalyticsGrid>

      {/* Scholarship Impact Analysis */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Scholarship Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-700">94.2%</div>
              <p className="text-sm text-emerald-600">Recipients graduate on time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">3.7</div>
              <p className="text-sm text-blue-600">Average GPA of recipients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">87%</div>
              <p className="text-sm text-purple-600">Find employment within 6 months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
