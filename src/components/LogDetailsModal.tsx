
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

interface LogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: any;
  type: 'api' | 'activity';
}

export function LogDetailsModal({ isOpen, onClose, log, type }: LogDetailsModalProps) {
  if (!log) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadLog = () => {
    const dataStr = JSON.stringify(log, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${type}-log-${log.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-ds-text-primary">
              {type === 'api' ? 'API Request Details' : 'Activity Details'}
            </DialogTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
                className="border-ds-border"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadLog}
                className="border-ds-border"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {type === 'api' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Request Info</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-ds-text-secondary">Method:</span>
                      <Badge variant="outline">{log.method}</Badge>
                    </div>
                    <div><span className="text-ds-text-secondary">Endpoint:</span> {log.endpoint}</div>
                    <div><span className="text-ds-text-secondary">Status:</span> {log.statusCode}</div>
                    <div><span className="text-ds-text-secondary">Duration:</span> {log.duration}ms</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Metadata</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-ds-text-secondary">Token ID:</span> {log.tokenId}</div>
                    <div><span className="text-ds-text-secondary">Timestamp:</span> {new Date(log.timestamp).toLocaleString()}</div>
                    <div><span className="text-ds-text-secondary">Request Size:</span> {log.requestSize}KB</div>
                    <div><span className="text-ds-text-secondary">Response Size:</span> {log.responseSize}KB</div>
                  </div>
                </div>
              </div>

              {log.requestHeaders && (
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Request Headers</h3>
                  <pre className="bg-ds-secondary p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.requestHeaders, null, 2)}
                  </pre>
                </div>
              )}

              {log.requestBody && (
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Request Body</h3>
                  <pre className="bg-ds-secondary p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.requestBody, null, 2)}
                  </pre>
                </div>
              )}

              {log.responseHeaders && (
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Response Headers</h3>
                  <pre className="bg-ds-secondary p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.responseHeaders, null, 2)}
                  </pre>
                </div>
              )}

              {log.responseBody && (
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Response Body</h3>
                  <pre className="bg-ds-secondary p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.responseBody, null, 2)}
                  </pre>
                </div>
              )}

              {log.errorMessage && (
                <div className="space-y-2">
                  <h3 className="font-medium text-red-600">Error Details</h3>
                  <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
                    {log.errorMessage}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Activity Info</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-ds-text-secondary">Action:</span> {log.action}</div>
                    <div><span className="text-ds-text-secondary">Resource:</span> {log.resource}</div>
                    <div><span className="text-ds-text-secondary">User:</span> {log.userName}</div>
                    <div><span className="text-ds-text-secondary">Timestamp:</span> {new Date(log.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Session Info</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-ds-text-secondary">IP Address:</span> {log.ipAddress}</div>
                    <div><span className="text-ds-text-secondary">Session ID:</span> {log.sessionId}</div>
                    <div><span className="text-ds-text-secondary">User Agent:</span> {log.userAgent}</div>
                  </div>
                </div>
              </div>

              {log.details && (
                <div className="space-y-2">
                  <h3 className="font-medium text-ds-text-primary">Activity Details</h3>
                  <pre className="bg-ds-secondary p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
