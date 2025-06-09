
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  description,
  icon: Icon,
  className = ""
}: MetricsCardProps) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-ds-primary" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-status-error-600" />;
      default:
        return <Minus className="w-4 h-4 text-ds-text-secondary" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-ds-primary bg-ds-secondary border-ds-primary/20";
      case "decrease":
        return "text-status-error-600 bg-status-error-50 border-status-error-200";
      default:
        return "text-ds-text-secondary bg-ds-bg-grey border-ds-border";
    }
  };

  return (
    <Card className={`border-ds-border hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-ds-text-secondary">{title}</CardTitle>
        {Icon && (
          <div className="p-2 bg-ds-secondary rounded-lg">
            <Icon className="w-5 h-5 text-ds-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-ds-text-primary">{value}</div>
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
            <p className="text-sm text-ds-text-muted">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
