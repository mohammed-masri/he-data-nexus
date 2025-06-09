
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

interface LogTableProps {
  logs: any[];
  type: 'api' | 'activity';
  onViewDetails: (log: any) => void;
}

export function LogTable({ logs, type, onViewDetails }: LogTableProps) {
  const getStatusBadgeColor = (status: number) => {
    if (status >= 200 && status < 300) return 'secondary';
    if (status >= 400 && status < 500) return 'destructive';
    if (status >= 500) return 'destructive';
    return 'outline';
  };

  if (type === 'api') {
    return (
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="border border-ds-border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-xs">
                    {log.method}
                  </Badge>
                  <span className="font-medium text-ds-text-primary">{log.endpoint}</span>
                  <Badge variant={getStatusBadgeColor(log.statusCode)} className="text-xs">
                    {log.statusCode}
                  </Badge>
                </div>
                <div className="text-sm text-ds-text-secondary">
                  <span>Token: {log.tokenId}</span> • 
                  <span className="ml-2">{log.duration}ms</span> • 
                  <span className="ml-2">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-xs text-ds-text-muted">
                  Request: {log.requestSize}KB • Response: {log.responseSize}KB
                </div>
                {log.errorMessage && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    {log.errorMessage}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewDetails(log)}
                className="border-ds-border hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-1 text-ds-primary" />
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="border border-ds-border rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-ds-text-primary">{log.action}</span>
                <Badge variant="outline" className="text-xs">
                  {log.resource}
                </Badge>
              </div>
              <div className="text-sm text-ds-text-secondary">
                <span>User: {log.userName}</span> • 
                <span className="ml-2">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <div className="text-xs text-ds-text-muted">
                IP: {log.ipAddress} • Session: {log.sessionId?.substring(0, 8)}...
              </div>
              {log.details && Object.keys(log.details).length > 0 && (
                <div className="text-xs text-ds-text-secondary bg-gray-50 p-2 rounded">
                  {JSON.stringify(log.details, null, 2)}
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(log)}
              className="border-ds-border hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-1 text-ds-primary" />
              Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
