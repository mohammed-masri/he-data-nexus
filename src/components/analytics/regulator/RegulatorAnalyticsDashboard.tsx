
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterPanel } from "../foundation/FilterPanel";
import { ExecutiveView } from "../views/ExecutiveView";
import { DetailedView } from "../views/DetailedView";
import { PredictiveAnalyticsEngine } from "../features/PredictiveAnalyticsEngine";
import { AcademicContextHeader } from "../shared/AcademicContextHeader";
import { AnalyticsBreadcrumb } from "../shared/AnalyticsBreadcrumb";
import { AcademicTimeline } from "../shared/AcademicTimeline";
import { ContextualQuickActions } from "../shared/ContextualQuickActions";
import { AcademicFilterPresets } from "../shared/AcademicFilterPresets";
import { Brain, Sparkles, LayoutDashboard, BarChart3, Filter, Zap, Calendar, TrendingUp, Target, Users, Building2 } from "lucide-react";

export const RegulatorAnalyticsDashboard = () => {
  // Academic Context State
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [semester, setSemester] = useState("fall");
  
  const [filters, setFilters] = useState({
    timeRange: "current-semester",
    department: "all",
    studentLevel: "all",
    comparison: "yoy",
    dataType: "students",
    institution: "all" // Institution filter for regulator portal
  });
  const [viewMode, setViewMode] = useState<'executive' | 'detailed'>('executive');
  const [showFilters, setShowFilters] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showAcademicPresets, setShowAcademicPresets] = useState(false);

  const filterOptions = [
    {
      key: "institution",
      label: "Institution",
      value: filters.institution,
      options: [
        { value: "all", label: "All Institutions" },
        { value: "sharjah-education-academy", label: "Sharjah Education Academy" },
        { value: "american-university-sharjah", label: "American University of Sharjah" },
        { value: "sharjah-medical-college", label: "Sharjah Medical College" },
        { value: "university-of-sharjah", label: "University of Sharjah" },
        { value: "higher-colleges-technology", label: "Higher Colleges of Technology" }
      ]
    },
    {
      key: "dataType",
      label: "Data Type",
      value: filters.dataType,
      options: [
        { value: "students", label: "Student Data" },
        { value: "employees", label: "Employee Data" },
        { value: "combined", label: "Combined View" }
      ]
    },
    {
      key: "department",
      label: "Department",
      value: filters.department,
      options: [
        { value: "all", label: "All Departments" },
        { value: "engineering", label: "Engineering" },
        { value: "business", label: "Business" },
        { value: "liberal-arts", label: "Liberal Arts" },
        { value: "sciences", label: "Sciences" }
      ]
    },
    {
      key: "studentLevel",
      label: "Student Level",
      value: filters.studentLevel,
      options: [
        { value: "all", label: "All Levels" },
        { value: "undergraduate", label: "Undergraduate" },
        { value: "graduate", label: "Graduate" },
        { value: "professional", label: "Professional" }
      ]
    },
    {
      key: "comparison",
      label: "Comparison",
      value: filters.comparison,
      options: [
        { value: "yoy", label: "Year over Year" },
        { value: "semester", label: "Semester over Semester" },
        { value: "peer", label: "Peer Institutions" }
      ]
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      timeRange: "current-semester",
      department: "all",
      studentLevel: "all",
      comparison: "yoy",
      dataType: "students",
      institution: "all"
    });
  };

  const handleAcademicContextChange = (ay: string, sem: string) => {
    setAcademicYear(ay);
    setSemester(sem);
    setFilters(prev => ({ 
      ...prev, 
      timeRange: sem === 'fall' ? 'current-semester' : 'academic-year' 
    }));
  };

  const handleGenerateDashboard = () => {
    setShowAIInsights(!showAIInsights);
    console.log("AI generating personalized dashboard layout");
  };

  const handleQuickAction = (action: string, params?: any) => {
    console.log("Quick action:", action, params);
    switch (action) {
      case "semester-compare":
        setFilters(prev => ({ ...prev, comparison: "semester", targetPeriod: params?.targetSemester }));
        break;
      case "year-compare":
        setFilters(prev => ({ ...prev, comparison: "yoy", targetYear: params?.targetYear }));
        break;
      case "risk-analysis":
        setFilters(prev => ({ ...prev, riskLevel: "high", focus: "intervention" }));
        break;
      case "executive-report":
        console.log("Generating executive report with current context");
        break;
      default:
        console.log("Action not implemented:", action);
    }
  };

  const handlePresetSelect = (presetFilters: any) => {
    setFilters(prev => ({ ...prev, ...presetFilters }));
    setShowAcademicPresets(false);
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== "all" && value !== "students").length;
  const semesterDisplay = semester === 'fall' ? 'Fall 2024' : 
                         semester === 'spring' ? 'Spring 2024' : 'Summer 2024';
  
  const selectedInstitution = filterOptions[0].options.find(opt => opt.value === filters.institution)?.label || "All Institutions";

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg via-ds-bg-grey-light to-ds-secondary/20">
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-ds-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-ds-text-primary tracking-tight leading-tight">
                {semesterDisplay} Regulator Analytics Dashboard
              </h1>
              <div className="flex items-center space-x-6 text-sm text-ds-text-secondary">
                <span className="font-medium">
                  Academic Year {academicYear} • Live Data Stream • Week 12 of 16
                </span>
                {filters.institution !== "all" && (
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                    <Building2 className="w-3 h-3 mr-1" />
                    {selectedInstitution}
                  </Badge>
                )}
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <div className="w-2 h-2 bg-ds-primary rounded-full mr-2 animate-pulse" />
                  Real-time Active
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Brain className="w-3 h-3 mr-1 text-ds-primary" />
                  AI Enhanced
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Calendar className="w-3 h-3 mr-1" />
                  Academic Context
                </Badge>
                {filters.dataType === "employees" && (
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                    <Users className="w-3 h-3 mr-1" />
                    Employee Data
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Enhanced Controls */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowAcademicPresets(!showAcademicPresets)}
                variant="outline"
                className="font-medium border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
              >
                <Target className="w-4 h-4 mr-2" />
                Academic Presets
              </Button>

              <Button
                onClick={() => setShowQuickActions(!showQuickActions)}
                variant="outline"
                className="font-medium border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Quick Actions
              </Button>
              
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="font-medium border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-ds-primary text-white text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              
              {/* View Toggle */}
              <div className="flex items-center bg-ds-bg-grey p-1 rounded-xl border border-ds-border">
                <Button
                  variant={viewMode === 'executive' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('executive')}
                  className={`text-sm font-medium px-4 py-2 ${
                    viewMode === 'executive' 
                      ? 'bg-ds-primary text-white'
                      : 'text-ds-text-secondary hover:text-ds-primary'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Executive
                </Button>
                <Button
                  variant={viewMode === 'detailed' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('detailed')}
                  className={`text-sm font-medium px-4 py-2 ${
                    viewMode === 'detailed' 
                      ? 'bg-ds-primary text-white'
                      : 'text-ds-text-secondary hover:text-ds-primary'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Detailed
                </Button>
              </div>

              <Button 
                onClick={handleGenerateDashboard}
                className={`${
                  showAIInsights 
                    ? 'bg-ds-primary-dark hover:bg-ds-primary text-white' 
                    : 'bg-ds-primary hover:bg-ds-primary-dark text-white'
                } font-medium shadow-md`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {showAIInsights ? 'Hide AI' : 'AI Generate'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Academic Context Header */}
        <AcademicContextHeader
          currentAY={academicYear}
          currentSemester={semester}
          onContextChange={handleAcademicContextChange}
        />

        {/* Academic Timeline */}
        <AcademicTimeline
          currentSemester={semester}
          academicYear={academicYear}
        />

        {/* Enhanced Breadcrumb with Institution Context */}
        <AnalyticsBreadcrumb
          currentAY={academicYear}
          currentSemester={semesterDisplay}
          department={filters.department}
          viewMode={viewMode}
          activeFilters={activeFilterCount}
          institution={filters.institution !== "all" ? selectedInstitution : undefined}
        />

        {/* Academic Presets */}
        {showAcademicPresets && (
          <AcademicFilterPresets
            onPresetSelect={handlePresetSelect}
            currentFilters={filters}
          />
        )}

        {/* Quick Actions */}
        {showQuickActions && (
          <ContextualQuickActions
            currentSemester={semester}
            academicYear={academicYear}
            onAction={handleQuickAction}
          />
        )}

        {/* Filters */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* AI Insights Section */}
        {showAIInsights && (
          <Card className="border-ds-primary/30 bg-gradient-to-r from-ds-secondary/40 to-ds-bg-grey-light">
            <CardHeader>
              <CardTitle className="flex items-center text-ds-text-primary">
                <Zap className="w-5 h-5 mr-2 text-ds-primary" />
                AI-Generated Insights for {semesterDisplay}
                {filters.institution !== "all" && (
                  <Badge className="ml-2 bg-ds-primary text-white">
                    {selectedInstitution}
                  </Badge>
                )}
                <Badge className="ml-2 bg-ds-primary text-white">
                  Live Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PredictiveAnalyticsEngine filters={{...filters, academicYear, semester}} />
            </CardContent>
          </Card>
        )}

        {/* Dashboard Views */}
        {viewMode === 'executive' ? (
          <ExecutiveView filters={{...filters, academicYear, semester}} />
        ) : (
          <DetailedView filters={{...filters, academicYear, semester}} />
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40 backdrop-blur-sm shadow-sm">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                  <Brain className="w-6 h-6 text-ds-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ds-text-primary">
                    AI-Powered Regulator Analytics Intelligence • {semesterDisplay} • Week 12 of 16
                  </h3>
                  <p className="text-sm text-ds-text-secondary mt-1">
                    {viewMode === 'executive' 
                      ? 'Strategic insights with predictive analytics for executive decision-making'
                      : 'Deep analytical capabilities with comprehensive data exploration tools'
                    } • Academic Year {academicYear} • Context-Aware • {filters.dataType === "employees" ? "Employee Data" : "Student Data"}
                    {filters.institution !== "all" && ` • ${selectedInstitution}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <div className="w-2 h-2 bg-ds-primary rounded-full mr-2 animate-pulse" />
                  Live Data
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Enhanced
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Calendar className="w-3 h-3 mr-1" />
                  Academic Context
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  {viewMode === 'executive' ? 'Executive Ready' : 'Analytics Ready'}
                </Badge>
                {filters.institution !== "all" && (
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                    <Building2 className="w-3 h-3 mr-1" />
                    Institution Filtered
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
