
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentOverviewMetrics } from "./StudentOverviewMetrics";
import { EnrollmentAnalytics } from "./EnrollmentAnalytics";
import { AttritionAnalytics } from "./AttritionAnalytics";
import { ScholarshipAnalytics } from "./ScholarshipAnalytics";
import { CareerReadinessAnalytics } from "./CareerReadinessAnalytics";
import { FinancialAnalytics } from "./FinancialAnalytics";
import { PredictiveAnalyticsEngine } from "../features/PredictiveAnalyticsEngine";
import { EnhancedAIAssistant } from "../features/EnhancedAIAssistant";
import { AdvancedFilterPanel } from "../foundation/AdvancedFilterPanel";
import { 
  Users, GraduationCap, TrendingDown, Award, Brain, Briefcase,
  DollarSign, Filter, RefreshCw, Download, BarChart3, Zap
} from "lucide-react";

export const StudentAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    timeRange: "current-semester",
    level: "all",
    program: "all",
    campus: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSaveFilter = (name: string, filterData: any) => {
    console.log("Saving filter:", name, filterData);
  };

  const handleRefresh = () => {
    console.log("Refreshing student analytics data");
  };

  const handleExport = () => {
    console.log("Exporting student analytics report");
  };

  const handleAIGenerate = () => {
    console.log("Generating AI insights");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg via-ds-bg-grey-light to-ds-secondary/20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-ds-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-ds-text-primary tracking-tight leading-tight">
                Student Analytics Intelligence
              </h1>
              <div className="flex items-center space-x-6 text-sm text-ds-text-secondary">
                <span className="font-medium">Fall 2024 • AI-Enhanced Analytics</span>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <div className="w-2 h-2 bg-ds-primary rounded-full mr-2 animate-pulse" />
                  Real-time Active
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  <Brain className="w-3 h-3 mr-1 text-ds-primary" />
                  AI Enhanced
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  Predictive Enabled
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
                Advanced Filters
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
        <StudentOverviewMetrics filters={filters} />

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
                <TabsTrigger value="enrollment" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <Users className="w-4 h-4" />
                  <span>Enrollment</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <TrendingDown className="w-4 h-4" />
                  <span>Performance</span>
                </TabsTrigger>
                <TabsTrigger value="predictive" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                  <Brain className="w-4 h-4" />
                  <span>AI Insights</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EnrollmentAnalytics filters={filters} />
                  <AttritionAnalytics filters={filters} />
                </div>
              </TabsContent>

              <TabsContent value="enrollment" className="space-y-6">
                <Tabs defaultValue="enrollment" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4 bg-ds-bg-grey">
                    <TabsTrigger value="enrollment" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Enrollment</TabsTrigger>
                    <TabsTrigger value="scholarships" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Scholarships</TabsTrigger>
                    <TabsTrigger value="career" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Career</TabsTrigger>
                    <TabsTrigger value="financial" className="data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">Financial</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="enrollment">
                    <EnrollmentAnalytics filters={filters} />
                  </TabsContent>
                  
                  <TabsContent value="scholarships">
                    <ScholarshipAnalytics filters={filters} />
                  </TabsContent>
                  
                  <TabsContent value="career">
                    <CareerReadinessAnalytics filters={filters} />
                  </TabsContent>
                  
                  <TabsContent value="financial">
                    <FinancialAnalytics filters={filters} />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <AttritionAnalytics filters={filters} />
              </TabsContent>

              <TabsContent value="predictive" className="space-y-6">
                <PredictiveAnalyticsEngine filters={filters} />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <EnhancedAIAssistant domain="students" filters={filters} />
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
                  <Brain className="w-6 h-6 text-ds-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ds-text-primary">AI-Powered Student Intelligence Platform</h3>
                  <p className="text-sm text-ds-text-secondary mt-1">
                    Complete student lifecycle analytics with predictive insights, risk analysis, and intelligent recommendations
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
                  Predictive Analytics
                </Badge>
                <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/20 font-medium">
                  8 Data Sources
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
