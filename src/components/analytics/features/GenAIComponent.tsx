
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Database, Sparkles, Copy, Download } from "lucide-react";

interface GenAIComponentProps {
  domain: string;
  filters?: any;
}

export const GenAIComponent = ({ domain, filters }: GenAIComponentProps) => {
  const [query, setQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextToSQL = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const mockSQL = `SELECT 
  COUNT(*) as total_students,
  AVG(gpa) as average_gpa,
  enrollment_date
FROM students 
WHERE enrollment_date >= '2024-01-01'
  AND domain = '${domain}'
GROUP BY enrollment_date
ORDER BY enrollment_date DESC;`;
      
      setSqlQuery(mockSQL);
      setIsLoading(false);
    }, 2000);
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = `Based on the analysis of ${domain} data with filters: ${JSON.stringify(filters)}

Key Findings:
• Total records analyzed: 2,847 entries
• Performance trend shows 12% improvement over selected period
• Quality metrics indicate 94.5% data accuracy
• Seasonal patterns detected in Q2 and Q4

Recommendations:
• Continue current optimization strategies
• Monitor retention rates closely
• Implement predictive measures for identified risk factors
• Schedule quarterly review sessions

Generated on ${new Date().toLocaleDateString()} using AI analytics engine.`;
      
      setSummary(mockSummary);
      setIsLoading(false);
    }, 1500);
  };

  const sampleQueries = [
    "Show me enrollment trends for the last 6 months",
    "What is the average GPA by department?",
    "Find students at risk of dropping out",
    "Compare performance metrics year over year"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ds-text-primary">Gen AI Analytics</h2>
            <p className="text-sm text-ds-text-muted">Text-to-SQL and AI-powered summaries</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleGenerateSummary} disabled={isLoading}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Summary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text to SQL */}
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span>Text to SQL</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-ds-text-secondary mb-2 block">
                Describe what you want to analyze:
              </label>
              <Textarea
                placeholder="e.g., Show me the top performing students this semester..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-ds-text-secondary">Sample Queries:</label>
              <div className="flex flex-wrap gap-2">
                {sampleQueries.map((sample, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-ds-bg-grey-light text-xs"
                    onClick={() => setQuery(sample)}
                  >
                    {sample}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleTextToSQL} 
              disabled={!query.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? "Generating SQL..." : "Convert to SQL"}
            </Button>

            {sqlQuery && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-ds-text-secondary">Generated SQL:</label>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-ds-bg-grey-light p-3 rounded-lg text-sm overflow-x-auto border border-ds-border">
                  <code>{sqlQuery}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>AI Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-ds-text-muted">
              Generate intelligent summaries of your {domain} data with current filters applied.
            </div>
            
            <div className="bg-ds-bg-grey-light p-3 rounded-lg border border-ds-border">
              <div className="text-xs text-ds-text-muted mb-2">Current Context:</div>
              <div className="text-sm">
                <span className="font-medium">Domain:</span> {domain}<br />
                <span className="font-medium">Time Range:</span> {filters?.timeRange || "30d"}<br />
                <span className="font-medium">Granularity:</span> {filters?.granularity || "day"}
              </div>
            </div>

            {summary ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-ds-text-secondary">AI Generated Summary:</label>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg border border-ds-border">
                  <pre className="text-sm whitespace-pre-wrap text-ds-text-primary">{summary}</pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-ds-text-muted">
                Click "Generate Summary" to create an AI-powered analysis of your data
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
