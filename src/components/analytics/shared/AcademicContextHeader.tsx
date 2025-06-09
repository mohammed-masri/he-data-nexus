
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, ChevronDown, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

interface AcademicContextHeaderProps {
  currentAY: string;
  currentSemester: string;
  onContextChange: (ay: string, semester: string) => void;
  className?: string;
}

const academicYears = [
  { value: "2024-2025", label: "2024-2025" },
  { value: "2023-2024", label: "2023-2024" },
  { value: "2022-2023", label: "2022-2023" }
];

const semesters = [
  { value: "fall", label: "Fall 2024", period: "Aug - Dec 2024" },
  { value: "spring", label: "Spring 2024", period: "Jan - May 2024" },
  { value: "summer", label: "Summer 2024", period: "May - Aug 2024" }
];

export const AcademicContextHeader = ({
  currentAY,
  currentSemester,
  onContextChange,
  className = ""
}: AcademicContextHeaderProps) => {
  const [showContextSelector, setShowContextSelector] = useState(false);

  const currentSemesterData = semesters.find(s => s.value === currentSemester);
  const currentAYData = academicYears.find(ay => ay.value === currentAY);

  const quickSwitchOptions = [
    { 
      label: "Current Semester", 
      ay: "2024-2025", 
      semester: "fall",
      description: "Active academic period"
    },
    { 
      label: "Previous Semester", 
      ay: "2023-2024", 
      semester: "spring",
      description: "Comparison baseline"
    },
    { 
      label: "Same Period Last Year", 
      ay: "2023-2024", 
      semester: "fall",
      description: "Year-over-year comparison"
    }
  ];

  return (
    <Card className={`border-ds-primary/30 bg-gradient-to-r from-ds-secondary/60 via-ds-bg-grey-light to-ds-secondary/40 ${className}`}>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          {/* Current Context Display */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-ds-primary rounded-xl shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ds-text-primary">
                  Academic Year {currentAYData?.label}
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge className="bg-ds-primary text-white px-3 py-1 text-sm font-medium">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentSemesterData?.label}
                  </Badge>
                  <span className="text-sm text-ds-text-secondary">
                    {currentSemesterData?.period}
                  </span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Active Period
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Context Switcher */}
          <div className="flex items-center space-x-3">
            <Popover open={showContextSelector} onOpenChange={setShowContextSelector}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-ds-primary/30 hover:bg-ds-primary/10 font-medium"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Switch Context
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-white border-ds-border shadow-xl" align="end">
                <div className="p-4 border-b border-ds-border">
                  <h3 className="font-semibold text-ds-text-primary">Academic Context</h3>
                  <p className="text-sm text-ds-text-secondary mt-1">
                    Switch to a different academic period
                  </p>
                </div>
                <div className="p-2">
                  {quickSwitchOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onContextChange(option.ay, option.semester);
                        setShowContextSelector(false);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-ds-bg-grey transition-colors"
                    >
                      <div className="font-medium text-ds-text-primary">
                        {option.label}
                      </div>
                      <div className="text-sm text-ds-text-secondary mt-1">
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-ds-border bg-ds-bg-grey-light">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-ds-text-secondary">Academic Year</label>
                      <select 
                        value={currentAY}
                        onChange={(e) => onContextChange(e.target.value, currentSemester)}
                        className="w-full mt-1 p-2 border border-ds-border rounded-lg text-sm"
                      >
                        {academicYears.map(ay => (
                          <option key={ay.value} value={ay.value}>{ay.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-ds-text-secondary">Semester</label>
                      <select 
                        value={currentSemester}
                        onChange={(e) => onContextChange(currentAY, e.target.value)}
                        className="w-full mt-1 p-2 border border-ds-border rounded-lg text-sm"
                      >
                        {semesters.map(semester => (
                          <option key={semester.value} value={semester.value}>{semester.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
