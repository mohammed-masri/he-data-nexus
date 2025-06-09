
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, TrendingUp, Zap, RefreshCw, Download, 
  X, Filter, Eye, BarChart3 
} from "lucide-react";

interface ExecutiveFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

const timeRangeOptions = [
  { value: "current-semester", label: "Current Semester", description: "Fall 2024" },
  { value: "academic-year", label: "Academic Year", description: "2024-2025" },
  { value: "comparison", label: "Year over Year", description: "Compare with Fall 2023" },
  { value: "multi-year", label: "Multi-Year Trend", description: "Last 3 years" }
];

const viewPresets = [
  { 
    label: "Executive Summary", 
    filters: { timeRange: "current-semester", view: "summary", comparison: "yoy" },
    description: "High-level KPIs and insights"
  },
  { 
    label: "Board Report View", 
    filters: { timeRange: "academic-year", view: "board", comparison: "yoy" },
    description: "Ready for board presentation"
  },
  { 
    label: "Operational Dashboard", 
    filters: { timeRange: "current-semester", view: "operational", comparison: "none" },
    description: "Current operational metrics"
  }
];

export const ExecutiveFilters = ({ 
  filters, 
  onFiltersChange, 
  onRefresh,
  onExport 
}: ExecutiveFiltersProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(filters.timeRange || "current-semester");

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value);
    onFiltersChange({ ...filters, timeRange: value });
  };

  const handlePresetSelect = (preset: any) => {
    onFiltersChange(preset.filters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'none' && value !== ''
  );

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ds-text-primary">Dashboard View</h3>
            <p className="text-sm text-ds-text-muted">Configure your executive dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          )}
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>
      </div>

      {/* Quick View Presets */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-ds-text-secondary">Quick Views</h4>
        <div className="flex flex-wrap gap-2">
          {viewPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePresetSelect(preset)}
              className="border-ds-border hover:bg-ds-bg-grey-light text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Time Range Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {timeRangeOptions.map((option) => (
          <Card 
            key={option.value}
            className={`border cursor-pointer transition-all duration-200 ${
              selectedTimeRange === option.value 
                ? 'border-ds-primary bg-ds-secondary' 
                : 'border-ds-border hover:border-ds-primary/50'
            }`}
            onClick={() => handleTimeRangeChange(option.value)}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="w-4 h-4 text-ds-primary" />
                <span className="font-medium text-ds-text-primary text-sm">{option.label}</span>
              </div>
              <p className="text-xs text-ds-text-muted">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-ds-text-secondary">Active Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge 
                key={key} 
                variant="outline" 
                className="bg-ds-secondary text-ds-primary border-ds-primary/30 hover:bg-ds-primary/10 transition-colors px-3 py-1"
              >
                <span className="font-medium">{key}:</span>
                <span className="ml-1">{String(value)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 hover:bg-transparent hover:text-red-600 transition-colors"
                  onClick={() => onFiltersChange({ ...filters, [key]: undefined })}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
