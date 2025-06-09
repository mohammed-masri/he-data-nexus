
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface DataVisualizationProps {
  data: ChartData[];
  type: "bar" | "line" | "pie";
  title: string;
  className?: string;
}

// Digital Sharjah color palette
const COLORS = ['#338546', '#1E6435', '#5CA16E', '#91C49F', '#BBE0C6', '#83B891', '#4E9A59'];

export const DataVisualization = ({ 
  data, 
  type, 
  title, 
  className = "" 
}: DataVisualizationProps) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-ds-border" />
              <XAxis dataKey="name" className="text-ds-text-secondary" />
              <YAxis className="text-ds-text-secondary" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#338546" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-ds-border" />
              <XAxis dataKey="name" className="text-ds-text-secondary" />
              <YAxis className="text-ds-text-secondary" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#338546" 
                strokeWidth={3}
                dot={{ fill: "#338546", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#338546"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="h-64 flex items-center justify-center text-ds-text-muted">Chart type not supported</div>;
    }
  };

  return (
    <ChartContainer 
      title={title} 
      className={className}
      config={{
        value: {
          label: "Value",
          color: "#338546"
        }
      }}
    >
      {renderChart()}
    </ChartContainer>
  );
};
