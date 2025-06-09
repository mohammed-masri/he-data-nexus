
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, Info, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface EnhancedMetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
  insight?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  onViewDetails?: () => void;
  loading?: boolean;
}

export const EnhancedMetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  description,
  insight,
  icon: Icon,
  className = "",
  onViewDetails,
  loading = false
}: EnhancedMetricsCardProps) => {
  const [showInsight, setShowInsight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-ds-text-secondary" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "decrease":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-ds-text-secondary bg-ds-bg-grey border-ds-border";
    }
  };

  if (loading) {
    return (
      <Card className={`border-ds-border animate-pulse shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-4 bg-ds-bg-grey-light rounded-lg w-3/4"></div>
            <div className="h-10 bg-ds-bg-grey-light rounded-lg w-1/2"></div>
            <div className="h-3 bg-ds-bg-grey-light rounded-lg w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`border-0 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer backdrop-blur-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          <CardTitle className="text-sm font-semibold text-ds-text-secondary group-hover:text-ds-primary transition-colors duration-300">
            {title}
          </CardTitle>
          {insight && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-ds-primary/10 rounded-full transition-all duration-300"
              onClick={() => setShowInsight(!showInsight)}
            >
              <Info className="w-3 h-3 text-ds-text-muted hover:text-ds-primary transition-colors" />
            </Button>
          )}
        </div>
        {Icon && (
          <div className={`p-3 bg-gradient-to-br from-ds-secondary/20 to-ds-bg-grey-light rounded-xl shadow-lg group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            <Icon className="w-6 h-6 text-ds-primary group-hover:text-white transition-colors duration-300" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-ds-text-primary group-hover:text-ds-primary transition-colors duration-300 flex items-center">
              {value}
              {isHovered && (
                <Sparkles className="w-6 h-6 ml-2 text-ds-primary animate-pulse" />
              )}
            </div>
            {change !== undefined && (
              <Badge variant="outline" className={`${getTrendColor()} flex items-center space-x-2 text-xs font-semibold px-3 py-1 shadow-sm`}>
                {getTrendIcon()}
                <span>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </Badge>
            )}
          </div>
          {onViewDetails && (
            <Button
              variant="ghost"
              size="sm"
              className={`opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ds-primary hover:text-white rounded-full ${isHovered ? 'scale-110' : ''}`}
              onClick={onViewDetails}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-ds-text-muted leading-relaxed group-hover:text-ds-text-secondary transition-colors duration-300">
            {description}
          </p>
        )}
        
        {showInsight && insight && (
          <div className="p-4 bg-gradient-to-r from-ds-secondary/20 via-ds-primary/10 to-transparent rounded-xl border border-ds-border animate-fade-in shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-ds-primary rounded-full">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-ds-primary mb-1">AI Insight</p>
                <p className="text-xs text-ds-text-primary font-medium leading-relaxed">{insight}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
