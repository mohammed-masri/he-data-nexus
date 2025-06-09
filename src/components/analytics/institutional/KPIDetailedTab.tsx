
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "../foundation/ChartContainer";
import { KPIPillarData, kpiDataService } from "@/services/kpiDataService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ArrowLeft, Calculator, FileText, TrendingUp } from "lucide-react";

interface KPIDetailedTabProps {
  pillars: KPIPillarData[];
  selectedPillar: string | null;
  onPillarSelect: (pillarId: string | null) => void;
}

export const KPIDetailedTab = ({ pillars, selectedPillar, onPillarSelect }: KPIDetailedTabProps) => {
  const currentPillar = selectedPillar ? pillars.find(p => p.id === selectedPillar) : null;

  if (!currentPillar) {
    return (
      <div className="space-y-6">
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="text-ds-text-primary">Select a Pillar for Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={onPillarSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a KPI pillar to analyze" />
              </SelectTrigger>
              <SelectContent>
                {pillars.map((pillar) => (
                  <SelectItem key={pillar.id} value={pillar.id}>
                    {pillar.name} - {pillar.overallScore}% ({pillar.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }

  const trendData = kpiDataService.generateTrendData(currentPillar.id);
  const metricsData = currentPillar.metrics.map(metric => ({
    name: metric.name.split(' ').slice(0, 2).join(' '),
    current: metric.value,
    target: metric.target || 0,
    threeYear: metric.threeYearAverage || 0,
    fiveYear: metric.fiveYearAverage || 0
  }));

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <Card className="border-ds-border bg-gradient-to-r from-ds-primary to-ds-primary-dark text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPillarSelect(null)}
                className="border-white/30 text-white bg-white/10 hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Overview
              </Button>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {currentPillar.name} - Detailed Analysis
                </CardTitle>
                <p className="text-white/80 mt-1">
                  Deep-dive analytics and performance insights
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentPillar.overallScore}%</div>
              <Badge className={`${kpiDataService.getStatusBadgeColor(currentPillar.status)} text-xs`}>
                {currentPillar.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Performance Trend (5-Year)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--ds-primary))"
                strokeWidth={3}
                dot={{ r: 5, fill: "hsl(var(--ds-primary))" }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Metrics Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={10} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="hsl(var(--ds-primary))" name="Current" />
              <Bar dataKey="target" fill="#94a3b8" name="Target" />
              <Bar dataKey="threeYear" fill="hsl(var(--ds-secondary))" name="3-Year Avg" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Detailed Metrics Table */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <FileText className="w-5 h-5 mr-2" />
            Detailed Metrics Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ds-border">
                  <th className="text-left p-3 text-ds-text-primary font-semibold">Metric</th>
                  <th className="text-right p-3 text-ds-text-primary font-semibold">Current</th>
                  <th className="text-right p-3 text-ds-text-primary font-semibold">Target</th>
                  <th className="text-right p-3 text-ds-text-primary font-semibold">3-Year Avg</th>
                  <th className="text-right p-3 text-ds-text-primary font-semibold">5-Year Avg</th>
                  <th className="text-center p-3 text-ds-text-primary font-semibold">Status</th>
                  <th className="text-center p-3 text-ds-text-primary font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {currentPillar.metrics.map((metric) => (
                  <tr key={metric.id} className="border-b border-ds-border/50 hover:bg-ds-bg-grey-light/30">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-ds-text-primary">{metric.name}</div>
                        <div className="text-sm text-ds-text-muted">{metric.description}</div>
                      </div>
                    </td>
                    <td className="text-right p-3 font-semibold text-ds-primary">
                      {metric.value}{metric.unit}
                    </td>
                    <td className="text-right p-3 text-ds-text-secondary">
                      {metric.target ? `${metric.target}${metric.unit}` : 'N/A'}
                    </td>
                    <td className="text-right p-3 text-ds-text-secondary">
                      {metric.threeYearAverage ? `${metric.threeYearAverage}${metric.unit}` : 'N/A'}
                    </td>
                    <td className="text-right p-3 text-ds-text-secondary">
                      {metric.fiveYearAverage ? `${metric.fiveYearAverage}${metric.unit}` : 'N/A'}
                    </td>
                    <td className="text-center p-3">
                      <Badge className={kpiDataService.getStatusBadgeColor(metric.status)}>
                        {metric.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />}
                      {metric.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 mx-auto transform rotate-180" />}
                      {metric.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-400 mx-auto"></div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Methodology and Calculations */}
      <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <Calculator className="w-5 h-5 mr-2" />
            Calculation Methodology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-ds-border">
              <h4 className="font-semibold text-ds-text-primary mb-2">Overall Score Calculation</h4>
              <p className="text-sm text-ds-text-secondary">
                The overall pillar score is calculated as a weighted average of all metrics within the pillar, 
                considering their target achievement rates and historical performance trends.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-ds-border">
              <h4 className="font-semibold text-ds-text-primary mb-2">Data Sources</h4>
              <ul className="text-sm text-ds-text-secondary space-y-1">
                <li>• Student Information System (SIS)</li>
                <li>• Human Resources Management System</li>
                <li>• Research Management Database</li>
                <li>• Industry Partnership Registry</li>
                <li>• Quality Assurance Records</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg border border-ds-border">
              <h4 className="font-semibold text-ds-text-primary mb-2">Update Frequency</h4>
              <p className="text-sm text-ds-text-secondary">
                Metrics are updated monthly with real-time data feeds where available. 
                Historical averages are recalculated quarterly to ensure accuracy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
