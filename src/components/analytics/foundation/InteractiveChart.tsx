
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, RefreshCw, TrendingUp, Info } from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface InteractiveChartProps {
  title: string;
  data: ChartData[];
  type: "line" | "bar" | "pie";
  loading?: boolean;
  insight?: string;
  className?: string;
  height?: number;
  onExport?: () => void;
  onRefresh?: () => void;
}

// Digital Sharjah color palette for pie charts
const COLORS = ['#338546', '#1E6435', '#5CA16E', '#91C49F', '#BBE0C6', '#83B891', '#4E9A59'];

export const InteractiveChart = ({
  title,
  data,
  type,
  loading = false,
  insight,
  className = "",
  height = 280,
  onExport,
  onRefresh
}: InteractiveChartProps) => {
  if (loading) {
    return (
      <Card className={`border-ds-border shadow-lg animate-fade-in ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-ds-text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    const chartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    if (type === "line") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-ds-border opacity-20" />
            <XAxis 
              dataKey="name" 
              className="text-ds-text-secondary text-xs"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              className="text-ds-text-secondary text-xs"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                fontSize: '14px',
                padding: '12px'
              }}
              cursor={{ stroke: 'var(--ds-primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--ds-primary)"
              strokeWidth={3}
              dot={{ 
                fill: "var(--ds-primary)", 
                strokeWidth: 3, 
                r: 6,
                className: "drop-shadow-md"
              }}
              activeDot={{ 
                r: 8, 
                fill: "var(--ds-primary-dark)",
                stroke: 'white',
                strokeWidth: 3,
                className: "drop-shadow-lg animate-pulse"
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-ds-border opacity-20" />
            <XAxis 
              dataKey="name" 
              className="text-ds-text-secondary text-xs"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              className="text-ds-text-secondary text-xs"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                padding: '12px'
              }}
              cursor={{ fill: 'rgba(51, 133, 70, 0.1)' }}
            />
            <Bar 
              dataKey="value" 
              fill="var(--ds-primary)"
              radius={[6, 6, 0, 0]}
              className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={Math.min(height * 0.35, 120)}
              innerRadius={Math.min(height * 0.15, 50)}
              fill="var(--ds-primary)"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                padding: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return <div className="h-64 flex items-center justify-center text-ds-text-muted">Chart type not supported</div>;
  };

  return (
    <Card className={`border-ds-border bg-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="space-y-2 flex-1">
          <CardTitle className="text-lg font-semibold text-ds-text-primary group-hover:text-ds-primary-dark transition-colors duration-200">
            {title}
          </CardTitle>
          {insight && (
            <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">{insight}</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live
          </Badge>
          {onRefresh && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRefresh}
              className="hover:bg-ds-secondary transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
          {onExport && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onExport}
              className="hover:bg-ds-secondary transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="transition-all duration-300 group-hover:scale-[1.01]">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};
