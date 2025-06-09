
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";

interface AcademicTimelineProps {
  currentSemester: string;
  academicYear: string;
}

export const AcademicTimeline = ({ currentSemester, academicYear }: AcademicTimelineProps) => {
  const semesterProgress = 75; // Week 12 of 16
  const currentWeek = 12;
  const totalWeeks = 16;

  const academicMilestones = [
    { name: "Classes Begin", date: "Aug 26", status: "completed", type: "start" },
    { name: "Add/Drop Deadline", date: "Sep 9", status: "completed", type: "deadline" },
    { name: "Midterm Exams", date: "Oct 14-18", status: "completed", type: "exam" },
    { name: "Registration Opens", date: "Nov 4", status: "active", type: "registration" },
    { name: "Thanksgiving Break", date: "Nov 25-29", status: "upcoming", type: "break" },
    { name: "Final Exams", date: "Dec 9-13", status: "upcoming", type: "exam" },
    { name: "Semester Ends", date: "Dec 13", status: "upcoming", type: "end" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "active": return "bg-blue-100 text-blue-700 border-blue-200";
      case "upcoming": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-3 h-3" />;
      case "active": return <Clock className="w-3 h-3" />;
      case "upcoming": return <AlertCircle className="w-3 h-3" />;
      default: return <Calendar className="w-3 h-3" />;
    }
  };

  return (
    <Card className="border-ds-border bg-gradient-to-r from-ds-secondary/40 to-ds-bg-grey-light">
      <CardContent className="py-4">
        <div className="space-y-4">
          {/* Semester Progress */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ds-text-primary">
                {currentSemester === 'fall' ? 'Fall' : currentSemester === 'spring' ? 'Spring' : 'Summer'} 2024 Progress
              </h3>
              <p className="text-sm text-ds-text-secondary">
                Week {currentWeek} of {totalWeeks} • {Math.round(semesterProgress)}% Complete
              </p>
            </div>
            <Badge className="bg-ds-primary text-white">
              <Calendar className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={semesterProgress} className="h-3" />
            <div className="flex justify-between text-xs text-ds-text-secondary">
              <span>Aug 26</span>
              <span className="font-medium text-ds-primary">Current Week</span>
              <span>Dec 13</span>
            </div>
          </div>

          {/* Academic Milestones */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-ds-text-secondary">Key Academic Dates</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {academicMilestones.map((milestone, index) => (
                <Badge
                  key={index}
                  className={`${getStatusColor(milestone.status)} flex items-center justify-center px-2 py-1 text-xs`}
                >
                  {getStatusIcon(milestone.status)}
                  <span className="ml-1 truncate">{milestone.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
