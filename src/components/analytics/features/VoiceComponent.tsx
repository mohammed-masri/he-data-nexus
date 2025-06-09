
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Pause, Volume2, Download } from "lucide-react";

interface VoiceComponentProps {
  domain: string;
  filters?: any;
}

export const VoiceComponent = ({ domain, filters }: VoiceComponentProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceCommand, setVoiceCommand] = useState("");

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setTranscript("Show me the enrollment statistics for the computer science department over the last semester, focusing on retention rates and academic performance metrics.");
      setVoiceCommand("Generated analytics query from voice input");
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const mockVoiceInsights = [
    {
      id: 1,
      title: "Weekly Enrollment Call",
      duration: "12:34",
      date: "2024-01-15",
      insights: ["Mentioned 15% increase in applications", "Discussed retention strategies", "Highlighted scholarship program success"],
      sentiment: "Positive"
    },
    {
      id: 2,
      title: "Student Feedback Session",
      duration: "8:45",
      date: "2024-01-12",
      insights: ["Course satisfaction ratings discussed", "Technology needs identified", "Study space improvements suggested"],
      sentiment: "Neutral"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Mic className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ds-text-primary">Voice Analytics</h2>
            <p className="text-sm text-ds-text-muted">Voice-to-text queries and audio insights</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Query Interface */}
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-orange-600" />
              <span>Voice Query</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                isRecording ? 'bg-red-100 animate-pulse' : 'bg-orange-100'
              }`}>
                {isRecording ? (
                  <MicOff className="w-12 h-12 text-red-600" />
                ) : (
                  <Mic className="w-12 h-12 text-orange-600" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-ds-text-muted">
                  {isRecording ? "Listening... Speak your analytics query" : "Click to start voice query"}
                </p>
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </div>

            {transcript && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-ds-text-secondary">Transcript:</label>
                <div className="bg-ds-bg-grey-light p-3 rounded-lg border border-ds-border">
                  <p className="text-sm">{transcript}</p>
                </div>
                <Button className="w-full" variant="outline">
                  Execute Voice Query
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-ds-text-secondary">Voice Commands:</label>
              <div className="flex flex-wrap gap-2">
                {["Show enrollment data", "Generate report", "Compare metrics", "Export results"].map((command, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    "{command}"
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Insights */}
        <Card className="border-ds-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span>Audio Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-ds-text-muted">
              AI-powered analysis of recorded meetings and calls related to {domain} data.
            </div>

            <div className="space-y-3">
              {mockVoiceInsights.map((insight) => (
                <div key={insight.id} className="bg-white border border-ds-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-ds-text-primary">{insight.title}</h4>
                    <Badge variant={insight.sentiment === "Positive" ? "default" : "secondary"}>
                      {insight.sentiment}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-ds-text-muted mb-3">
                    <span>Duration: {insight.duration}</span>
                    <span>Date: {insight.date}</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-ds-text-secondary">Key Insights:</label>
                    <ul className="text-xs space-y-1">
                      {insight.insights.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1 h-1 bg-ds-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-ds-border">
                    <Button variant="ghost" size="sm" onClick={togglePlayback}>
                      {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
