
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { KPIPillarData, kpiDataService } from "@/services/kpiDataService";
import { TrendingUp, TrendingDown, Minus, Eye, BarChart3 } from "lucide-react";

interface KPIPillarCardProps {
  pillar: KPIPillarData;
  onViewDetails: (pillarId: string) => void;
  className?: string;
}

export const KPIPillarCard = ({ pillar, onViewDetails, className = "" }: KPIPillarCardProps) => {
  const getTrendIcon = () => {
    switch (pillar.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = () => {
    switch (pillar.status) {
      case 'exceeds-target':
        return "🎯";
      case 'on-track':
        return "✅";
      case 'needs-attention':
        return "⚠️";
      default:
        return "📊";
    }
  };

  const topMetrics = pillar.metrics.slice(0, 3);

  return (
    <Card className={`border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getStatusIcon()}</div>
            <div>
              <CardTitle className="text-lg font-bold text-ds-text-primary group-hover:text-ds-primary transition-colors">
                {pillar.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={kpiDataService.getStatusBadgeColor(pillar.status)}>
                  {pillar.status.replace('-', ' ')}
                </Badge>
                {getTrendIcon()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-ds-primary">{pillar.overallScore}</div>
            <div className="text-xs text-ds-text-muted">Overall Score</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ds-text-secondary">Performance</span>
            <span className="text-ds-text-primary font-medium">{pillar.overallScore}%</span>
          </div>
          <Progress value={pillar.overallScore} className="h-2" />
        </div>

        {/* Top Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-ds-text-primary">Key Metrics</h4>
          {topMetrics.map((metric) => (
            <div key={metric.id} className="flex justify-between items-center py-1">
              <div className="flex-1">
                <div className="text-sm font-medium text-ds-text-primary">{metric.name}</div>
                <div className="text-xs text-ds-text-muted">{metric.description}</div>
              </div>
              <div className="text-right ml-2">
                <div className="text-sm font-bold text-ds-primary">
                  {metric.value}{metric.unit}
                </div>
                {metric.target && (
                  <div className="text-xs text-ds-text-muted">
                    Target: {metric.target}{metric.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(pillar.id)}
            className="flex-1 border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-ds-text-muted text-center pt-2 border-t border-ds-border/50">
          Last updated: {new Date(pillar.lastUpdated).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};
