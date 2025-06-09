
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
  children?: React.ReactNode;
  actions?: boolean;
  onExport?: () => void;
  onRefresh?: () => void;
}

export const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  description, 
  children,
  actions = false,
  onExport,
  onRefresh
}: AnalyticsCardProps) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600 bg-green-50 border-green-200";
      case "decrease":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light/30 hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-ds-text-secondary">{title}</CardTitle>
        {actions && (
          <div className="flex space-x-1">
            {onRefresh && (
              <Button variant="ghost" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            {onExport && (
              <Button variant="ghost" size="sm" onClick={onExport}>
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-ds-text-primary">{value}</div>
            {change !== undefined && (
              <Badge variant="outline" className={`${getTrendColor()} flex items-center space-x-1`}>
                {getTrendIcon()}
                <span className="text-xs font-medium">
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-ds-text-muted">{description}</p>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
