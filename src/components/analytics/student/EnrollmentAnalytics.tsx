
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "../foundation/DataVisualization";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { studentDataService } from "@/services/studentDataService";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, MapPin, GraduationCap } from "lucide-react";

interface EnrollmentAnalyticsProps {
  filters: any;
}

export const EnrollmentAnalytics = ({ filters }: EnrollmentAnalyticsProps) => {
  const chartData = studentDataService.generateChartData();
  const studentData = studentDataService.generateMockStudentData();
  const metrics = studentDataService.calculateStudentMetrics(studentData);

  const levelData = Object.entries(metrics.academicMetrics.levelDistribution).map(([level, count]) => ({
    name: level,
    value: count,
  }));

  const nationalityData = Object.entries(metrics.diversityMetrics.nationalityDistribution)
    .slice(0, 5)
    .map(([nationality, count]) => ({
      name: nationality,
      value: count,
    }));

  // Convert enrollment trends to proper ChartData format
  const enrollmentTrends = chartData.enrollmentTrends.map(item => ({
    name: item.period,
    value: item.enrollment,
    graduates: item.graduates,
    attrition: item.attrition
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Enrollment Analytics</h2>
          <p className="text-slate-600">Comprehensive enrollment trends and demographics</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <TrendingUp className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
      </div>

      <AnalyticsGrid columns={3}>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Enrollment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={enrollmentTrends}
              type="line"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
              Student Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={levelData}
              type="pie"
              title=""
            />
          </CardContent>
        </Card>
      </AnalyticsGrid>

      <AnalyticsGrid columns={2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Top Nationalities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              data={nationalityData}
              type="bar"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Male</span>
                <span className="text-sm text-slate-600">{metrics.diversityMetrics.genderDistribution.male}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(metrics.diversityMetrics.genderDistribution.male / 
                      (metrics.diversityMetrics.genderDistribution.male + metrics.diversityMetrics.genderDistribution.female)) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Female</span>
                <span className="text-sm text-slate-600">{metrics.diversityMetrics.genderDistribution.female}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-pink-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(metrics.diversityMetrics.genderDistribution.female / 
                      (metrics.diversityMetrics.genderDistribution.male + metrics.diversityMetrics.genderDistribution.female)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnalyticsGrid>
    </div>
  );
};
