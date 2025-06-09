import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { StatusFilter } from "@/components/filters/StatusFilter";
import { TypeFilter } from "@/components/filters/TypeFilter";
import { FilterChips } from "@/components/filters/FilterChips";
import { 
  Filter, 
  RefreshCw, 
  Download
} from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface DashboardFiltersProps {
  type: "dashboard" | "surveys" | "responses";
  filters: any;
  onFiltersChange: (filters: any) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  className?: string;
}

interface FilterConfig {
  dateRanges: FilterOption[];
  statusOptions: FilterOption[];
  metricTypes?: FilterOption[];
  surveyTypes?: FilterOption[];
  performanceOptions?: FilterOption[];
  demographics?: FilterOption[];
  responseStatus?: FilterOption[];
}

const filterConfigs: Record<string, FilterConfig> = {
  dashboard: {
    dateRanges: [
      { value: "24h", label: "Last 24 hours" },
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "custom", label: "Custom range" }
    ],
    metricTypes: [
      { value: "all", label: "All metrics" },
      { value: "sync", label: "Sync metrics" },
      { value: "api", label: "API metrics" },
      { value: "quality", label: "Quality metrics" },
      { value: "system", label: "System metrics" }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "healthy", label: "Healthy" },
      { value: "warning", label: "Warning" },
      { value: "critical", label: "Critical" }
    ]
  },
  surveys: {
    dateRanges: [
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 3 months" },
      { value: "custom", label: "Custom range" }
    ],
    surveyTypes: [
      { value: "all", label: "All types" },
      { value: "GDS", label: "GDS" },
      { value: "ESS", label: "ESS" },
      { value: "SES", label: "SES" }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "pending", label: "Pending" },
      { value: "active", label: "Active" },
      { value: "distributed", label: "Distributed" },
      { value: "completed", label: "Completed" }
    ],
    performanceOptions: [
      { value: "all", label: "All performance" },
      { value: "high", label: ">90% response rate" },
      { value: "medium", label: ">70% response rate" },
      { value: "low", label: ">50% response rate" }
    ]
  },
  responses: {
    dateRanges: [
      { value: "24h", label: "Last 24 hours" },
      { value: "7d", label: "Last 7 days" },
      { value: "since_distribution", label: "Since distribution" },
      { value: "custom", label: "Custom range" }
    ],
    demographics: [
      { value: "all", label: "All demographics" },
      { value: "students", label: "Students" },
      { value: "faculty", label: "Faculty" },
      { value: "staff", label: "Staff" }
    ],
    responseStatus: [
      { value: "all", label: "All responses" },
      { value: "completed", label: "Completed" },
      { value: "started", label: "Started but not finished" },
      { value: "not_started", label: "Not started" }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "completed", label: "Completed" },
      { value: "pending", label: "Pending" }
    ]
  }
};

export const DashboardFilters = ({ 
  type, 
  filters, 
  onFiltersChange, 
  onRefresh, 
  onExport,
  className = ""
}: DashboardFiltersProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const config = filterConfigs[type];
  
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const handleRefresh = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh();
      setTimeout(() => setRefreshing(false), 1000);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Filter className="w-5 h-5 text-blue-600 hover:scale-110 transition-transform duration-200" />
              </div>
              Filters & Controls
            </div>
            <div className="flex space-x-3">
              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-200"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 text-gray-600 hover:scale-110 transition-transform duration-200 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              )}
              {onExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2 text-gray-600 hover:scale-110 transition-transform duration-200" />
                  Export
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            {/* Date Range Filter */}
            <DateRangeFilter
              value={filters.dateRange}
              onChange={(value) => handleFilterChange("dateRange", value)}
              options={config.dateRanges}
            />

            {/* Type-specific filters */}
            {type === "dashboard" && config.metricTypes && (
              <TypeFilter
                value={filters.metricType}
                onChange={(value) => handleFilterChange("metricType", value)}
                options={config.metricTypes}
                label="Metric Type"
              />
            )}

            {type === "surveys" && config.surveyTypes && (
              <TypeFilter
                value={filters.surveyType}
                onChange={(value) => handleFilterChange("surveyType", value)}
                options={config.surveyTypes}
                label="Survey Type"
              />
            )}

            {type === "surveys" && config.performanceOptions && (
              <TypeFilter
                value={filters.performance}
                onChange={(value) => handleFilterChange("performance", value)}
                options={config.performanceOptions}
                label="Performance"
              />
            )}

            {type === "responses" && config.demographics && (
              <TypeFilter
                value={filters.demographics}
                onChange={(value) => handleFilterChange("demographics", value)}
                options={config.demographics}
                label="Demographics"
              />
            )}

            {type === "responses" && config.responseStatus && (
              <TypeFilter
                value={filters.responseStatus}
                onChange={(value) => handleFilterChange("responseStatus", value)}
                options={config.responseStatus}
                label="Response Status"
              />
            )}

            {/* Status Filter */}
            <StatusFilter
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              options={config.statusOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Chips */}
      <FilterChips
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={clearFilters}
      />
    </div>
  );
};
