
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { StatusFilter } from "@/components/filters/StatusFilter";
import { TypeFilter } from "@/components/filters/TypeFilter";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface CompactFiltersProps {
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

export const CompactFilters = ({ 
  type, 
  filters, 
  onFiltersChange, 
  className = ""
}: CompactFiltersProps) => {
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

  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'all' && value !== ''
  );

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm ${className}`}>
      <div className="flex flex-wrap items-center gap-2 justify-end">
        {/* Main Filters */}
        <DateRangeFilter
          value={filters.dateRange}
          onChange={(value) => handleFilterChange("dateRange", value)}
          options={config.dateRanges}
        />

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

        <StatusFilter
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          options={config.statusOptions}
        />

        {/* Separator */}
        {activeFilters.length > 0 && (
          <div className="w-px h-6 bg-gray-300 mx-1" />
        )}

        {/* Active Filter Chips */}
        {activeFilters.map(([key, value]) => (
          <Badge 
            key={key} 
            variant="outline" 
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors px-2 py-1 text-xs"
          >
            <span className="font-medium">{key}:</span>
            <span className="ml-1">{String(value)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-1 h-auto p-0 hover:bg-transparent hover:text-red-600 transition-colors"
              onClick={() => handleRemoveFilter(key)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}

        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors px-2 py-1 text-xs h-7"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};
