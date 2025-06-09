import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Download, Search } from "lucide-react";

interface LogFiltersProps {
  type: 'api' | 'activity';
  filters: any;
  onFiltersChange: (filters: any) => void;
  onExport: () => void;
}

export function LogFilters({ type, filters, onFiltersChange, onExport }: LogFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-ds-border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ds-text-primary">Filters</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="border-ds-border"
          >
            Clear All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="border-ds-border"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xs text-ds-text-secondary">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-ds-text-muted" />
            <Input
              id="search"
              placeholder="Search logs..."
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-8 h-9 border-ds-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFrom" className="text-xs text-ds-text-secondary">From Date</Label>
          <Input
            id="dateFrom"
            type="datetime-local"
            value={filters.dateFrom || ''}
            onChange={(e) => updateFilter('dateFrom', e.target.value)}
            className="h-9 border-ds-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateTo" className="text-xs text-ds-text-secondary">To Date</Label>
          <Input
            id="dateTo"
            type="datetime-local"
            value={filters.dateTo || ''}
            onChange={(e) => updateFilter('dateTo', e.target.value)}
            className="h-9 border-ds-border"
          />
        </div>

        {type === 'api' ? (
          <>
            <div className="space-y-2">
              <Label className="text-xs text-ds-text-secondary">Status Code</Label>
              <Select 
                value={filters.statusCode || ''} 
                onValueChange={(value) => updateFilter('statusCode', value)}
              >
                <SelectTrigger className="h-9 border-ds-border">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2xx">2xx Success</SelectItem>
                  <SelectItem value="4xx">4xx Client Error</SelectItem>
                  <SelectItem value="5xx">5xx Server Error</SelectItem>
                  <SelectItem value="200">200 OK</SelectItem>
                  <SelectItem value="400">400 Bad Request</SelectItem>
                  <SelectItem value="401">401 Unauthorized</SelectItem>
                  <SelectItem value="500">500 Internal Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-ds-text-secondary">Method</Label>
              <Select 
                value={filters.method || ''} 
                onValueChange={(value) => updateFilter('method', value)}
              >
                <SelectTrigger className="h-9 border-ds-border">
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label className="text-xs text-ds-text-secondary">Action Type</Label>
              <Select 
                value={filters.action || ''} 
                onValueChange={(value) => updateFilter('action', value)}
              >
                <SelectTrigger className="h-9 border-ds-border">
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="token_create">Token Created</SelectItem>
                  <SelectItem value="survey_create">Survey Created</SelectItem>
                  <SelectItem value="data_submit">Data Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user" className="text-xs text-ds-text-secondary">User</Label>
              <Input
                id="user"
                placeholder="Filter by user..."
                value={filters.user || ''}
                onChange={(e) => updateFilter('user', e.target.value)}
                className="h-9 border-ds-border"
              />
            </div>
          </>
        )}
      </div>

      {/* Active Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => (
            <Badge 
              key={key} 
              variant="secondary" 
              className="text-xs bg-ds-primary/10 text-ds-primary flex items-center space-x-1"
            >
              <span>{key}: {String(value)}</span>
              <button 
                onClick={() => clearFilter(key)}
                className="ml-1 hover:bg-ds-primary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
