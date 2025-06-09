
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  RefreshCw, 
  Download,
  X,
  Filter,
  Search,
  Calendar,
  Tag,
  Sliders,
  RotateCcw,
  BookmarkPlus
} from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface EnhancedFiltersProps {
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
      { value: "24h", label: "Last 24 hours", count: 1247 },
      { value: "7d", label: "Last 7 days", count: 8934 },
      { value: "30d", label: "Last 30 days", count: 35678 },
      { value: "custom", label: "Custom range" }
    ],
    metricTypes: [
      { value: "all", label: "All metrics", count: 24 },
      { value: "sync", label: "Sync metrics", count: 8 },
      { value: "api", label: "API metrics", count: 6 },
      { value: "quality", label: "Quality metrics", count: 5 },
      { value: "system", label: "System metrics", count: 5 }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "healthy", label: "Healthy", count: 18 },
      { value: "warning", label: "Warning", count: 4 },
      { value: "critical", label: "Critical", count: 2 }
    ]
  },
  surveys: {
    dateRanges: [
      { value: "7d", label: "Last 7 days", count: 12 },
      { value: "30d", label: "Last 30 days", count: 45 },
      { value: "90d", label: "Last 3 months", count: 128 },
      { value: "custom", label: "Custom range" }
    ],
    surveyTypes: [
      { value: "all", label: "All types", count: 45 },
      { value: "GDS", label: "GDS", count: 18 },
      { value: "ESS", label: "ESS", count: 15 },
      { value: "SES", label: "SES", count: 12 }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "pending", label: "Pending", count: 8 },
      { value: "active", label: "Active", count: 12 },
      { value: "distributed", label: "Distributed", count: 15 },
      { value: "completed", label: "Completed", count: 10 }
    ],
    performanceOptions: [
      { value: "all", label: "All performance" },
      { value: "high", label: ">90% response rate", count: 8 },
      { value: "medium", label: ">70% response rate", count: 12 },
      { value: "low", label: ">50% response rate", count: 5 }
    ]
  },
  responses: {
    dateRanges: [
      { value: "24h", label: "Last 24 hours", count: 156 },
      { value: "7d", label: "Last 7 days", count: 892 },
      { value: "since_distribution", label: "Since distribution", count: 1247 },
      { value: "custom", label: "Custom range" }
    ],
    demographics: [
      { value: "all", label: "All demographics" },
      { value: "students", label: "Students", count: 2850 },
      { value: "faculty", label: "Faculty", count: 186 },
      { value: "staff", label: "Staff", count: 342 }
    ],
    responseStatus: [
      { value: "all", label: "All responses" },
      { value: "completed", label: "Completed", count: 1247 },
      { value: "started", label: "Started but not finished", count: 234 },
      { value: "not_started", label: "Not started", count: 1897 }
    ],
    statusOptions: [
      { value: "all", label: "All status" },
      { value: "completed", label: "Completed", count: 1247 },
      { value: "pending", label: "Pending", count: 2131 }
    ]
  }
};

const quickPresets = {
  dashboard: [
    { name: "Today's Overview", filters: { dateRange: "24h", status: "all" } },
    { name: "Weekly Report", filters: { dateRange: "7d", metricType: "all" } },
    { name: "Critical Issues", filters: { status: "critical", dateRange: "7d" } }
  ],
  surveys: [
    { name: "Active Surveys", filters: { status: "active", dateRange: "30d" } },
    { name: "High Performance", filters: { performance: "high", dateRange: "90d" } },
    { name: "Recent GDS", filters: { surveyType: "GDS", dateRange: "30d" } }
  ],
  responses: [
    { name: "Recent Responses", filters: { dateRange: "24h", responseStatus: "completed" } },
    { name: "Pending Responses", filters: { responseStatus: "not_started", dateRange: "7d" } },
    { name: "Student Responses", filters: { demographics: "students", dateRange: "since_distribution" } }
  ]
};

const FilterDropdown = ({ 
  label, 
  value, 
  options, 
  onChange, 
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  options: FilterOption[]; 
  onChange: (value: string) => void;
  icon: any;
}) => {
  const selectedOption = options.find(opt => opt.value === value);
  const hasSelection = value && value !== 'all' && value !== '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`
            h-9 px-4 text-sm font-medium transition-all duration-200 
            border-2 rounded-xl shadow-sm hover:shadow-md
            ${hasSelection 
              ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100' 
              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
            }
          `}
        >
          <Icon className="w-4 h-4 mr-2" />
          {selectedOption?.label || label}
          {selectedOption?.count && (
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {selectedOption.count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 bg-white border-2 border-gray-100 shadow-xl rounded-xl">
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {label}
          </div>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-150
                flex items-center justify-between group
                ${value === option.value 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <span>{option.label}</span>
              {option.count && (
                <Badge 
                  variant="secondary" 
                  className={`
                    h-5 px-2 text-xs transition-colors
                    ${value === option.value 
                      ? 'bg-blue-200 text-blue-700' 
                      : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                    }
                  `}
                >
                  {option.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const EnhancedFilters = ({ 
  type, 
  filters, 
  onFiltersChange, 
  onRefresh, 
  onExport,
  className = ""
}: EnhancedFiltersProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const config = filterConfigs[type];
  const presets = quickPresets[type];
  
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
    setSearchQuery("");
  };

  const applyPreset = (presetFilters: any) => {
    onFiltersChange(presetFilters);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh();
      setTimeout(() => setRefreshing(false), 1200);
    }
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'all' && value !== ''
  );

  return (
    <div className={`bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
            <p className="text-sm text-gray-500">Refine your view with advanced filtering</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-9 px-4 border-2 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="h-9 px-4 border-2 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search or filter by keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200"
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <BookmarkPlus className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Quick Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.filters)}
              className="h-8 px-3 text-xs border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="Date Range"
            value={filters.dateRange}
            options={config.dateRanges}
            onChange={(value) => handleFilterChange("dateRange", value)}
            icon={Calendar}
          />

          {type === "dashboard" && config.metricTypes && (
            <FilterDropdown
              label="Metric Type"
              value={filters.metricType}
              options={config.metricTypes}
              onChange={(value) => handleFilterChange("metricType", value)}
              icon={Tag}
            />
          )}

          {type === "surveys" && config.surveyTypes && (
            <FilterDropdown
              label="Survey Type"
              value={filters.surveyType}
              options={config.surveyTypes}
              onChange={(value) => handleFilterChange("surveyType", value)}
              icon={Tag}
            />
          )}

          {type === "surveys" && config.performanceOptions && (
            <FilterDropdown
              label="Performance"
              value={filters.performance}
              options={config.performanceOptions}
              onChange={(value) => handleFilterChange("performance", value)}
              icon={Sliders}
            />
          )}

          {type === "responses" && config.demographics && (
            <FilterDropdown
              label="Demographics"
              value={filters.demographics}
              options={config.demographics}
              onChange={(value) => handleFilterChange("demographics", value)}
              icon={Tag}
            />
          )}

          {type === "responses" && config.responseStatus && (
            <FilterDropdown
              label="Response Status"
              value={filters.responseStatus}
              options={config.responseStatus}
              onChange={(value) => handleFilterChange("responseStatus", value)}
              icon={Tag}
            />
          )}

          <FilterDropdown
            label="Status"
            value={filters.status}
            options={config.statusOptions}
            onChange={(value) => handleFilterChange("status", value)}
            icon={Tag}
          />
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Active Filters ({activeFilters.length})</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge 
                  key={key} 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-all duration-200 px-3 py-1.5 text-xs rounded-lg shadow-sm"
                >
                  <span className="font-semibold">{key}:</span>
                  <span className="ml-1.5">{String(value)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0 hover:bg-transparent hover:text-red-600 transition-colors duration-200"
                    onClick={() => handleRemoveFilter(key)}
                  >
                    <X className="w-3 h-3 hover:scale-110 transition-transform duration-200" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
