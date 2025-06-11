
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Building2, Users } from "lucide-react";

interface AnalyticsBreadcrumbProps {
  currentAY: string;
  currentSemester: string;
  department?: string;
  viewMode: 'executive' | 'detailed';
  activeFilters?: number;
  institution?: string;
}

export const AnalyticsBreadcrumb = ({
  currentAY,
  currentSemester,
  department,
  viewMode,
  activeFilters = 0,
  institution
}: AnalyticsBreadcrumbProps) => {
  const semesterDisplay = currentSemester === 'fall' ? 'Fall 2024' : 
                         currentSemester === 'spring' ? 'Spring 2024' : 'Summer 2024';

  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-ds-border rounded-xl px-4 py-3 shadow-sm">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/institution" className="flex items-center text-ds-text-secondary hover:text-ds-primary">
              <Building2 className="w-4 h-4 mr-1" />
              Institution
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center text-ds-text-secondary hover:text-ds-primary">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-ds-primary">
              {semesterDisplay} • {viewMode === 'executive' ? 'Executive' : 'Detailed'} View
            </BreadcrumbPage>
          </BreadcrumbItem>
          {department && department !== 'all' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center text-ds-text-secondary">
                  <Users className="w-4 h-4 mr-1" />
                  {department}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {institution && institution !== 'all' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center text-ds-text-secondary">
                  <Building2 className="w-4 h-4 mr-1" />
                  {institution}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-ds-secondary text-ds-primary border-ds-primary/30">
          AY {currentAY}
        </Badge>
        {activeFilters > 0 && (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            {activeFilters} Filters Applied
          </Badge>
        )}
      </div>
    </div>
  );
};
