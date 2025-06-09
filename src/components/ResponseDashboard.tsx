import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  Clock, 
  Download, 
  RefreshCw,
  TrendingUp,
  ArrowLeft,
  Eye,
  Mail,
  CheckCircle,
  Timer,
  PieChart,
  Activity
} from "lucide-react";

interface Survey {
  id: string;
  title: string;
  type: "GDS" | "ESS" | "SES";
  status: string;
  distributedTo: number;
  responseRate: number;
  totalResponses: number;
  deadline: string;
}

interface ResponseDashboardProps {
  survey: Survey;
  onClose: () => void;
  onViewIndividualResponse: (responseId: string) => void;
  onSendReminder: (reminderData?: any) => void;
  onExportData: () => void;
}

const mockResponseData = {
  overview: {
    totalSent: 3247,
    opened: 2834,
    started: 2456,
    completed: 2208,
    bounced: 23,
    optedOut: 12,
    averageCompletionTime: 8.5
  },
  byDemographic: {
    students: { sent: 2847, completed: 1950, rate: 68.5, avgTime: 8.2 },
    faculty: { sent: 186, completed: 142, rate: 76.3, avgTime: 9.1 },
    staff: { sent: 214, completed: 116, rate: 54.2, avgTime: 7.8 }
  },
  byProgram: [
    { name: "Business Administration", sent: 856, completed: 621, rate: 72.5, avgTime: 8.3 },
    { name: "Engineering", sent: 734, completed: 467, rate: 63.6, avgTime: 9.2 },
    { name: "Medicine", sent: 445, completed: 334, rate: 75.1, avgTime: 7.9 },
    { name: "Arts & Sciences", sent: 678, completed: 398, rate: 58.7, avgTime: 8.7 },
    { name: "Education", sent: 534, completed: 388, rate: 72.7, avgTime: 8.0 }
  ],
  responseTimeline: [
    { day: "Day 1", responses: 342, cumulative: 342 },
    { day: "Day 2", responses: 567, cumulative: 909 },
    { day: "Day 3", responses: 423, cumulative: 1332 },
    { day: "Day 4", responses: 289, cumulative: 1621 },
    { day: "Day 5", responses: 234, cumulative: 1855 },
    { day: "Day 6", responses: 198, cumulative: 2053 },
    { day: "Day 7", responses: 155, cumulative: 2208 }
  ],
  questionAnalytics: [
    { id: "q1", title: "Employment Status", type: "multiple-choice", responseRate: 98.5, averageTime: 1.2 },
    { id: "q2", title: "Job Title", type: "text", responseRate: 87.3, averageTime: 2.1 },
    { id: "q3", title: "Job Relevance Rating", type: "rating", responseRate: 95.8, averageTime: 1.8 },
    { id: "q4", title: "Skills Application", type: "textarea", responseRate: 76.4, averageTime: 3.4 }
  ]
};

export const ResponseDashboard = ({ 
  survey, 
  onClose, 
  onViewIndividualResponse, 
  onSendReminder, 
  onExportData 
}: ResponseDashboardProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getCompletionRate = () => {
    return Math.round((mockResponseData.overview.completed / mockResponseData.overview.totalSent) * 100);
  };

  const getOpenRate = () => {
    return Math.round((mockResponseData.overview.opened / mockResponseData.overview.totalSent) * 100);
  };

  const getStartRate = () => {
    return Math.round((mockResponseData.overview.started / mockResponseData.overview.totalSent) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-ds-text-primary">{survey.title}</h2>
            <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
              {survey.type}
            </Badge>
          </div>
          <p className="text-ds-text-secondary">Response Analytics and Management Dashboard</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={onExportData} className="bg-ds-primary hover:bg-ds-primary-dark">
            <Download className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Users className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-blue))' }} />
              Total Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{mockResponseData.overview.totalSent.toLocaleString()}</div>
            <p className="text-xs text-ds-text-secondary">All recipients</p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Eye className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-teal))' }} />
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{getOpenRate()}%</div>
            <p className="text-xs text-ds-primary">{mockResponseData.overview.opened.toLocaleString()} opened</p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Activity className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-indigo))' }} />
              Start Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{getStartRate()}%</div>
            <p className="text-xs text-ds-text-secondary">{mockResponseData.overview.started.toLocaleString()} started</p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-purple))' }} />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{getCompletionRate()}%</div>
            <p className="text-xs text-ds-text-secondary">{mockResponseData.overview.completed.toLocaleString()} completed</p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-bg-grey-light to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Timer className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-orange))' }} />
              Avg. Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{mockResponseData.overview.averageCompletionTime}m</div>
            <p className="text-xs text-ds-text-secondary">completion time</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Response Progress */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            <span>Response Funnel Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-ds-bg-grey-light rounded">
                <div className="font-bold text-ds-text-primary">{mockResponseData.overview.opened.toLocaleString()}</div>
                <div className="text-ds-text-secondary">Opened ({getOpenRate()}%)</div>
                <Progress value={getOpenRate()} className="h-2 mt-2" />
              </div>
              <div className="text-center p-3 bg-ds-bg-grey-light rounded">
                <div className="font-bold text-ds-text-primary">{mockResponseData.overview.started.toLocaleString()}</div>
                <div className="text-ds-text-secondary">Started ({getStartRate()}%)</div>
                <Progress value={getStartRate()} className="h-2 mt-2" />
              </div>
              <div className="text-center p-3 bg-ds-secondary rounded">
                <div className="font-bold text-ds-text-primary">{mockResponseData.overview.completed.toLocaleString()}</div>
                <div className="text-ds-text-secondary">Completed ({getCompletionRate()}%)</div>
                <Progress value={getCompletionRate()} className="h-2 mt-2" />
              </div>
              <div className="text-center p-3 bg-ds-bg-grey-light rounded">
                <div className="font-bold text-ds-text-primary">{mockResponseData.overview.totalSent - mockResponseData.overview.opened}</div>
                <div className="text-ds-text-secondary">Never Opened</div>
                <Progress value={Math.round(((mockResponseData.overview.totalSent - mockResponseData.overview.opened) / mockResponseData.overview.totalSent) * 100)} className="h-2 mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="bg-ds-bg-grey-light border border-ds-border">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="questions">Question Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <Card className="border-ds-border">
            <CardHeader>
              <CardTitle>Response by Demographics</CardTitle>
              <CardDescription>Detailed breakdown with completion times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockResponseData.byDemographic).map(([type, data]) => (
                  <div key={type} className="p-4 bg-ds-bg-grey-light rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium capitalize">{type}</span>
                      <div className="text-sm text-ds-text-secondary space-x-4">
                        <span>{data.completed} / {data.sent} ({data.rate}%)</span>
                        <span>Avg: {data.avgTime}m</span>
                      </div>
                    </div>
                    <Progress value={data.rate} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card className="border-ds-border">
            <CardHeader>
              <CardTitle>Response by Academic Program</CardTitle>
              <CardDescription>Program-wise completion analysis with timing data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockResponseData.byProgram.map((program) => (
                  <div key={program.name} className="p-4 bg-ds-bg-grey-light rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{program.name}</span>
                      <div className="text-sm text-ds-text-secondary space-x-4">
                        <span>{program.completed} / {program.sent} ({program.rate}%)</span>
                        <span>Avg: {program.avgTime}m</span>
                      </div>
                    </div>
                    <Progress value={program.rate} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="border-ds-border">
            <CardHeader>
              <CardTitle>Daily Response Timeline</CardTitle>
              <CardDescription>Response submissions and cumulative totals over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {mockResponseData.responseTimeline.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-ds-text-secondary mb-1">
                      {day.cumulative}
                    </div>
                    <div 
                      className="w-full bg-ds-primary rounded-t min-h-[20px] flex items-end justify-center relative"
                      style={{ height: `${(day.responses / 600) * 200 + 20}px` }}
                    >
                      <span className="text-white text-xs font-medium pb-1">{day.responses}</span>
                    </div>
                    <span className="text-xs text-ds-text-secondary mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <Card className="border-ds-border">
            <CardHeader>
              <CardTitle>Question-Level Analytics</CardTitle>
              <CardDescription>Individual question performance and completion data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResponseData.questionAnalytics.map((question, index) => (
                  <div key={question.id} className="p-4 bg-ds-bg-grey-light rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">Q{index + 1}</span>
                          <Badge variant="outline" className="text-xs">{question.type}</Badge>
                        </div>
                        <h4 className="font-medium text-ds-text-primary">{question.title}</h4>
                      </div>
                      <div className="text-sm text-ds-text-secondary text-right">
                        <div>{question.responseRate}% response rate</div>
                        <div>{question.averageTime}m avg time</div>
                      </div>
                    </div>
                    <Progress value={question.responseRate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-ds-border">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onSendReminder && onSendReminder()}>
            <Mail className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
            Send Reminder
          </Button>
          <Button variant="outline" onClick={() => onViewIndividualResponse("1")}>
            <Eye className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
            View Individual Responses
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onExportData}>
            <PieChart className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
            Generate Report
          </Button>
          <Button onClick={onExportData} className="bg-ds-primary hover:bg-ds-primary-dark">
            <Download className="w-4 h-4 mr-2 transition-transform duration-200 hover:scale-110" />
            Export All Data
          </Button>
        </div>
      </div>
    </div>
  );
};
