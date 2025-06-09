
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewContextProps {
  academicYear: string;
  semester: string;
  department: string;
}

export const OverviewContext = ({ academicYear, semester, department }: OverviewContextProps) => {
  return (
    <Card className="border-ds-border bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardContent className="p-4">
        <h4 className="text-sm font-semibold text-ds-text-primary mb-3">Current Context</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-ds-text-muted">Academic Year:</span>
            <Badge variant="outline" className="text-xs">{academicYear}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-ds-text-muted">Semester:</span>
            <Badge variant="outline" className="text-xs">{semester}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-ds-text-muted">Department:</span>
            <Badge variant="outline" className="text-xs">{department === 'all' ? 'All' : department}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
