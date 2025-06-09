import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SurveyStatsOverview } from "./SurveyStatsOverview";
import { ReminderManagement } from "./ReminderManagement";
import { CompactFilters } from "./CompactFilters";
import { 
  FileText, 
  Send, 
  BarChart3, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  Eye
} from "lucide-react";

interface Survey {
  id: string;
  title: string;
  type: "GDS" | "ESS" | "SES";
  description: string;
  status: "pending" | "distributed" | "active" | "completed";
  deadline: string;
  createdBy: string;
  receivedDate: string;
  distributedTo?: number;
  responseRate?: number;
  totalResponses?: number;
}

interface SurveysListProps {
  onDistributeSurvey: (survey: Survey) => void;
  onViewResponses: (survey: Survey) => void;
  onViewSurvey: (survey: Survey) => void;
  onSendReminder: (reminderData: any) => void;
}

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Graduate Destination Survey Q1 2025",
    type: "GDS",
    description: "Track employment outcomes and career paths of recent graduates",
    status: "pending",
    deadline: "2025-02-15",
    createdBy: "Sharjah Council For Higher Education & Scientific Research",
    receivedDate: "2025-01-02",
  },
  {
    id: "2",
    title: "Student Experience Survey Fall 2024",
    type: "SES",
    description: "Assess student satisfaction and experience across all programs",
    status: "active",
    deadline: "2025-01-20",
    createdBy: "Sharjah Council For Higher Education & Scientific Research",
    receivedDate: "2024-12-15",
    distributedTo: 3247,
    responseRate: 68,
    totalResponses: 2208
  },
  {
    id: "3",
    title: "Employer Satisfaction Survey 2024",
    type: "ESS",
    description: "Evaluate employer satisfaction with graduate preparedness",
    status: "distributed",
    deadline: "2025-01-30",
    createdBy: "Sharjah Council For Higher Education & Scientific Research",
    receivedDate: "2024-12-20",
    distributedTo: 156,
    responseRate: 23,
    totalResponses: 36
  },
  {
    id: "4",
    title: "Graduate Destination Survey 2024 Annual",
    type: "GDS",
    description: "Annual comprehensive graduate tracking and outcomes assessment",
    status: "completed",
    deadline: "2024-12-31",
    createdBy: "Sharjah Council For Higher Education & Scientific Research",
    receivedDate: "2024-11-01",
    distributedTo: 1842,
    responseRate: 89,
    totalResponses: 1640
  }
];

export const SurveysList = ({ onDistributeSurvey, onViewResponses, onViewSurvey, onSendReminder }: SurveysListProps) => {
  const [surveys] = useState<Survey[]>(mockSurveys);
  const [filters, setFilters] = useState({});

  // Calculate statistics
  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter(s => s.status === "active").length;
  const completedSurveys = surveys.filter(s => s.status === "completed").length;
  const pendingDistribution = surveys.filter(s => s.status === "pending").length;
  const averageResponseRate = Math.round(
    surveys.filter(s => s.responseRate).reduce((acc, s) => acc + (s.responseRate || 0), 0) / 
    surveys.filter(s => s.responseRate).length
  );
  const totalResponses = surveys.reduce((acc, s) => acc + (s.totalResponses || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "distributed": return "bg-blue-100 text-blue-800 border-blue-300";
      case "active": return "bg-green-100 text-green-800 border-green-300";
      case "completed": return "bg-gray-100 text-gray-800 border-gray-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "distributed": return <Send className="w-4 h-4" />;
      case "active": return <Users className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSurveyTypeColor = (type: string) => {
    switch (type) {
      case "GDS": return "bg-purple-100 text-purple-800 border-purple-300";
      case "ESS": return "bg-blue-100 text-blue-800 border-blue-300";
      case "SES": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would typically apply the filters to the surveys
    console.log('Filters changed:', newFilters);
  };

  const handleRefresh = () => {
    // Here you would typically refetch the surveys data
    console.log('Refreshing surveys...');
  };

  const handleExport = () => {
    // Here you would typically export the surveys data
    console.log('Exporting surveys...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Survey Management</h2>
          <p className="text-ds-text-secondary">Manage and track all survey activities and responses</p>
        </div>
        <Badge variant="outline" className="text-ds-text-secondary">
          {surveys.length} Total Surveys
        </Badge>
      </div>

      {/* Compact Filters */}
      <CompactFilters
        type="surveys"
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* Survey Statistics Overview */}
      <SurveyStatsOverview
        totalSurveys={totalSurveys}
        activeSurveys={activeSurveys}
        completedSurveys={completedSurveys}
        pendingDistribution={pendingDistribution}
        averageResponseRate={averageResponseRate}
        totalResponses={totalResponses}
      />

      <div className="grid gap-6">
        {surveys.map((survey) => {
          const daysUntilDeadline = getDaysUntilDeadline(survey.deadline);
          
          return (
            <Card key={survey.id} className="transition-all duration-200 hover:shadow-lg border-ds-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <Badge className={getSurveyTypeColor(survey.type)}>
                        {survey.type}
                      </Badge>
                      <Badge className={getStatusColor(survey.status)}>
                        {getStatusIcon(survey.status)}
                        <span className="ml-1 capitalize">{survey.status}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{survey.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-ds-text-secondary">Created by:</span>
                    <p className="text-ds-text-primary">{survey.createdBy}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ds-text-secondary">Received:</span>
                    <p className="text-ds-text-primary">{new Date(survey.receivedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ds-text-secondary">Deadline:</span>
                    <p className="text-ds-text-primary">
                      {new Date(survey.deadline).toLocaleDateString()}
                      {daysUntilDeadline > 0 && (
                        <span className="text-xs block text-ds-text-secondary">
                          ({daysUntilDeadline} days left)
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-ds-text-secondary">Status:</span>
                    <p className="text-ds-text-primary capitalize">{survey.status}</p>
                  </div>
                </div>

                {survey.status !== "pending" && survey.distributedTo && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-ds-text-secondary">Response Progress</span>
                      <span className="text-ds-text-primary">
                        {survey.totalResponses} / {survey.distributedTo} responses ({survey.responseRate}%)
                      </span>
                    </div>
                    <Progress value={survey.responseRate} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-ds-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewSurvey(survey)}
                    className="border-ds-border hover:bg-ds-bg-grey-light"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Survey
                  </Button>
                  
                  <div className="flex space-x-2">
                    {survey.status === "pending" && (
                      <Button
                        onClick={() => onDistributeSurvey(survey)}
                        className="bg-ds-primary hover:bg-ds-primary-dark"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Distribute
                      </Button>
                    )}
                    
                    {(survey.status === "active" || survey.status === "distributed") && (
                      <ReminderManagement 
                        survey={survey} 
                        onSendReminder={onSendReminder}
                      />
                    )}
                    
                    {(survey.status === "active" || survey.status === "distributed" || survey.status === "completed") && (
                      <Button
                        variant="outline"
                        onClick={() => onViewResponses(survey)}
                        className="border-ds-primary text-ds-primary hover:bg-ds-secondary"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
