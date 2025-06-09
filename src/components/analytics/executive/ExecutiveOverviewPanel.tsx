
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, BarChart3, Users, BookOpen, 
  DollarSign, Award, ArrowRight 
} from "lucide-react";

interface ExecutiveOverviewPanelProps {
  filters: any;
}

export const ExecutiveOverviewPanel = ({ filters }: ExecutiveOverviewPanelProps) => {
  
  const overviewSections = [
    {
      title: "Enrollment & Growth",
      description: "Record semester with 15% growth above targets",
      metrics: [
        { label: "New Students", value: "1,247", trend: "+23%" },
        { label: "Retention Rate", value: "91.7%", trend: "+2.1%" },
        { label: "Capacity Utilization", value: "87%", trend: "+5%" }
      ],
      status: "excellent",
      icon: Users
    },
    {
      title: "Academic Excellence",
      description: "Highest performance metrics in institutional history",
      metrics: [
        { label: "Average GPA", value: "3.42", trend: "+0.08" },
        { label: "Graduation Rate", value: "89%", trend: "+3%" },
        { label: "Honor Students", value: "2,847", trend: "+12%" }
      ],
      status: "excellent",
      icon: BookOpen
    },
    {
      title: "Financial Performance",
      description: "Optimal budget utilization with strategic opportunities",
      metrics: [
        { label: "Budget Efficiency", value: "78.4%", trend: "+2.3%" },
        { label: "Revenue Growth", value: "8.7%", trend: "+1.2%" },
        { label: "Cost Per Student", value: "$12,450", trend: "-2.1%" }
      ],
      status: "good",
      icon: DollarSign
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-50 border-emerald-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'attention': return 'bg-orange-50 border-orange-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Summary Card */}
      <Card className="border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
              <Award className="w-6 h-6 mr-3 text-blue-600" />
              Fall 2024 Executive Summary
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              AI-Generated
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Key Achievements</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                  Record enrollment of 8,247 students (15% above target)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                  Highest academic performance in institutional history
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                  Budget efficiency at optimal 78.4% utilization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                  Student satisfaction improved to 4.6/5.0
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Strategic Priorities</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Accelerate digital transformation (287% ROI potential)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Focus on sophomore retention programs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Expand research partnerships for #1 ranking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Optimize resource allocation across departments
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {overviewSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className={`border-2 shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(section.status)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <div className="p-2 bg-white rounded-lg mr-3">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {section.title}
                </CardTitle>
                <p className="text-sm opacity-80">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{metric.value}</span>
                        <Badge variant="outline" className="text-xs">
                          {metric.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
