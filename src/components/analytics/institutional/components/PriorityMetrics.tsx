
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsGrid } from "../../foundation/AnalyticsGrid";
import { Star, GraduationCap, Users, DollarSign, Microscope, Building2, ChevronRight, TrendingUp, UserCheck } from "lucide-react";

const priorityMetrics = [
  { title: "Student Retention Rate", value: "89.3%", trend: "+3.2%", icon: UserCheck, status: "excellent" },
  { title: "Graduation Rate (6-year)", value: "76.8%", trend: "+2.1%", icon: GraduationCap, status: "good" },
  { title: "Faculty-to-Student Ratio", value: "1:14", trend: "Improved from 1:16", icon: Users, status: "excellent" },
  { title: "Revenue per Student", value: "$28,450", trend: "+4.2%", icon: DollarSign, status: "good" },
  { title: "Research Publications", value: "324 pubs", trend: "+18%", icon: Microscope, status: "excellent" },
  { title: "Graduate Employment Rate", value: "92.4%", trend: "+5.3%", icon: Building2, status: "excellent" },
];

export const PriorityMetrics = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-ds-text-primary flex items-center animate-fade-in">
          <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg mr-3 shadow-lg">
            <Star className="w-5 h-5 text-white" />
          </div>
          Priority Performance Indicators
        </h3>
        <Badge variant="outline" className="bg-ds-secondary text-ds-primary border-ds-primary/30 animate-fade-in">
          Live Updates
        </Badge>
      </div>
      
      <AnalyticsGrid columns={3} className="gap-6">
        {priorityMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card 
              key={index} 
              className="border-ds-border hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer transform hover:scale-105 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-ds-bg-grey-light rounded-lg group-hover:bg-ds-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg">
                      <IconComponent className="w-5 h-5 text-ds-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <Badge 
                      className={`text-xs transition-all duration-300 ${
                        metric.status === 'excellent' ? 'bg-green-100 text-green-700 border-green-200 group-hover:bg-green-200' :
                        metric.status === 'good' ? 'bg-blue-100 text-blue-700 border-blue-200 group-hover:bg-blue-200' :
                        'bg-orange-100 text-orange-700 border-orange-200 group-hover:bg-orange-200'
                      }`}
                    >
                      {metric.status === 'excellent' ? 'Excellent' : 
                       metric.status === 'good' ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ds-text-muted group-hover:text-ds-primary transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-ds-text-primary group-hover:text-ds-primary-dark transition-colors duration-300">
                      {metric.value}
                    </span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs font-semibold">
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ds-text-primary group-hover:text-ds-text-secondary transition-colors duration-300">
                      {metric.title}
                    </p>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="w-full bg-ds-bg-grey-light rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-ds-primary to-ds-primary-dark h-1.5 rounded-full transition-all duration-700 group-hover:from-green-500 group-hover:to-green-600"
                      style={{ 
                        width: `${metric.title.includes('Ratio') ? 85 : parseInt(metric.value)}%`,
                        animation: 'slide-in-right 0.8s ease-out'
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </AnalyticsGrid>
    </div>
  );
};
