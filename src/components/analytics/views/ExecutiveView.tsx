import { ExecutiveInsights } from "../dashboard/ExecutiveInsights";
import { ExecutiveInsightsGrid } from "../executive/ExecutiveInsightsGrid";
import { UnifiedAIAssistant } from "../unified/UnifiedAIAssistant";
import { PredictiveAnalyticsEngine } from "../features/PredictiveAnalyticsEngine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Sparkles, BarChart3 } from "lucide-react";

interface ExecutiveViewProps {
  filters: any;
}

export const ExecutiveView = ({ filters }: ExecutiveViewProps) => {
  return (
    <div className="space-y-8">
      {/* Executive Summary with Academic Context */}
      <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40">
        <CardHeader>
          <CardTitle className="flex items-center text-ds-text-primary">
            <Brain className="w-5 h-5 mr-2 text-ds-primary" />
            Executive Summary • {filters.semester === 'fall' ? 'Fall 2024' : 'Academic Period'}
            <Badge className="ml-2 bg-ds-secondary text-ds-primary">
              Academic Context
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-ds-primary">15,420</div>
              <div className="text-sm text-ds-text-secondary">Total Enrollment</div>
              <div className="text-xs text-green-600 mt-1">+8.5% vs Fall 2023</div>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-ds-primary">91.7%</div>
              <div className="text-sm text-ds-text-secondary">Retention Rate</div>
              <div className="text-xs text-blue-600 mt-1">Above Target (90%)</div>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-ds-primary">12</div>
              <div className="text-sm text-ds-text-secondary">Weeks Completed</div>
              <div className="text-xs text-ds-text-secondary mt-1">4 weeks remaining</div>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-ds-primary">94.2%</div>
              <div className="text-sm text-ds-text-secondary">AI Prediction Accuracy</div>
              <div className="text-xs text-purple-600 mt-1">Real-time Analysis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Insights */}
      <ExecutiveInsights filters={filters} />

      {/* Main Content with Enhanced Academic Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Analytics Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-ds-border">
              <TabsTrigger value="insights" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                <Sparkles className="w-4 h-4" />
                <span>Academic Insights</span>
              </TabsTrigger>
              <TabsTrigger value="strategic" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                <BarChart3 className="w-4 h-4" />
                <span>Strategic Grid</span>
              </TabsTrigger>
              <TabsTrigger value="predictive" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                <Brain className="w-4 h-4" />
                <span>Predictive AI</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center space-x-2 data-[state=active]:bg-ds-secondary data-[state=active]:text-ds-primary">
                <TrendingUp className="w-4 h-4" />
                <span>Academic Timeline</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
              <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40">
                <CardHeader>
                  <CardTitle className="flex items-center text-ds-text-primary">
                    <Brain className="w-5 h-5 mr-2 text-ds-primary" />
                    AI-Powered Executive Intelligence
                    <Badge className="ml-2 bg-ds-secondary text-ds-primary">
                      Live Analysis
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-ds-primary">94.2%</div>
                      <div className="text-sm text-ds-text-secondary">Prediction Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-ds-primary">47</div>
                      <div className="text-sm text-ds-text-secondary">AI Insights Generated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-ds-primary">6</div>
                      <div className="text-sm text-ds-text-secondary">Strategic Recommendations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ExecutiveInsightsGrid filters={filters} />
            </TabsContent>

            <TabsContent value="strategic" className="space-y-6">
              <ExecutiveInsightsGrid filters={filters} />
            </TabsContent>

            <TabsContent value="predictive" className="space-y-6">
              <PredictiveAnalyticsEngine filters={filters} />
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card className="border-ds-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-ds-text-primary">
                    <TrendingUp className="w-5 h-5 mr-2 text-ds-primary" />
                    Academic Performance Timeline
                    <Badge className="ml-2 bg-ds-secondary text-ds-primary">
                      Context-Aware
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-ds-bg-grey-light rounded-lg">
                        <h4 className="font-semibold text-ds-text-primary">Enrollment Milestones</h4>
                        <p className="text-sm text-ds-text-secondary mt-1">
                          Target: 15,000 • Actual: 15,420 • Variance: +420 students
                        </p>
                      </div>
                      <div className="p-4 bg-ds-bg-grey-light rounded-lg">
                        <h4 className="font-semibold text-ds-text-primary">Retention Checkpoint</h4>
                        <p className="text-sm text-ds-text-secondary mt-1">
                          Mid-semester retention: 91.7% • On track for 90%+ target
                        </p>
                      </div>
                      <div className="p-4 bg-ds-bg-grey-light rounded-lg">
                        <h4 className="font-semibold text-ds-text-primary">Academic Progress</h4>
                        <p className="text-sm text-ds-text-secondary mt-1">
                          Week 12/16 • Finals preparation phase • Strong trajectory
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <UnifiedAIAssistant context="executive-dashboard" filters={filters} viewMode="executive" />
        </div>
      </div>
    </div>
  );
};
