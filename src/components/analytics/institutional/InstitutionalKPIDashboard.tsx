
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { PriorityMetrics } from "./components/PriorityMetrics";
import { MainNavigation } from "./components/MainNavigation";
import { KPIDetailedTab } from "./KPIDetailedTab";
import { AcademicExcellenceTab } from "./tabs/AcademicExcellenceTab";
import { StudentLifecycleTab } from "./tabs/StudentLifecycleTab";
import { ResearchInnovationTab } from "./tabs/ResearchInnovationTab";
import { AnalyticsGrid } from "../foundation/AnalyticsGrid";
import { InteractiveChart } from "../foundation/InteractiveChart";
import { kpiDataService } from "@/services/kpiDataService";
import { 
  Target, TrendingUp, BookOpen, GraduationCap, UserCheck, Users, 
  DollarSign, Settings, Shield, Microscope, Building2, Globe, Bell, Brain, Sparkles 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs as NestedTabs, TabsContent as NestedTabsContent, TabsList as NestedTabsList, TabsTrigger as NestedTabsTrigger } from "@/components/ui/tabs";
import { AIAnalyticsModal } from "./components/AIAnalyticsModal";

export const InstitutionalKPIDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeKPITab, setActiveKPITab] = useState("academic-excellence");
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  
  // Filter states
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [semester, setSemester] = useState("fall");
  const [department, setDepartment] = useState("all");
  
  const pillars = kpiDataService.generatePillarData();

  const handleViewDetails = (pillarId: string) => {
    setSelectedPillar(pillarId);
    setActiveTab("deep-dive");
  };

  const overallStats = {
    totalPillars: pillars.length,
    onTrack: pillars.filter(p => p.status === 'on-track').length,
    exceedsTarget: pillars.filter(p => p.status === 'exceeds-target').length,
    needsAttention: pillars.filter(p => p.status === 'needs-attention').length
  };

  // Mock data for enhanced charts
  const performanceTrendData = [
    { name: 'Jan', value: 78 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 89 },
    { name: 'May', value: 87 },
    { name: 'Jun', value: 92 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 95 },
    { name: 'Business', value: 88 },
    { name: 'Sciences', value: 91 },
    { name: 'Arts', value: 84 }
  ];

  // Reorganized KPI areas with logical grouping
  const studentFocusedAreas = [
    { id: "academic-excellence", label: "Academic Excellence", icon: GraduationCap, priority: "high" },
    { id: "student-lifecycle", label: "Student Success", icon: UserCheck, priority: "high" },
    { id: "student-services", label: "Student Services", icon: Users, priority: "medium" },
  ];

  const operationalAreas = [
    { id: "faculty-hr", label: "Faculty & HR", icon: Users, priority: "high" },
    { id: "financial-performance", label: "Financial", icon: DollarSign, priority: "high" },
    { id: "infrastructure", label: "Infrastructure", icon: Settings, priority: "medium" },
    { id: "quality-assurance", label: "Quality", icon: Shield, priority: "medium" },
  ];

  const strategicAreas = [
    { id: "research-innovation", label: "Research", icon: Microscope, priority: "high" },
    { id: "industry-partnerships", label: "Industry", icon: Building2, priority: "medium" },
    { id: "global-engagement", label: "Global", icon: Globe, priority: "medium" },
  ];

  return (
    <div className="min-h-screen bg-ds-bg">
      {/* Header */}
      <AnalyticsHeader
        academicYear={academicYear}
        semester={semester}
        department={department}
        showFilters={showFilters}
        onAcademicYearChange={setAcademicYear}
        onSemesterChange={setSemester}
        onDepartmentChange={setDepartment}
        onToggleFilters={() => setShowFilters(!showFilters)}
        overallStats={overallStats}
      />

      {/* Main Content Container */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Primary Tab Navigation */}
        <MainNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="py-6 lg:py-8">
          <div className="w-full">
            {/* Main Content Area - Full Width */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Priority Metrics moved inside Overview tab */}
                <PriorityMetrics />

                {/* KPI Areas Summary - Grouped Logically */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-ds-text-primary flex items-center">
                    <Target className="w-6 h-6 mr-3 text-ds-primary" />
                    Performance Areas Overview
                  </h3>
                  
                  {/* Student-Focused Areas */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-6 bg-ds-primary rounded-full"></div>
                      <h4 className="text-lg font-semibold text-ds-text-primary">Student-Focused Excellence</h4>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        High Priority
                      </Badge>
                    </div>
                    <AnalyticsGrid columns={3} className="gap-4">
                      {studentFocusedAreas.map((area, index) => (
                        <Card key={index} className="border-ds-border hover:shadow-md transition-shadow bg-white cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <area.icon className="w-5 h-5 text-ds-primary" />
                              <Badge className={`text-xs ${
                                area.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {area.priority}
                              </Badge>
                            </div>
                            <h5 className="font-semibold text-ds-text-primary mb-1">{area.label}</h5>
                            <p className="text-xs text-ds-text-muted">Performance metrics and insights</p>
                          </CardContent>
                        </Card>
                      ))}
                    </AnalyticsGrid>
                  </div>

                  {/* Operational Areas */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      <h4 className="text-lg font-semibold text-ds-text-primary">Operational Excellence</h4>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Core Operations
                      </Badge>
                    </div>
                    <AnalyticsGrid columns={4} className="gap-4">
                      {operationalAreas.map((area, index) => (
                        <Card key={index} className="border-ds-border hover:shadow-md transition-shadow bg-white cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <area.icon className="w-5 h-5 text-ds-primary" />
                              <Badge className={`text-xs ${
                                area.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {area.priority}
                              </Badge>
                            </div>
                            <h5 className="font-semibold text-ds-text-primary mb-1 text-sm">{area.label}</h5>
                            <p className="text-xs text-ds-text-muted">Operational metrics</p>
                          </CardContent>
                        </Card>
                      ))}
                    </AnalyticsGrid>
                  </div>

                  {/* Strategic Areas */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                      <h4 className="text-lg font-semibold text-ds-text-primary">Strategic Growth</h4>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        Future-Focused
                      </Badge>
                    </div>
                    <AnalyticsGrid columns={3} className="gap-4">
                      {strategicAreas.map((area, index) => (
                        <Card key={index} className="border-ds-border hover:shadow-md transition-shadow bg-white cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <area.icon className="w-5 h-5 text-ds-primary" />
                              <Badge className={`text-xs ${
                                area.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {area.priority}
                              </Badge>
                            </div>
                            <h5 className="font-semibold text-ds-text-primary mb-1">{area.label}</h5>
                            <p className="text-xs text-ds-text-muted">Strategic insights</p>
                          </CardContent>
                        </Card>
                      ))}
                    </AnalyticsGrid>
                  </div>
                </div>

                {/* Performance Charts */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-ds-text-primary flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-ds-primary" />
                    Performance Insights
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InteractiveChart
                      title="Performance Trend Analysis"
                      data={performanceTrendData}
                      type="line"
                      loading={false}
                      insight="Consistent 18% improvement trajectory over 6 months with accelerating growth"
                      className="bg-white border-ds-border"
                      height={320}
                    />
                    <InteractiveChart
                      title="Department Performance Comparison"
                      data={departmentData}
                      type="bar"
                      loading={false}
                      insight="Engineering leads at 95%, Arts shows 11-point improvement opportunity"
                      className="bg-white border-ds-border"
                      height={320}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Detailed Tab */}
              <TabsContent value="detailed" className="space-y-6">
                <NestedTabs value={activeKPITab} onValueChange={setActiveKPITab} className="space-y-6">
                  <div className="bg-white border border-ds-border rounded-xl shadow-sm">
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h4 className="font-semibold text-ds-text-primary">Performance Areas</h4>
                        <Badge className="bg-ds-secondary text-ds-primary border-ds-border text-xs">
                          {studentFocusedAreas.length + operationalAreas.length + strategicAreas.length} Areas
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                          <NestedTabsList className="bg-transparent flex w-max min-w-full gap-1 p-0">
                            {[...studentFocusedAreas, ...operationalAreas, ...strategicAreas].map((tab) => {
                              const IconComponent = tab.icon;
                              return (
                                <NestedTabsTrigger 
                                  key={tab.id}
                                  value={tab.id}
                                  className="data-[state=active]:bg-ds-primary data-[state=active]:text-white flex-shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm transition-all duration-200 whitespace-nowrap border border-transparent data-[state=active]:border-ds-primary min-w-max"
                                >
                                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                  <span className="truncate">{tab.label}</span>
                                  {tab.priority === 'high' && (
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full ml-1 sm:ml-2 flex-shrink-0" />
                                  )}
                                </NestedTabsTrigger>
                              );
                            })}
                          </NestedTabsList>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI Area Tab Contents */}
                  <NestedTabsContent value="academic-excellence">
                    <AcademicExcellenceTab />
                  </NestedTabsContent>

                  <NestedTabsContent value="student-lifecycle">
                    <StudentLifecycleTab />
                  </NestedTabsContent>

                  <NestedTabsContent value="research-innovation">
                    <ResearchInnovationTab />
                  </NestedTabsContent>

                  {[...operationalAreas, ...strategicAreas.filter(area => !['research-innovation'].includes(area.id))].map(area => (
                    <NestedTabsContent key={area.id} value={area.id}>
                      <Card className="border-ds-border bg-white">
                        <CardHeader>
                          <CardTitle className="flex items-center text-ds-text-primary">
                            <area.icon className="w-5 h-5 mr-2 text-ds-primary" />
                            {area.label} Analytics
                            <Badge className="ml-3 bg-blue-100 text-blue-700">
                              Coming Soon
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <area.icon className="w-12 h-12 text-ds-text-muted mx-auto mb-4" />
                            <p className="text-ds-text-muted mb-4">Comprehensive {area.label.toLowerCase()} metrics and analytics are being prepared.</p>
                            <Button variant="outline" className="border-ds-border">
                              <Bell className="w-4 h-4 mr-2" />
                              Notify When Ready
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </NestedTabsContent>
                  ))}
                </NestedTabs>
              </TabsContent>

              {/* Deep Dive Tab */}
              <TabsContent value="deep-dive" className="space-y-6">
                <KPIDetailedTab 
                  pillars={pillars} 
                  selectedPillar={selectedPillar}
                  onPillarSelect={setSelectedPillar}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <Button
        onClick={() => setShowAIModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-ds-primary to-ds-primary-dark hover:from-ds-primary-dark hover:to-ds-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
      >
        <Brain className="w-6 h-6 group-hover:animate-pulse" />
        <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse text-yellow-300" />
      </Button>

      <AIAnalyticsModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        overallStats={overallStats}
        academicYear={academicYear}
        semester={semester}
        department={department}
      />
    </div>
  );
};
