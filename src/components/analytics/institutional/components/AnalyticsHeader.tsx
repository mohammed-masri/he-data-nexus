
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ChevronDown, Brain } from "lucide-react";

interface AnalyticsHeaderProps {
  academicYear: string;
  semester: string;
  department: string;
  institution?: string;
  showFilters: boolean;
  onAcademicYearChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onInstitutionChange?: (value: string) => void;
  onToggleFilters: () => void;
  overallStats: {
    totalPillars: number;
    onTrack: number;
    exceedsTarget: number;
    needsAttention: number;
  };
}

export const AnalyticsHeader = ({
  academicYear,
  semester,
  department,
  institution = "all",
  showFilters,
  onAcademicYearChange,
  onSemesterChange,
  onDepartmentChange,
  onInstitutionChange,
  onToggleFilters,
  overallStats
}: AnalyticsHeaderProps) => {
  const hasActiveFilters = academicYear !== "2024-25" || semester !== "fall" || department !== "all" || (onInstitutionChange && institution !== "all");
  const isRegulatorView = onInstitutionChange !== undefined;

  return (
    <div className="bg-white border-b border-ds-border shadow-sm sticky top-0 z-40 mb-6">
      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl shadow-lg animate-fade-in">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="animate-fade-in">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ds-text-primary leading-tight mb-1">
                  {isRegulatorView ? "Regulator Analytics" : "Analytics"}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-ds-text-muted">
                  <span>{academicYear} {semester.charAt(0).toUpperCase() + semester.slice(1)}</span>
                  {isRegulatorView && institution !== "all" && (
                    <>
                      <span>•</span>
                      <span>{institution}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="border-ds-border hover:border-ds-primary hover:bg-ds-secondary transition-all duration-200 group"
            >
              <Filter className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Filters
              <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              {hasActiveFilters && (
                <Badge className="ml-2 bg-ds-primary text-white text-xs animate-fade-in">
                  Active
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-3 bg-gradient-to-r from-ds-bg-grey-light to-white rounded-lg border border-ds-border shadow-sm animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-ds-text-primary">Filter Analytics Data</h3>
              <Badge variant="outline" className="text-xs text-ds-text-muted border-ds-border">
                {hasActiveFilters ? `${isRegulatorView ? '4' : '3'} Active` : 'Default View'}
              </Badge>
            </div>
            <div className={`grid grid-cols-1 ${isRegulatorView ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-2`}>
              {isRegulatorView && onInstitutionChange && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ds-text-secondary block">Institution</label>
                  <Select value={institution} onValueChange={onInstitutionChange}>
                    <SelectTrigger className="h-8 bg-white border-ds-border hover:border-ds-primary transition-colors duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-ds-border shadow-xl z-50">
                      <SelectItem value="all" className="hover:bg-ds-secondary transition-colors">All Institutions</SelectItem>
                      <SelectItem value="sharjah-education-academy" className="hover:bg-ds-secondary transition-colors">Sharjah Education Academy</SelectItem>
                      <SelectItem value="american-university-sharjah" className="hover:bg-ds-secondary transition-colors">American University of Sharjah</SelectItem>
                      <SelectItem value="sharjah-medical-college" className="hover:bg-ds-secondary transition-colors">Sharjah Medical College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ds-text-secondary block">Academic Year</label>
                <Select value={academicYear} onValueChange={onAcademicYearChange}>
                  <SelectTrigger className="h-8 bg-white border-ds-border hover:border-ds-primary transition-colors duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-ds-border shadow-xl z-50">
                    <SelectItem value="2024-25" className="hover:bg-ds-secondary transition-colors">2024-25</SelectItem>
                    <SelectItem value="2023-24" className="hover:bg-ds-secondary transition-colors">2023-24</SelectItem>
                    <SelectItem value="2022-23" className="hover:bg-ds-secondary transition-colors">2022-23</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ds-text-secondary block">Semester</label>
                <Select value={semester} onValueChange={onSemesterChange}>
                  <SelectTrigger className="h-8 bg-white border-ds-border hover:border-ds-primary transition-colors duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-ds-border shadow-xl z-50">
                    <SelectItem value="fall" className="hover:bg-ds-secondary transition-colors">Fall</SelectItem>
                    <SelectItem value="spring" className="hover:bg-ds-secondary transition-colors">Spring</SelectItem>
                    <SelectItem value="summer" className="hover:bg-ds-secondary transition-colors">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ds-text-secondary block">Department</label>
                <Select value={department} onValueChange={onDepartmentChange}>
                  <SelectTrigger className="h-8 bg-white border-ds-border hover:border-ds-primary transition-colors duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-ds-border shadow-xl z-50">
                    <SelectItem value="all" className="hover:bg-ds-secondary transition-colors">All Departments</SelectItem>
                    <SelectItem value="engineering" className="hover:bg-ds-secondary transition-colors">Engineering</SelectItem>
                    <SelectItem value="business" className="hover:bg-ds-secondary transition-colors">Business</SelectItem>
                    <SelectItem value="sciences" className="hover:bg-ds-secondary transition-colors">Sciences</SelectItem>
                    <SelectItem value="arts" className="hover:bg-ds-secondary transition-colors">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
