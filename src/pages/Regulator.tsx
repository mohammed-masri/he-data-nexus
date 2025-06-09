
import { useState } from "react";
import { UnifiedTopNav } from "@/components/UnifiedTopNav";
import ServiceCard from "@/components/ServiceCard";
import HorizontalServiceCard from "@/components/HorizontalServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, BarChart3, Users, MessageSquare, Settings, Shield,
  Plus, Upload, Download, Eye, Edit, Trash2, CheckCircle,
  AlertTriangle, Clock, TrendingUp, FileText, Database, ArrowRight, Zap
} from "lucide-react";

const navigationItems = [
  { title: "Overview", value: "overview" },
  { title: "Institutions", value: "institutions" },
  { title: "Analytics", value: "analytics" },
  { title: "Surveys", value: "surveys" },
  { title: "Administration", value: "administration" },
];

// Mock data for institutions
const mockInstitutions = [
  {
    id: 1,
    name: "Sharjah Education Academy",
    type: "Private University",
    status: "Active",
    complianceScore: 95,
    lastAudit: "2024-12-15",
    studentsCount: 3247,
    facultyCount: 186,
    programs: 24,
    accreditation: "KHDA Accredited"
  },
  {
    id: 2,
    name: "American University of Sharjah",
    type: "Private University",
    status: "Active",
    complianceScore: 98,
    lastAudit: "2024-11-20",
    studentsCount: 6800,
    facultyCount: 450,
    programs: 86,
    accreditation: "KHDA Accredited"
  },
  {
    id: 3,
    name: "Sharjah Medical College",
    type: "Medical College",
    status: "Review",
    complianceScore: 87,
    lastAudit: "2024-10-05",
    studentsCount: 1200,
    facultyCount: 98,
    programs: 8,
    accreditation: "Under Review"
  }
];

const mockSurveyTemplates = [
  {
    id: 1,
    title: "Student Satisfaction Survey Q1 2025",
    type: "Student Feedback",
    status: "Active",
    responseRate: 78,
    totalResponses: 2456,
    deadline: "2025-01-15",
    institutions: 12
  },
  {
    id: 2,
    title: "Faculty Development Assessment",
    type: "Faculty Assessment",
    status: "Draft",
    responseRate: 0,
    totalResponses: 0,
    deadline: "2025-01-30",
    institutions: 15
  }
];

const Regulator = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ds-primary via-ds-primary-dark to-ds-text-primary p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Governance Portal
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome, <span className="text-ds-secondary">Dr. Sarah</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
              Your comprehensive oversight platform for Sharjah's educational excellence
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Monitor institutional performance, ensure compliance, and drive educational innovation across all registered institutions in Sharjah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-ds-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setActiveTab("institutions")}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Manage Institutions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-ds-secondary/20 to-transparent rounded-full -ml-32 -mb-32"></div>
      </div>

      {/* Enhanced System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Total Institutions</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
              <Building2 className="h-4 w-4 text-ds-primary group-hover:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">24</div>
            <p className="text-xs text-ds-primary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-ds-primary mr-1.5"></div>
              +2 new registrations
            </p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Active Surveys</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
              <MessageSquare className="h-4 w-4 text-ds-primary group-hover:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">8</div>
            <p className="text-xs text-ds-text-secondary font-medium">2 due this week</p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Compliance Score</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-primary">94.2%</div>
            <p className="text-xs text-ds-primary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-ds-primary mr-1.5"></div>
              Above target (90%)
            </p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Data Submissions</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
              <BarChart3 className="h-4 w-4 text-ds-primary group-hover:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">1,847</div>
            <p className="text-xs text-ds-text-secondary font-medium">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="relative overflow-hidden bg-gradient-to-br from-ds-bg-grey-light via-white to-ds-secondary/30 rounded-2xl p-8 border border-ds-border shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-ds-text-primary mb-2">Quick Actions</h2>
            <p className="text-lg text-ds-text-secondary">Streamline your governance tasks with these essential tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1"
                 onClick={() => setActiveTab("institutions")}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg mb-4 group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                  <Building2 className="w-6 h-6 text-ds-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-ds-text-primary mb-2 group-hover:text-ds-primary transition-colors">Institution Management</h3>
                <p className="text-sm text-ds-text-secondary mb-4 leading-relaxed">Monitor and manage registered educational institutions</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg">
                  Manage Institutions
                </Button>
              </div>
            </div>

            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1"
                 onClick={() => setActiveTab("surveys")}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg mb-4 group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                  <MessageSquare className="w-6 h-6 text-ds-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-ds-text-primary mb-2 group-hover:text-ds-primary transition-colors">Survey Administration</h3>
                <p className="text-sm text-ds-text-secondary mb-4 leading-relaxed">Create and distribute surveys to educational institutions</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg">
                  Manage Surveys
                </Button>
              </div>
            </div>

            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1"
                 onClick={() => setActiveTab("analytics")}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg mb-4 group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                  <BarChart3 className="w-6 h-6 text-ds-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-ds-text-primary mb-2 group-hover:text-ds-primary transition-colors">System Analytics</h3>
                <p className="text-sm text-ds-text-secondary mb-4 leading-relaxed">View comprehensive analytics across all institutions</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg">
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-ds-primary/10 to-transparent rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ds-secondary/20 to-transparent rounded-full -ml-12 -mb-12"></div>
      </div>

      {/* Enhanced Recent Activity */}
      <Card className="border-ds-border hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <CardTitle className="text-ds-text-primary flex items-center">
            <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-lg mr-3">
              <Clock className="w-5 h-5 text-ds-primary" />
            </div>
            Recent Activity
            <Badge className="ml-auto bg-ds-secondary text-ds-primary border-ds-primary/30">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-ds-secondary/30 to-ds-secondary/10 border border-ds-border hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-ds-primary group-hover:bg-white"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ds-text-primary">New institution registration approved</p>
                <p className="text-xs text-ds-text-secondary">Dubai Medical College - 2 hours ago</p>
              </div>
              <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">Approved</Badge>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-ds-bg-grey-light border border-ds-border hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-ds-primary group-hover:bg-white"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ds-text-primary">Survey responses submitted</p>
                <p className="text-xs text-ds-text-secondary">Student Satisfaction Q1 2025 - 4 hours ago</p>
              </div>
              <Badge variant="outline" className="border-ds-border text-ds-text-secondary bg-ds-bg-grey-light">Completed</Badge>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-ds-bg-grey-light border border-ds-border hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-ds-primary group-hover:bg-white"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ds-text-primary">Compliance review required</p>
                <p className="text-xs text-ds-text-secondary">Sharjah Medical College - 6 hours ago</p>
              </div>
              <Badge variant="outline" className="border-ds-border text-ds-text-secondary bg-ds-bg-grey-light">Action Required</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced System Status */}
      <Card className="border-ds-border hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <CardTitle className="text-ds-text-primary flex items-center">
            <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg mr-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            System Status
            <Badge className="ml-auto bg-ds-secondary text-ds-primary border-ds-primary/30">All Systems Operational</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-ds-secondary/30 to-ds-secondary/10 border border-ds-border hover:shadow-md transition-all duration-200">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full">
                <div className="w-2 h-2 rounded-full bg-ds-primary"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-ds-text-primary">API Services</p>
                <p className="text-xs text-ds-text-secondary">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-ds-secondary/30 to-ds-secondary/10 border border-ds-border hover:shadow-md transition-all duration-200">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full">
                <div className="w-2 h-2 rounded-full bg-ds-primary"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-ds-text-primary">Database</p>
                <p className="text-xs text-ds-text-secondary">Connected and synced</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-ds-secondary/30 to-ds-secondary/10 border border-ds-border hover:shadow-md transition-all duration-200">
              <div className="p-2 bg-gradient-to-br from-ds-secondary to-ds-secondary/70 rounded-full">
                <div className="w-2 h-2 rounded-full bg-ds-primary"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-ds-text-primary">Survey Platform</p>
                <p className="text-xs text-ds-text-secondary">Active and responsive</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInstitutions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Institution Management</h2>
          <p className="text-ds-text-secondary">Monitor and manage registered educational institutions</p>
        </div>
        <Button className="bg-ds-primary hover:bg-ds-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Institution
        </Button>
      </div>

      <div className="space-y-4">
        {mockInstitutions.map((institution) => (
          <Card key={institution.id} className="border-ds-border hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-ds-text-primary">{institution.name}</h3>
                    <Badge variant={institution.status === "Active" ? "default" : institution.status === "Review" ? "secondary" : "destructive"}
                           className={institution.status === "Active" 
                             ? "bg-ds-secondary text-ds-primary border-ds-primary/30" 
                             : institution.status === "Review" 
                               ? "bg-ds-bg-grey-medium text-ds-text-secondary border-ds-border"
                               : ""
                           }>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        institution.status === "Active" ? "bg-active-teal-500" :
                        institution.status === "Review" ? "bg-active-orange-500" : "bg-active-rose-500"
                      }`}></div>
                      {institution.status}
                    </Badge>
                    <Badge variant="outline" className="border-ds-border text-ds-text-secondary">{institution.type}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-ds-text-secondary">Students: </span>
                      <span className="font-medium text-ds-text-primary">{institution.studentsCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-ds-text-secondary">Faculty: </span>
                      <span className="font-medium text-ds-text-primary">{institution.facultyCount}</span>
                    </div>
                    <div>
                      <span className="text-ds-text-secondary">Programs: </span>
                      <span className="font-medium text-ds-text-primary">{institution.programs}</span>
                    </div>
                    <div>
                      <span className="text-ds-text-secondary">Compliance: </span>
                      <span className={`font-medium ${institution.complianceScore >= 90 ? 'text-ds-primary' : institution.complianceScore >= 80 ? 'text-ds-text-secondary' : 'text-ds-text-secondary'}`}>
                        {institution.complianceScore}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-ds-text-muted">
                    Last audit: {institution.lastAudit} • {institution.accreditation}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">System Analytics</h2>
          <p className="text-ds-text-secondary">Comprehensive analytics across all institutions</p>
        </div>
        <Button variant="outline" className="border-ds-border hover:bg-ds-bg-grey-light">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-secondary rounded mr-2">
                <Users className="h-3 w-3 text-active-purple-600" />
              </div>
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">42,567</div>
            <p className="text-xs text-ds-text-secondary font-medium">+8.5% this year</p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-secondary rounded mr-2">
                <Users className="h-3 w-3 text-active-indigo-600" />
              </div>
              Faculty Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">2,184</div>
            <p className="text-xs text-ds-text-secondary font-medium">+12 new faculty</p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-secondary rounded mr-2">
                <Building2 className="h-3 w-3 text-active-blue-600" />
              </div>
              Total Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">347</div>
            <p className="text-xs text-ds-text-secondary">Across all institutions</p>
          </CardContent>
        </Card>
        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-secondary rounded mr-2">
                <TrendingUp className="h-3 w-3 text-ds-primary" />
              </div>
              Avg Graduation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">89.2%</div>
            <p className="text-xs text-ds-primary font-medium">Above target (85%)</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-ds-border hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <CardTitle className="text-ds-text-primary flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-ds-primary" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-ds-text-secondary bg-gradient-to-br from-ds-bg-grey-light via-white to-ds-bg-grey-light rounded-lg border border-ds-border">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-ds-primary mx-auto mb-4 opacity-50" />
              <p>System-wide analytics charts and performance trends would be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSurveys = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Survey Management</h2>
          <p className="text-ds-text-secondary">Create, distribute, and analyze institutional surveys</p>
        </div>
        <Button className="bg-ds-primary hover:bg-ds-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Create Survey
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Surveys</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {mockSurveyTemplates.filter(s => s.status === "Active").map((survey) => (
            <Card key={survey.id} className="border-ds-border hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-ds-text-primary">{survey.title}</h3>
                      <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-active-teal-500 mr-1"></div>
                        {survey.status}
                      </Badge>
                      <Badge variant="outline" className="border-ds-border text-ds-text-secondary">{survey.type}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-ds-text-secondary">Response Rate: </span>
                        <span className="font-medium text-ds-text-primary">{survey.responseRate}%</span>
                      </div>
                      <div>
                        <span className="text-ds-text-secondary">Responses: </span>
                        <span className="font-medium text-ds-text-primary">{survey.totalResponses}</span>
                      </div>
                      <div>
                        <span className="text-ds-text-secondary">Institutions: </span>
                        <span className="font-medium text-ds-text-primary">{survey.institutions}</span>
                      </div>
                      <div>
                        <span className="text-ds-text-secondary">Deadline: </span>
                        <span className="font-medium text-ds-text-primary">{survey.deadline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Results
                    </Button>
                    <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light">
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HorizontalServiceCard
              title="Student Feedback Template"
              icon={MessageSquare}
              onCardClick={() => console.log("Student template clicked")}
            />
            <HorizontalServiceCard
              title="Faculty Assessment Template"
              icon={Users}
              onCardClick={() => console.log("Faculty template clicked")}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-8 text-ds-text-secondary">
            No completed surveys to display
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAdministration = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ds-text-primary">System Administration</h2>
        <p className="text-ds-text-secondary">Manage system settings, users, and platform configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HorizontalServiceCard
          title="User Management"
          icon={Users}
          onCardClick={() => console.log("User Management clicked")}
        />
        <HorizontalServiceCard
          title="System Settings"
          icon={Settings}
          onCardClick={() => console.log("System Settings clicked")}
        />
        <HorizontalServiceCard
          title="Security & Permissions"
          icon={Shield}
          onCardClick={() => console.log("Security clicked")}
        />
        <HorizontalServiceCard
          title="Platform Configuration"
          icon={Database}
          onCardClick={() => console.log("Configuration clicked")}
        />
      </div>

      <Card className="border-ds-border hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <CardTitle className="text-ds-text-primary flex items-center">
            <Shield className="w-5 h-5 mr-2 text-ds-primary" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-ds-text-primary">Platform Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">API Services</span>
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-ds-primary mr-1"></div>
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">Database</span>
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-ds-primary mr-1"></div>
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">File Storage</span>
                  <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-ds-primary mr-1"></div>
                    Operational
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-ds-text-primary">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">Uptime</span>
                  <span className="text-sm font-medium text-ds-primary">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">Avg Response Time</span>
                  <span className="text-sm font-medium text-ds-primary">156ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ds-text-secondary">Active Users</span>
                  <span className="text-sm font-medium text-ds-primary">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "institutions":
        return renderInstitutions();
      case "analytics":
        return renderAnalytics();
      case "surveys":
        return renderSurveys();
      case "administration":
        return renderAdministration();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg via-ds-bg to-ds-bg-grey-light">
      <UnifiedTopNav
        logoSrc="https://ec.shj.ae/wp-content/themes/sec/assets/images/logo.svg"
        logoAlt="Government of Sharjah Logo"
        title="Governance Portal"
        subtitle="Sharjah's Council for Higher Education and Scientific Research"
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Dr. Sarah Al-Zahra"
        userRole="Governance Officer"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-ds-text-primary to-ds-text-primary/90 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://ec.shj.ae/wp-content/themes/sec/assets/images/logo.svg" 
                  alt="Government of Sharjah Logo" 
                  className="h-8 w-auto filter brightness-0 invert"
                />
                <span className="text-xl font-bold">Governance Portal</span>
              </div>
              <p className="text-gray-300 text-sm">
                Smart Education Governance Platform for advancing academic excellence in Sharjah.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Institution Oversight</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Survey Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance Monitoring</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support & Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2025 Government of Sharjah. All rights reserved.
            <div className="mt-1 text-xs text-gray-400">Leading educational excellence and innovation</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Regulator;
