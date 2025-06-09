
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface ReportingComponentProps {
  domain: string;
  filters?: any;
}

// Mock data that changes based on filters
const generateMockData = (domain: string, filters: any) => {
  const timeRange = filters?.timeRange || "30d";
  const granularity = filters?.granularity || "day";
  
  // Generate different data points based on time range
  const dataPoints = timeRange === "24h" ? 24 : 
                    timeRange === "7d" ? 7 : 
                    timeRange === "30d" ? 30 : 12;
  
  return Array.from({ length: dataPoints }, (_, i) => ({
    name: granularity === "hour" ? `${i}:00` :
          granularity === "day" ? `Day ${i + 1}` :
          granularity === "week" ? `Week ${i + 1}` :
          granularity === "month" ? `Month ${i + 1}` : `Period ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 100,
    comparison: Math.floor(Math.random() * 800) + 50,
  }));
};

export const ReportingComponent = ({ domain, filters }: ReportingComponentProps) => {
  const chartData = generateMockData(domain, filters);
  
  const getDomainMetrics = () => {
    switch (domain) {
      case "applicants-academic":
        return {
          title: "Academic Proficiency Analytics",
          metrics: [
            { title: "Average Score", value: "87.3%", change: 5.2, changeType: "increase" as const },
            { title: "Pass Rate", value: "94.1%", change: 2.1, changeType: "increase" as const },
            { title: "Top Performers", value: "156", change: -3.2, changeType: "decrease" as const }
          ]
        };
      case "students-enrollment":
        return {
          title: "Student Enrollment Analytics",
          metrics: [
            { title: "Total Enrolled", value: "2,847", change: 8.5, changeType: "increase" as const },
            { title: "Retention Rate", value: "91.7%", change: 1.3, changeType: "increase" as const },
            { title: "Completion Rate", value: "88.9%", change: -1.1, changeType: "decrease" as const }
          ]
        };
      default:
        return {
          title: "General Analytics",
          metrics: [
            { title: "Total Records", value: "1,234", change: 4.5, changeType: "increase" as const },
            { title: "Processing Rate", value: "98.7%", change: 0.8, changeType: "increase" as const },
            { title: "Quality Score", value: "95.2%", change: -0.3, changeType: "decrease" as const }
          ]
        };
    }
  };

  const { title, metrics } = getDomainMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ds-text-primary">{title}</h2>
        <div className="text-sm text-ds-text-muted">
          Filtered by: {filters?.timeRange || "30d"} | {filters?.granularity || "day"}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <AnalyticsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            description={`Based on ${filters?.timeRange || "30d"} data`}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-ds-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-ds-text-primary mb-4">Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} />
              {filters?.comparison !== "none" && (
                <Line type="monotone" dataKey="comparison" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-ds-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-ds-text-primary mb-4">Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
