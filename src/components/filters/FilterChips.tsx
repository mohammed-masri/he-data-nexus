
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterChipsProps {
  filters: Record<string, any>;
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export const FilterChips = ({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) => {
  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'all' && value !== ''
  );

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
      <span className="text-sm font-medium text-gray-600">Active filters:</span>
      {activeFilters.map(([key, value]) => (
        <Badge 
          key={key} 
          variant="outline" 
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 px-3 py-1.5 shadow-sm"
        >
          <span className="font-medium text-gray-900">{key}:</span>
          <span className="ml-1">{String(value)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-auto p-0 hover:bg-transparent hover:text-red-600 transition-colors duration-200"
            onClick={() => onRemoveFilter(key)}
          >
            <X className="w-3 h-3 hover:scale-110 transition-transform duration-200" />
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 px-3 py-1.5 rounded-lg"
      >
        Clear all
      </Button>
    </div>
  );
};
