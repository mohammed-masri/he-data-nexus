
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters } from "@/components/DashboardFilters";
import { 
  BarChart3, 
  Users, 
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface SurveyStatsOverviewProps {
  totalSurveys: number;
  activeSurveys: number;
  completedSurveys: number;
  pendingDistribution: number;
  averageResponseRate: number;
  totalResponses: number;
  filters?: any;
  onFiltersChange?: (filters: any) => void;
  showFilters?: boolean;
}

export const SurveyStatsOverview = ({
  totalSurveys,
  activeSurveys,
  completedSurveys,
  pendingDistribution,
  averageResponseRate,
  totalResponses,
  filters = {},
  onFiltersChange = () => {},
  showFilters = false
}: SurveyStatsOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Survey Filters */}
      {showFilters && (
        <DashboardFilters
          type="surveys"
          filters={filters}
          onFiltersChange={onFiltersChange}
          onRefresh={() => console.log("Refreshing survey stats")}
          onExport={() => console.log("Exporting survey stats")}
        />
      )}

      {/* Survey Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <BarChart3 className="h-3 w-3 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-blue))' }} />
              </div>
              Total Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{totalSurveys}</div>
            <p className="text-xs text-ds-text-secondary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-active-blue mr-1.5"></div>
              All surveys
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-ds-secondary to-white hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-primary rounded mr-2">
                <Users className="h-3 w-3 text-white transition-transform duration-200 hover:scale-110" />
              </div>
              Active Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{activeSurveys}</div>
            <p className="text-xs text-ds-primary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-active-teal mr-1.5"></div>
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <CheckCircle className="h-3 w-3 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-teal))' }} />
              </div>
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{completedSurveys}</div>
            <p className="text-xs text-ds-text-secondary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-active-purple mr-1.5"></div>
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <Clock className="h-3 w-3 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-orange))' }} />
              </div>
              Pending Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{pendingDistribution}</div>
            <p className="text-xs text-ds-text-secondary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-active-orange mr-1.5"></div>
              Awaiting distribution
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <TrendingUp className="h-3 w-3 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-purple))' }} />
              </div>
              Avg Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{averageResponseRate}%</div>
            <Progress value={averageResponseRate} className="h-1 mt-2" />
            <p className="text-xs text-ds-text-secondary font-medium flex items-center mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-active-indigo mr-1.5"></div>
              Overall performance
            </p>
          </CardContent>
        </Card>

        <Card className="border-ds-border bg-gradient-to-br from-white to-ds-bg-grey-light hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <div className="p-1 bg-ds-bg-grey-medium rounded mr-2">
                <Users className="h-3 w-3 transition-transform duration-200 hover:scale-110" style={{ color: 'hsl(var(--active-rose))' }} />
              </div>
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">{totalResponses.toLocaleString()}</div>
            <p className="text-xs text-ds-text-secondary font-medium flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-active-rose mr-1.5"></div>
              All time responses
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
