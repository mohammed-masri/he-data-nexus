
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, TrendingUp, BarChart3, Filter, 
  Zap, RefreshCw, Download, X, ChevronDown 
} from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  description?: string;
}

interface AnalyticsFiltersProps {
  domain: string;
  feature: string;
  filters: any;
  onFiltersChange: (filters: any) => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

const timeRangeOptions: FilterOption[] = [
  { value: "realtime", label: "Real-time", description: "Live data updates" },
  { value: "1h", label: "Last Hour", description: "Past 60 minutes" },
  { value: "24h", label: "Last 24 Hours", description: "Yesterday to now" },
  { value: "7d", label: "Last 7 Days", description: "Past week" },
  { value: "30d", label: "Last 30 Days", description: "Past month" },
  { value: "90d", label: "Last 3 Months", description: "Past quarter" },
  { value: "1y", label: "Last Year", description: "Past 12 months" },
  { value: "custom", label: "Custom Range", description: "Select specific dates" }
];

const granularityOptions: FilterOption[] = [
  { value: "minute", label: "Minute", description: "Minute-by-minute" },
  { value: "hour", label: "Hourly", description: "Hour-by-hour" },
  { value: "day", label: "Daily", description: "Day-by-day" },
  { value: "week", label: "Weekly", description: "Week-by-week" },
  { value: "month", label: "Monthly", description: "Month-by-month" },
  { value: "quarter", label: "Quarterly", description: "Quarter-by-quarter" }
];

const comparisonOptions: FilterOption[] = [
  { value: "none", label: "No Comparison", description: "Current period only" },
  { value: "previous", label: "Previous Period", description: "Compare to previous" },
  { value: "yoy", label: "Year over Year", description: "Compare to last year" },
  { value: "mom", label: "Month over Month", description: "Compare to last month" }
];

const metricGroupOptions: { [key: string]: FilterOption[] } = {
  "applicants-academic": [
    { value: "performance", label: "Academic Performance", description: "Scores and assessments" },
    { value: "proficiency", label: "Proficiency Levels", description: "Skill assessments" },
    { value: "progress", label: "Learning Progress", description: "Growth metrics" }
  ],
  "applicants-basic": [
    { value: "demographics", label: "Demographics", description: "Basic statistics" },
    { value: "applications", label: "Application Metrics", description: "Application data" },
    { value: "conversion", label: "Conversion Rates", description: "Success rates" }
  ],
  "students-enrollment": [
    { value: "enrollment", label: "Enrollment Stats", description: "Registration data" },
    { value: "retention", label: "Retention Rates", description: "Student retention" },
    { value: "completion", label: "Completion Rates", description: "Course completion" }
  ],
  "default": [
    { value: "overview", label: "Overview", description: "General metrics" },
    { value: "performance", label: "Performance", description: "Key performance indicators" },
    { value: "trends", label: "Trends", description: "Trending patterns" }
  ]
};

const FilterCard = ({ 
  title, 
  icon: Icon, 
  options, 
  selectedValue, 
  onSelect, 
  description 
}: {
  title: string;
  icon: any;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  description?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <Card className="border-ds-border hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-ds-primary/10 rounded-lg">
              <Icon className="w-4 h-4 text-ds-primary" />
            </div>
            <span className="font-medium text-ds-text-primary text-sm">{title}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {selectedOption && (
          <div className="mb-3">
            <Badge variant="outline" className="bg-ds-secondary text-ds-primary border-ds-primary/30">
              {selectedOption.label}
            </Badge>
            {selectedOption.description && (
              <p className="text-xs text-ds-text-muted mt-1">{selectedOption.description}</p>
            )}
          </div>
        )}

        {isExpanded && (
          <div className="space-y-2 pt-2 border-t border-ds-border">
            {options.map((option) => (
              <Button
                key={option.value}
                variant={selectedValue === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onSelect(option.value)}
                className="w-full justify-start text-left h-auto p-2"
              >
                <div>
                  <div className="font-medium text-xs">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-ds-text-muted">{option.description}</div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const AnalyticsFilters = ({ 
  domain, 
  feature, 
  filters, 
  onFiltersChange, 
  onRefresh,
  onExport 
}: AnalyticsFiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const currentMetricOptions = metricGroupOptions[domain] || metricGroupOptions.default;
  
  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'none' && value !== ''
  );

  const quickPresets = [
    { label: "Last 30 Days Performance", filters: { timeRange: "30d", metrics: "performance", granularity: "day" } },
    { label: "Real-time Overview", filters: { timeRange: "realtime", metrics: "overview", granularity: "minute" } },
    { label: "Monthly Trends", filters: { timeRange: "90d", metrics: "trends", granularity: "month", comparison: "mom" } }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ds-text-primary">Analytics Filters</h3>
            <p className="text-sm text-ds-text-muted">Configure your analytics view</p>
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
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-ds-text-secondary">Quick Presets</h4>
        <div className="flex flex-wrap gap-2">
          {quickPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onFiltersChange(preset.filters)}
              className="border-ds-border hover:bg-ds-bg-grey-light text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Filter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterCard
          title="Time Range"
          icon={Calendar}
          options={timeRangeOptions}
          selectedValue={filters.timeRange || "30d"}
          onSelect={(value) => handleFilterChange("timeRange", value)}
        />
        
        <FilterCard
          title="Granularity"
          icon={Clock}
          options={granularityOptions}
          selectedValue={filters.granularity || "day"}
          onSelect={(value) => handleFilterChange("granularity", value)}
        />
        
        <FilterCard
          title="Comparison"
          icon={TrendingUp}
          options={comparisonOptions}
          selectedValue={filters.comparison || "none"}
          onSelect={(value) => handleFilterChange("comparison", value)}
        />
        
        <FilterCard
          title="Metrics"
          icon={BarChart3}
          options={currentMetricOptions}
          selectedValue={filters.metrics || "overview"}
          onSelect={(value) => handleFilterChange("metrics", value)}
        />
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-ds-text-secondary">Active Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
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
                  onClick={() => handleRemoveFilter(key)}
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
