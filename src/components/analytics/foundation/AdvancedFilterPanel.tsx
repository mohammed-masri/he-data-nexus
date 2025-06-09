
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, X, Save, Clock, Search } from "lucide-react";
import { useState } from "react";

interface AdvancedFilterPanelProps {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
  onSaveFilter: (name: string, filters: Record<string, any>) => void;
  className?: string;
}

export const AdvancedFilterPanel = ({ 
  filters, 
  onFilterChange, 
  onSaveFilter,
  className = ""
}: AdvancedFilterPanelProps) => {
  const [savedFilters] = useState([
    { name: "High Risk Students", filters: { riskLevel: "high", gpa: "<2.5" } },
    { name: "STEM Programs", filters: { department: "engineering,sciences,it" } },
    { name: "Scholarship Recipients", filters: { hasScholarship: true } }
  ]);

  const [customFilterName, setCustomFilterName] = useState("");
  const [activeTab, setActiveTab] = useState("quick");

  const quickFilters = [
    { label: "This Semester", key: "timeRange", value: "current-semester" },
    { label: "At Risk Students", key: "riskLevel", value: "high" },
    { label: "New Enrollments", key: "enrollmentStatus", value: "new" },
    { label: "International", key: "studentType", value: "international" },
    { label: "Graduate Level", key: "level", value: "graduate" },
    { label: "Scholarship Recipients", key: "hasScholarship", value: true }
  ];

  const departmentOptions = [
    "Engineering", "Business", "Health Sciences", "Arts & Sciences", 
    "Information Technology", "Education", "Liberal Arts"
  ];

  const handleQuickFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSaveCustomFilter = () => {
    if (customFilterName.trim()) {
      onSaveFilter(customFilterName, filters);
      setCustomFilterName("");
    }
  };

  const applySavedFilter = (savedFilter: any) => {
    onFilterChange({ ...filters, ...savedFilter.filters });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <Card className={`border-ds-border ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-ds-text-primary flex items-center">
          <Filter className="w-5 h-5 mr-2 text-ds-primary" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-ds-secondary text-ds-primary">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters} className="border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50">
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-ds-bg-grey">
            <TabsTrigger value="quick" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Quick Filters</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Advanced</TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter, index) => (
                <Button
                  key={index}
                  variant={filters[filter.key] === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickFilter(filter.key, filter.value)}
                  className={`text-xs ${
                    filters[filter.key] === filter.value 
                      ? "bg-ds-primary text-white hover:bg-ds-primary-dark" 
                      : "border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ds-text-secondary">Department</label>
                <select
                  value={filters.department || ""}
                  onChange={(e) => handleQuickFilter("department", e.target.value)}
                  className="w-full p-2 border border-ds-border rounded-lg text-sm focus:border-ds-primary focus:ring-1 focus:ring-ds-primary"
                >
                  <option value="">All Departments</option>
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept.toLowerCase().replace(/\s+/g, "-")}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ds-text-secondary">GPA Range</label>
                <select
                  value={filters.gpaRange || ""}
                  onChange={(e) => handleQuickFilter("gpaRange", e.target.value)}
                  className="w-full p-2 border border-ds-border rounded-lg text-sm focus:border-ds-primary focus:ring-1 focus:ring-ds-primary"
                >
                  <option value="">All GPAs</option>
                  <option value="4.0">4.0 (Excellent)</option>
                  <option value="3.5-3.99">3.5 - 3.99 (Very Good)</option>
                  <option value="3.0-3.49">3.0 - 3.49 (Good)</option>
                  <option value="2.5-2.99">2.5 - 2.99 (Fair)</option>
                  <option value="<2.5">Less than 2.5 (At Risk)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ds-text-secondary">Enrollment Year</label>
                <select
                  value={filters.enrollmentYear || ""}
                  onChange={(e) => handleQuickFilter("enrollmentYear", e.target.value)}
                  className="w-full p-2 border border-ds-border rounded-lg text-sm focus:border-ds-primary focus:ring-1 focus:ring-ds-primary"
                >
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-ds-border">
              <Input
                placeholder="Save current filter set..."
                value={customFilterName}
                onChange={(e) => setCustomFilterName(e.target.value)}
                className="flex-1 border-ds-border focus:border-ds-primary focus:ring-ds-primary"
              />
              <Button 
                onClick={handleSaveCustomFilter}
                disabled={!customFilterName.trim()}
                size="sm"
                className="bg-ds-primary text-white hover:bg-ds-primary-dark"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-3">
            {savedFilters.map((savedFilter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-ds-bg-grey rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-ds-text-muted" />
                  <span className="font-medium text-ds-text-primary">{savedFilter.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => applySavedFilter(savedFilter)}
                  className="border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
                >
                  Apply
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
