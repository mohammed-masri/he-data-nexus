
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  value: string;
  options: { value: string; label: string; }[];
}

interface FilterPanelProps {
  filters: Record<string, string>;
  filterOptions: FilterOption[];
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export const FilterPanel = ({ 
  filters, 
  filterOptions, 
  onFilterChange, 
  onClearFilters,
  className = ""
}: FilterPanelProps) => {
  const activeFilterCount = Object.values(filters).filter(value => value !== "all").length;

  return (
    <Card className={`border-ds-border ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-ds-text-primary flex items-center">
          <Filter className="w-5 h-5 mr-2 text-ds-primary" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-ds-secondary text-ds-primary">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filterOptions.map((filter) => (
            <div key={filter.key} className="space-y-2">
              <label className="text-sm font-medium text-ds-text-secondary">{filter.label}</label>
              <select
                value={filters[filter.key] || "all"}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className="w-full p-2 border border-ds-border rounded-lg text-sm focus:ring-2 focus:ring-ds-primary focus:border-ds-primary"
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
