import { useState } from "react";
import { UnifiedTopNav } from "@/components/UnifiedTopNav";
import ServiceCard from "@/components/ServiceCard";
import HorizontalServiceCard from "@/components/HorizontalServiceCard";
import { LogTable } from "@/components/LogTable";
import { LogFilters } from "@/components/LogFilters";
import { LogDetailsModal } from "@/components/LogDetailsModal";
import { ApiKeyGenerationModal } from "@/components/ApiKeyGenerationModal";
import { SurveyDistributionModal } from "@/components/SurveyDistributionModal";
import { SurveyPreviewModal } from "@/components/SurveyPreviewModal";
import { SurveysList } from "@/components/SurveysList";
import { ResponseDashboard } from "@/components/ResponseDashboard";
import { EnhancedFilters } from "@/components/filters/EnhancedFilters";
import { CompactFilters } from "@/components/CompactFilters";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { InstitutionalKPIDashboard } from "@/components/analytics/institutional/InstitutionalKPIDashboard";
import { TicketCreationModal } from "@/components/support/TicketCreationModal";
import { MeetingBookingModal } from "@/components/support/MeetingBookingModal";
import { SupportDashboard } from "@/components/support/SupportDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, BarChart3, Key, MessageSquare, FileText, Database, 
  Plus, Upload, Download, Settings, Users, TrendingUp, Clock,
  CheckCircle, AlertTriangle, Eye, Edit, Trash2, BookOpen,
  HelpCircle, Phone, GraduationCap, Shield, ArrowRight, Zap,
  Ticket, CalendarIcon
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", value: "dashboard" },
  { title: "API Management", value: "api" },
  { title: "Surveys", value: "surveys" },
  { title: "Analytics", value: "analytics" },
  { title: "Logs", value: "logs" },
  { title: "Support", value: "support" },
];

// Mock data
const mockApiKeys = [
  {
    id: 1,
    name: "Production API Key",
    type: "production",
    keyPreview: "sk_live_•••••••••••••••••••••••••••••••••••••••••••••",
    status: "active",
    lastUsed: "2025-01-02",
    expiresAt: "2025-12-31",
    permissions: ["read", "write"]
  },
  {
    id: 2,
    name: "Test API Key",
    type: "test",
    keyPreview: "sk_test_•••••••••••••••••••••••••••••••••••••••••••••",
    status: "active",
    lastUsed: "2025-01-01",
    expiresAt: "2025-06-30",
    permissions: ["read"]
  }
];

const mockApiLogs = [
  {
    id: 1,
    method: "POST",
    endpoint: "/api/v1/students",
    statusCode: 201,
    duration: 234,
    timestamp: "2025-01-02T10:30:00Z",
    tokenId: "sk_live_abc123",
    requestSize: 2.1,
    responseSize: 0.8,
    requestHeaders: { "Content-Type": "application/json" },
    requestBody: { name: "John Doe", email: "john@example.com" },
    responseHeaders: { "Content-Type": "application/json" },
    responseBody: { id: 123, status: "created" }
  },
  {
    id: 2,
    method: "GET",
    endpoint: "/api/v1/analytics",
    statusCode: 401,
    duration: 45,
    timestamp: "2025-01-02T09:15:00Z",
    tokenId: "sk_test_xyz789",
    requestSize: 0.1,
    responseSize: 0.3,
    errorMessage: "Invalid API key provided",
    requestHeaders: { "Authorization": "Bearer invalid_token" },
    responseHeaders: { "Content-Type": "application/json" },
    responseBody: { error: "Unauthorized" }
  }
];

const mockActivityLogs = [
  {
    id: 1,
    action: "API Key Generated",
    resource: "api_keys",
    userName: "Shadia Alzaatary",
    timestamp: "2025-01-02T10:00:00Z",
    ipAddress: "192.168.1.100",
    sessionId: "sess_abc123xyz789",
    userAgent: "Mozilla/5.0...",
    details: { keyType: "production", permissions: ["read", "write"] }
  },
  {
    id: 2,
    action: "Survey Submitted",
    resource: "surveys",
    userName: "Shadia Alzaatary",
    timestamp: "2025-01-01T15:30:00Z",
    ipAddress: "192.168.1.100",
    sessionId: "sess_def456uvw",
    userAgent: "Mozilla/5.0...",
    details: { surveyId: "survey_123", responseCount: 15 }
  }
];

const Institution = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedLog, setSelectedLog] = useState(null);
  const [logDetailsOpen, setLogDetailsOpen] = useState(false);
  const [logType, setLogType] = useState<'api' | 'activity'>('api');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyType, setApiKeyType] = useState<"production" | "test">("production");
  const [logFilters, setLogFilters] = useState({});
  
  // New survey-related state
  const [distributionModalOpen, setDistributionModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [responseDashboardOpen, setResponseDashboardOpen] = useState(false);
  const [surveyViewMode, setSurveyViewMode] = useState<'list' | 'responses'>('list');
  const [surveyPreviewOpen, setSurveyPreviewOpen] = useState(false);

  // New filter states
  const [dashboardFilters, setDashboardFilters] = useState({});
  const [surveyFilters, setSurveyFilters] = useState({});

  // New support-related state
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [supportTickets, setSupportTickets] = useState([
    {
      id: "TKT-123456",
      category: "technical",
      priority: "medium",
      subject: "API Integration Issue",
      description: "Having trouble with student data sync API",
      status: "open",
      createdAt: "2025-01-01T10:00:00Z",
      updatedAt: "2025-01-01T10:00:00Z",
      contactEmail: "admin@sharjah.ac.ae"
    }
  ]);
  const [supportMeetings, setSupportMeetings] = useState([
    {
      id: "MTG-654321",
      meetingType: "technical",
      duration: "60",
      timeSlot: "14:00",
      subject: "API Training Session",
      date: "2025-01-10T14:00:00Z",
      status: "scheduled",
      attendeeName: "Shadia Alzaatary",
      attendeeEmail: "shadia@sharjah.ac.ae"
    }
  ]);
  const [supportViewMode, setSupportViewMode] = useState<'overview' | 'dashboard'>('overview');

  const handleViewLogDetails = (log: any) => {
    setSelectedLog(log);
    setLogDetailsOpen(true);
  };

  const handleGenerateApiKey = (key: string, expiresAt: string) => {
    console.log("Generated API Key:", key, "Expires:", expiresAt);
  };

  const handleExportLogs = () => {
    console.log("Exporting logs with filters:", logFilters);
  };

  const handleDistributeSurvey = (survey: any) => {
    setSelectedSurvey(survey);
    setDistributionModalOpen(true);
  };

  const handleViewResponses = (survey: any) => {
    setSelectedSurvey(survey);
    setSurveyViewMode('responses');
  };

  const handleViewSurvey = (survey: any) => {
    setSelectedSurvey(survey);
    setSurveyPreviewOpen(true);
  };

  const handleSurveyDistributed = (distributionData: any) => {
    console.log("Survey distributed:", distributionData);
    // Update survey status and refresh list
  };

  const handleSendReminder = (reminderData: any) => {
    console.log("Reminder sent:", reminderData);
    // Handle reminder sending logic
  };

  const handleBackToSurveyList = () => {
    setSurveyViewMode('list');
    setSelectedSurvey(null);
  };

  const handleTicketCreated = (ticket: any) => {
    setSupportTickets(prev => [...prev, ticket]);
  };

  const handleMeetingBooked = (meeting: any) => {
    setSupportMeetings(prev => [...prev, meeting]);
  };

  const handleViewTicket = (ticket: any) => {
    console.log("View ticket:", ticket);
    // Open ticket details modal
  };

  const handleViewMeeting = (meeting: any) => {
    console.log("View meeting:", meeting);
    // Open meeting details modal
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Reduced Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ds-bg-grey-light via-ds-bg-grey-light to-ds-secondary/10 p-6 md:p-8 text-ds-text-primary shadow-md border border-ds-border/50">
        <div className="absolute inset-0 bg-ds-secondary/5"></div>
        <div className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-ds-primary/10 backdrop-blur-sm rounded-xl border border-ds-primary/20">
                <Building2 className="w-7 h-7 text-ds-primary" />
              </div>
              <Badge className="bg-ds-primary/10 text-ds-primary border-ds-primary/30 backdrop-blur-sm">
                Institution Portal
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-ds-text-primary">
              Welcome back, <span className="text-ds-primary">Shadia</span>
            </h1>
            <p className="text-lg md:text-xl text-ds-text-secondary mb-4 leading-relaxed">
              Your comprehensive data management hub for Sharjah Education Academy
            </p>
            <p className="text-base text-ds-text-muted mb-6 max-w-2xl">
              Streamline your institutional data, manage API integrations, and stay compliant with government requirements—all from one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-ds-primary text-white hover:bg-ds-primary-dark font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setActiveTab("analytics")}
              >
                <Zap className="w-5 h-5 mr-2" />
                View Analytics
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-ds-primary text-ds-primary bg-transparent hover:bg-ds-primary hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setActiveTab("surveys")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                View Surveys
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-ds-secondary/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-ds-primary/10 to-transparent rounded-full -ml-32 -mb-32"></div>
      </div>

      {/* Dashboard Filters - Updated to use CompactFilters */}
      <CompactFilters
        type="dashboard"
        filters={dashboardFilters}
        onFiltersChange={setDashboardFilters}
        onRefresh={() => console.log("Refreshing dashboard data")}
        onExport={() => console.log("Exporting dashboard data")}
      />

      {/* Enhanced Data Sync Stats with Supporting Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Records Synced Today</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg">
              <Database className="h-4 w-4 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-blue))' }} />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-bg-grey-light/50 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-text-primary">1,247</div>
            <p className="text-xs text-ds-text-primary font-medium">
              All synced successfully
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Full Load Status</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg">
              <Clock className="h-4 w-4 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-orange))' }} />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-bg-grey-light/50 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-text-primary">Completed</div>
            <p className="text-xs text-ds-text-secondary font-medium">
              Last run: Jan 1, 2025
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Incremental Updates</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg">
              <TrendingUp className="h-4 w-4 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-purple))' }} />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-bg-grey-light/50 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-text-primary">12</div>
            <p className="text-xs text-ds-text-secondary font-medium">
              updates today
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">Data Quality Score</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg">
              <CheckCircle className="h-4 w-4 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-teal))' }} />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-bg-grey-light/50 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-text-primary">99.2%</div>
            <p className="text-xs text-ds-primary font-medium">
              Excellent quality
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">API Requests Today</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg">
              <BarChart3 className="h-4 w-4 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-indigo))' }} />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-bg-grey-light/50 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-text-primary">2,845</div>
            <p className="text-xs text-ds-text-secondary font-medium">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary group-hover:text-ds-primary transition-colors">System Health</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg">
              <Shield className="h-4 w-4 text-white hover:scale-110 transition-transform duration-200" />
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-ds-secondary/30 to-white rounded-b-lg">
            <div className="text-2xl font-bold text-ds-primary">Optimal</div>
            <p className="text-xs text-ds-primary font-medium">
              All systems running
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compact Resource Center with LEFT-ALIGNED heading */}
      <div className="relative overflow-hidden bg-gradient-to-br from-ds-bg-grey-light via-white to-ds-bg-grey-medium rounded-xl p-4 border border-ds-border shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-full mr-3 shadow-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-ds-text-primary">Resource Center</h2>
            </div>
            <p className="text-sm text-ds-text-secondary max-w-2xl">Everything you need to succeed with your institution's data management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg mb-2 shadow-lg transition-all duration-300" style={{ backgroundColor: 'hsl(var(--active-blue))' }}>
                  <HelpCircle className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-base font-semibold text-ds-text-primary mb-1 group-hover:text-ds-primary transition-colors">Help Center</h3>
                <p className="text-xs text-ds-text-secondary mb-2 leading-relaxed">Knowledge base, FAQs, and training tutorials</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg text-xs py-1">
                  Get Help
                </Button>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg mb-2 shadow-lg transition-all duration-300" style={{ backgroundColor: 'hsl(var(--active-purple))' }}>
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-base font-semibold text-ds-text-primary mb-1 group-hover:text-ds-primary transition-colors">Documentation</h3>
                <p className="text-xs text-ds-text-secondary mb-2 leading-relaxed">API docs, guides, and webinars</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg text-xs py-1">
                  View Docs
                </Button>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-ds-border cursor-pointer transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg mb-2 shadow-lg transition-all duration-300" style={{ backgroundColor: 'hsl(var(--active-orange))' }}>
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-base font-semibold text-ds-text-primary mb-1 group-hover:text-ds-primary transition-colors">Contact Support</h3>
                <p className="text-xs text-ds-text-secondary mb-2 leading-relaxed">Get direct support from our team</p>
                <Button className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white rounded-lg transform transition-all duration-300 group-hover:shadow-lg text-xs py-1">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Reduced Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-ds-primary/10 to-transparent rounded-full -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-ds-secondary/20 to-transparent rounded-full -ml-6 -mb-6"></div>
      </div>

      {/* Enhanced Recent Activity */}
      <Card className="border-ds-border hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <CardTitle className="text-xl font-bold text-ds-text-primary flex items-center">
            <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-lg mr-3">
              <Clock className="w-5 h-5 hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--active-rose))' }} />
            </div>
            Recent Activity
            <Badge className="ml-auto bg-ds-secondary text-ds-primary border-ds-primary/30">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-gradient-to-br from-white to-ds-bg-grey-light/30">
          <div className="space-y-0">
            {mockActivityLogs.slice(0, 5).map((log, index) => (
              <div key={log.id} className="flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-ds-bg-grey-light hover:to-transparent transition-all duration-200 group border-b border-ds-border/50 last:border-b-0">
                <div className="p-2 bg-gradient-to-br from-ds-bg-grey-light to-ds-bg-grey-medium rounded-full group-hover:from-ds-primary group-hover:to-ds-primary-dark transition-all duration-300">
                  <div className={`w-2 h-2 rounded-full ${
                    index % 6 === 0 ? 'bg-active-blue' : 
                    index % 6 === 1 ? 'bg-active-purple' : 
                    index % 6 === 2 ? 'bg-active-teal' :
                    index % 6 === 3 ? 'bg-active-orange' :
                    index % 6 === 4 ? 'bg-active-indigo' :
                    'bg-active-rose'
                  } group-hover:bg-white`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ds-text-primary group-hover:text-ds-primary transition-colors">{log.action}</p>
                  <p className="text-xs text-ds-text-muted">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
                <Badge variant="outline" className="border-ds-border text-ds-text-secondary bg-ds-bg-grey-light group-hover:bg-white transition-colors">
                  {log.resource}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApiManagement = () => (
    <div className="space-y-6">
      {/* API Keys Section */}
      <Card className="border-ds-border hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="bg-gradient-to-r from-ds-bg-grey-light to-white border-b border-ds-border">
          <div className="flex justify-between items-center">
            <CardTitle className="text-ds-text-primary flex items-center">
              <Key className="w-5 h-5 mr-2 text-ds-primary" />
              API Keys
            </CardTitle>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => { setApiKeyType("test"); setApiKeyModalOpen(true); }}
                className="border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate Test Key
              </Button>
              <Button 
                onClick={() => { setApiKeyType("production"); setApiKeyModalOpen(true); }}
                className="bg-ds-primary hover:bg-ds-primary-dark shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate Production Key
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-br from-white to-ds-bg-grey-light/30">
          <div className="space-y-4">
            {mockApiKeys.map((apiKey, index) => (
              <div key={apiKey.id} className="border border-ds-border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-ds-text-primary">{apiKey.name}</span>
                      <Badge variant={apiKey.type === "production" ? "default" : "secondary"} 
                             className={apiKey.type === "production" 
                               ? "bg-ds-secondary text-ds-primary border-ds-primary/30" 
                               : "bg-ds-bg-grey-medium text-ds-text-secondary border-ds-border"
                             }>
                        {apiKey.type}
                      </Badge>
                      <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                        {apiKey.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-ds-text-secondary font-mono bg-ds-bg-grey-light p-2 rounded border border-ds-border">
                      {apiKey.keyPreview}
                    </div>
                    <div className="text-xs text-ds-text-muted">
                      Last used: {apiKey.lastUsed} • Expires: {apiKey.expiresAt}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200">
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <BarChart3 className="h-3 w-3" style={{ color: 'hsl(var(--active-blue))' }} />
              </div>
              Requests Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">2,845</div>
            <p className="text-xs text-ds-text-secondary font-medium">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <CheckCircle className="h-3 w-3" style={{ color: 'hsl(var(--active-teal))' }} />
              </div>
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">98.2%</div>
            <p className="text-xs text-ds-primary font-medium">
              Excellent performance
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <Clock className="h-3 w-3" style={{ color: 'hsl(var(--active-orange))' }} />
              </div>
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">156ms</div>
            <p className="text-xs text-ds-text-secondary font-medium">
              Within target
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSurveys = () => {
    if (surveyViewMode === 'responses' && selectedSurvey) {
      return (
        <div className="space-y-6">
          {/* Response Dashboard Filters */}
          <CompactFilters
            type="responses"
            filters={surveyFilters}
            onFiltersChange={setSurveyFilters}
            onRefresh={() => console.log("Refreshing response data")}
            onExport={() => console.log("Exporting response data")}
          />
          <ResponseDashboard
            survey={selectedSurvey}
            onClose={handleBackToSurveyList}
            onViewIndividualResponse={(responseId) => console.log("View response:", responseId)}
            onSendReminder={handleSendReminder}
            onExportData={() => console.log("Export data")}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <SurveysList
          onDistributeSurvey={handleDistributeSurvey}
          onViewResponses={handleViewResponses}
          onViewSurvey={handleViewSurvey}
          onSendReminder={handleSendReminder}
        />
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <InstitutionalKPIDashboard />
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <Tabs value={logType} onValueChange={(value: any) => setLogType(value)}>
        <TabsList className="bg-ds-bg-grey-light border border-ds-border">
          <TabsTrigger value="api" className="data-[state=active]:bg-white data-[state=active]:text-ds-primary">API Logs</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-ds-primary">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api" className="space-y-4">
          <LogFilters 
            type="api" 
            filters={logFilters} 
            onFiltersChange={setLogFilters}
            onExport={handleExportLogs}
          />
          <LogTable 
            logs={mockApiLogs} 
            type="api" 
            onViewDetails={handleViewLogDetails}
          />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <LogFilters 
            type="activity" 
            filters={logFilters} 
            onFiltersChange={setLogFilters}
            onExport={handleExportLogs}
          />
          <LogTable 
            logs={mockActivityLogs} 
            type="activity" 
            onViewDetails={handleViewLogDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderSupport = () => {
    if (supportViewMode === 'dashboard') {
      return (
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ds-text-primary">Support Center</h2>
              <p className="text-ds-text-secondary">Manage your tickets and meetings</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setSupportViewMode('overview')}
              className="border-ds-border hover:bg-ds-bg-grey-light transition-all duration-200"
            >
              Back to Overview
            </Button>
          </div>

          <SupportDashboard
            tickets={supportTickets}
            meetings={supportMeetings}
            onViewTicket={handleViewTicket}
            onViewMeeting={handleViewMeeting}
          />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Main Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-ds-text-primary">Support Center</h1>
          <p className="text-lg text-ds-text-secondary max-w-2xl mx-auto">
            Get the help you need with our comprehensive support resources and dedicated assistance team
          </p>
        </div>

        {/* Quick Actions Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-ds-text-primary">Quick Actions</h2>
          </div>
          <p className="text-sm text-ds-text-secondary mb-6">Start here for immediate assistance</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
              onClick={() => setTicketModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-3 relative z-10">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-ds-text-primary group-hover:text-ds-primary transition-colors">Create Ticket</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 relative z-10">
                <p className="text-sm text-ds-text-secondary">Report issues and get technical support</p>
              </CardContent>
            </Card>

            <Card 
              className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
              onClick={() => setMeetingModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-3 relative z-10">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-ds-text-primary group-hover:text-ds-primary transition-colors">Book Meeting</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 relative z-10">
                <p className="text-sm text-ds-text-secondary">Schedule consultation with our experts</p>
              </CardContent>
            </Card>

            <Card 
              className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
              onClick={() => setSupportViewMode('dashboard')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-3 relative z-10">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-ds-text-primary group-hover:text-ds-primary transition-colors">My Tickets</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 relative z-10">
                <p className="text-sm text-ds-text-secondary">View and manage your support requests</p>
              </CardContent>
            </Card>

            <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-3 relative z-10">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-ds-text-primary group-hover:text-ds-primary transition-colors">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 relative z-10">
                <p className="text-sm text-ds-text-secondary">24/7 emergency technical assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Overview Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-ds-text-primary">Support Overview</h2>
          </div>
          <p className="text-sm text-ds-text-secondary mb-6">Your current support status and statistics</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
                  <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                    <Ticket className="w-4 h-4" style={{ color: 'hsl(var(--active-orange))' }} />
                  </div>
                  Active Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ds-text-primary">{supportTickets.filter(t => t.status !== 'closed').length}</div>
                <p className="text-xs text-ds-text-secondary">Currently being processed</p>
              </CardContent>
            </Card>

            <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
                  <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                    <CalendarIcon className="w-4 h-4" style={{ color: 'hsl(var(--active-blue))' }} />
                  </div>
                  Scheduled Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ds-text-primary">{supportMeetings.filter(m => m.status === 'scheduled').length}</div>
                <p className="text-xs text-ds-text-secondary">Upcoming consultations</p>
              </CardContent>
            </Card>

            <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
                  <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                    <Clock className="w-4 h-4 text-ds-primary" />
                  </div>
                  Avg Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ds-primary">2.4hrs</div>
                <p className="text-xs text-ds-primary">Faster than industry average</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Self-Service Resources Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-ds-text-primary">Self-Service Resources</h2>
            </div>
            <p className="text-base text-ds-text-secondary max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive knowledge base and documentation to find answers quickly and learn more about our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-ds-text-primary group-hover:text-ds-primary transition-colors mb-2">Help Center & Documentation</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 relative z-10 pb-6">
                  <p className="text-sm text-ds-text-secondary leading-relaxed mb-4">
                    Access our comprehensive knowledge base, step-by-step guides, FAQs, and video tutorials to get the most out of our platform
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      User Guides
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      FAQs
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      Video Tutorials
                    </Badge>
                  </div>
                  <Button 
                    className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white transition-all duration-300 group-hover:shadow-lg"
                    onClick={() => console.log("Help Center clicked")}
                  >
                    Browse Help Center
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ds-secondary/10 to-ds-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-ds-text-primary group-hover:text-ds-primary transition-colors mb-2">API Documentation</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 relative z-10 pb-6">
                  <p className="text-sm text-ds-text-secondary leading-relaxed mb-4">
                    Complete API reference with endpoints, authentication guides, code examples, and integration tutorials for developers
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      API Reference
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      Code Examples
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-ds-bg-grey-light text-ds-text-primary border-ds-border">
                      SDKs
                    </Badge>
                  </div>
                  <Button 
                    className="w-full bg-ds-primary hover:bg-ds-primary-dark text-white transition-all duration-300 group-hover:shadow-lg"
                    onClick={() => console.log("API Documentation clicked")}
                  >
                    View API Docs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-ds-text-primary">Direct Contact</h2>
          </div>
          <p className="text-sm text-ds-text-secondary mb-6">Reach out to our team directly for specialized support</p>

          <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-ds-border hover:shadow-md transition-all duration-200">
                    <h3 className="font-medium text-ds-text-primary mb-2 flex items-center">
                      <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                        <Phone className="w-4 h-4" style={{ color: 'hsl(var(--active-blue))' }} />
                      </div>
                      Technical Support
                    </h3>
                    <p className="text-sm text-ds-text-secondary mb-2">For API integration and technical issues</p>
                    <p className="text-sm text-ds-primary font-medium">tech-support@sharjah.ac.ae</p>
                    <p className="text-sm text-ds-primary">+971 6 505 0555</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-ds-border hover:shadow-md transition-all duration-200">
                    <h3 className="font-medium text-ds-text-primary mb-2 flex items-center">
                      <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                        <MessageSquare className="w-4 h-4" style={{ color: 'hsl(var(--active-teal))' }} />
                      </div>
                      General Inquiries
                    </h3>
                    <p className="text-sm text-ds-text-secondary mb-2">For general questions and support</p>
                    <p className="text-sm text-ds-primary font-medium">info@sharjah.ac.ae</p>
                    <p className="text-sm text-ds-primary">+971 6 505 0000</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-ds-border hover:shadow-md transition-all duration-200">
                    <h3 className="font-medium text-ds-text-primary mb-2 flex items-center">
                      <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                        <AlertTriangle className="w-4 h-4" style={{ color: 'hsl(var(--active-rose))' }} />
                      </div>
                      Emergency Support
                    </h3>
                    <p className="text-sm text-ds-text-secondary mb-2">24/7 emergency technical assistance</p>
                    <p className="text-sm text-ds-primary font-medium">emergency@sharjah.ac.ae</p>
                    <p className="text-sm text-ds-primary">+971 50 XXX XXXX</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-ds-secondary to-ds-bg-grey-light rounded-lg border border-ds-border">
                    <h3 className="font-medium text-ds-primary mb-2">Office Hours</h3>
                    <div className="text-sm text-ds-text-secondary space-y-1">
                      <p><strong>Sunday - Thursday:</strong> 8:00 AM - 5:00 PM</p>
                      <p><strong>Friday:</strong> 8:00 AM - 12:00 PM</p>
                      <p><strong>Saturday:</strong> Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "api":
        return renderApiManagement();
      case "surveys":
        return renderSurveys();
      case "analytics":
        return renderAnalytics();
      case "logs":
        return renderLogs();
      case "support":
        return renderSupport();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg via-ds-bg to-ds-bg-grey-light">
      <UnifiedTopNav
        logoSrc="https://seabackend.creatrixcampus.com/uploads/img/logo.png"
        logoAlt="SEA Logo"
        title="Institution Portal"
        subtitle="Sharjah Education Academy"
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Shadia Alzaatary"
        userRole="Director, Institutional Effectiveness & QA"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Modals */}
      <ApiKeyGenerationModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        keyType={apiKeyType}
        onKeyGenerated={handleGenerateApiKey}
      />

      <SurveyDistributionModal
        isOpen={distributionModalOpen}
        onClose={() => setDistributionModalOpen(false)}
        survey={selectedSurvey}
        onDistribute={handleSurveyDistributed}
      />

      <SurveyPreviewModal
        isOpen={surveyPreviewOpen}
        onClose={() => setSurveyPreviewOpen(false)}
        survey={selectedSurvey}
      />

      <LogDetailsModal
        isOpen={logDetailsOpen}
        onClose={() => setLogDetailsOpen(false)}
        log={selectedLog}
        type={logType}
      />

      {/* New Support Modals */}
      <TicketCreationModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        onTicketCreated={handleTicketCreated}
      />

      <MeetingBookingModal
        isOpen={meetingModalOpen}
        onClose={() => setMeetingModalOpen(false)}
        onMeetingBooked={handleMeetingBooked}
      />

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-ds-text-primary to-ds-text-primary/90 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-300">
            © 2025 Sharjah Education Academy. All rights reserved.
            <div className="mt-1 text-xs text-gray-400">Empowering education through innovative technology</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Institution;
