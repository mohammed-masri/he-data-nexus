
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeOverviewMetrics } from "./EmployeeOverviewMetrics";
import { EmployeeWorkloadAnalytics } from "./EmployeeWorkloadAnalytics";
import { EmployeeSalaryAnalytics } from "./EmployeeSalaryAnalytics";
import { EmployeeDepartmentAnalytics } from "./EmployeeDepartmentAnalytics";
import { PredictiveAnalyticsEngine } from "../features/PredictiveAnalyticsEngine";
import { EnhancedAIAssistant } from "../features/EnhancedAIAssistant";
import { AdvancedFilterPanel } from "../foundation/AdvancedFilterPanel";
import { 
  Users, Building, DollarSign, BarChart3, Brain, 
  Filter, RefreshCw, Download, Zap, Clock
} from "lucide-react";

export const EmployeeAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    timeRange: "current-semester",
    department: "all",
    employeeCategory: "all",
    employmentStatus: "all",
    payrollType: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSaveFilter = (name: string, filterData: any) => {
    console.log("Saving employee filter:", name, filterData);
  };

  const handleRefresh = () => {
    console.log("Refreshing employee analytics data");
  };

  const handleExport = () => {
    console.log("Exporting employee analytics report");
  };

  const handleAIGenerate = () => {
    console.log("Generating employee AI insights");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg via-ds-bg-grey-light to-ds-secondary/20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-ds-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-ds-text-primary tracking-tight leading-tight">
                Employee Analytics Intelligence
              </h1>
              <div className="flex items-center space-x-6 text-sm text-ds-text-secondary">
                <span className="font-medium">Fall 2024 • Workforce Analytics • AI-Enhanced</span>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <div className="w-2 h-2 bg-ds-primary rounded-full mr-2 animate-pulse" />
                  Real-time Active
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Brain className="w-3 h-3 mr-1 text-ds-primary" />
                  AI Enhanced
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  HR Intelligence
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="font-medium border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Employee Filters
              </Button>
              
              <Button variant="outline" onClick={handleRefresh} className="border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <Button variant="outline" onClick={handleExport} className="border-ds-border text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              <Button 
                onClick={handleAIGenerate}
                className="bg-ds-primary hover:bg-ds-primary-dark text-white font-medium shadow-md"
              >
                <Zap className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Enhanced Filters */}
        {showFilters && (
          <AdvancedFilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onSaveFilter={handleSaveFilter}
          />
        )}

        {/* Quick Stats Overview */}
        <EmployeeOverviewMetrics filters={filters} />

        {/* Main Content with AI Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Analytics Tabs */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-ds-border">
                <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="departments" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <Building className="w-4 h-4" />
                  <span>Departments</span>
                </TabsTrigger>
                <TabsTrigger value="workload" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <Clock className="w-4 h-4" />
                  <span>Workload</span>
                </TabsTrigger>
                <TabsTrigger value="salary" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <DollarSign className="w-4 h-4" />
                  <span>Salary</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <EmployeeDepartmentAnalytics filters={filters} />
              </TabsContent>

              <TabsContent value="departments" className="space-y-6">
                <EmployeeDepartmentAnalytics filters={filters} />
              </TabsContent>

              <TabsContent value="workload" className="space-y-6">
                <EmployeeWorkloadAnalytics filters={filters} />
              </TabsContent>

              <TabsContent value="salary" className="space-y-6">
                <EmployeeSalaryAnalytics filters={filters} />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <EnhancedAIAssistant domain="employees" filters={filters} />
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40 backdrop-blur-sm shadow-sm">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                  <Users className="w-6 h-6 text-ds-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ds-text-primary">AI-Powered Employee Intelligence Platform</h3>
                  <p className="text-sm text-ds-text-secondary mt-1">
                    Complete workforce analytics with salary insights, workload optimization, and HR intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <div className="w-2 h-2 bg-ds-primary rounded-full mr-2 animate-pulse" />
                  Live Data
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  HR Analytics
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  5 Data Sources
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
