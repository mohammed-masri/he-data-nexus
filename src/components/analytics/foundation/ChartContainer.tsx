
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onExport?: () => void;
  onRefresh?: () => void;
  className?: string;
}

export const ChartContainer = ({ 
  title, 
  children, 
  isLoading = false,
  onExport,
  onRefresh,
  className = ""
}: ChartContainerProps) => {
  if (isLoading) {
    return (
      <Card className={`border-slate-200 ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-slate-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        <div className="flex space-x-2">
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
