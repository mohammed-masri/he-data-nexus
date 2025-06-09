
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Bell, 
  Send, 
  Clock, 
  Users, 
  MessageSquare,
  Calendar,
  BarChart3
} from "lucide-react";

interface Survey {
  id: string;
  title: string;
  distributedTo?: number;
  totalResponses?: number;
  responseRate?: number;
}

interface ReminderManagementProps {
  survey: Survey;
  onSendReminder: (reminderData: any) => void;
}

const reminderTemplates = [
  {
    id: "gentle",
    name: "Gentle Reminder",
    message: "We hope this message finds you well. We wanted to gently remind you about the survey we sent earlier. Your participation is valuable to us and will help improve our services. The survey takes only a few minutes to complete."
  },
  {
    id: "urgent", 
    name: "Urgent Reminder",
    message: "This is an urgent reminder that the survey deadline is approaching. Your response is crucial for our research. Please take a moment to complete the survey as soon as possible."
  },
  {
    id: "final",
    name: "Final Notice",
    message: "This is the final reminder regarding the survey. The deadline is very close, and we haven't received your response yet. Please complete the survey immediately to ensure your voice is heard."
  }
];

export const ReminderManagement = ({ survey, onSendReminder }: ReminderManagementProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [reminderType, setReminderType] = useState("immediate");

  const nonResponders = (survey.distributedTo || 0) - (survey.totalResponses || 0);

  const handleSendReminder = () => {
    const reminderData = {
      surveyId: survey.id,
      type: reminderType,
      template: selectedTemplate,
      message: customMessage || reminderTemplates.find(t => t.id === selectedTemplate)?.message,
      targetAudience: "non_responders",
      recipientCount: nonResponders
    };
    
    onSendReminder(reminderData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-ds-primary text-ds-primary hover:bg-ds-secondary">
          <Bell className="w-4 h-4 mr-2" />
          Send Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-ds-primary" />
            Send Survey Reminder
          </DialogTitle>
          <DialogDescription>
            Send a reminder to participants who haven't responded to "{survey.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reminder Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-ds-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-ds-primary" />
                  <div>
                    <p className="text-sm font-medium text-ds-text-secondary">Total Recipients</p>
                    <p className="text-xl font-bold text-ds-text-primary">{survey.distributedTo || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-ds-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-ds-primary" />
                  <div>
                    <p className="text-sm font-medium text-ds-text-secondary">Responses</p>
                    <p className="text-xl font-bold text-ds-text-primary">{survey.totalResponses || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-ds-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-ds-primary" />
                  <div>
                    <p className="text-sm font-medium text-ds-text-secondary">Non-Responders</p>
                    <p className="text-xl font-bold text-ds-text-primary">{nonResponders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reminder Type */}
          <div className="space-y-2">
            <Label htmlFor="reminderType">Reminder Type</Label>
            <Select value={reminderType} onValueChange={setReminderType}>
              <SelectTrigger>
                <SelectValue placeholder="Select reminder type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Immediately</span>
                  </div>
                </SelectItem>
                <SelectItem value="scheduled">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule for Later</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template">Message Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template or write custom message" />
              </SelectTrigger>
              <SelectContent>
                {reminderTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Preview/Custom */}
          <div className="space-y-2">
            <Label htmlFor="message">Message Content</Label>
            {selectedTemplate && selectedTemplate !== "custom" ? (
              <div className="p-3 bg-ds-bg-grey-light border border-ds-border rounded-md">
                <p className="text-sm text-ds-text-primary">
                  {reminderTemplates.find(t => t.id === selectedTemplate)?.message}
                </p>
              </div>
            ) : (
              <Textarea
                id="message"
                placeholder="Write your custom reminder message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                className="border-ds-border focus:border-ds-primary"
              />
            )}
          </div>

          {/* Target Audience */}
          <div className="p-4 bg-ds-bg-grey-light rounded-lg border border-ds-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-ds-text-primary">Target Audience</h4>
                <p className="text-sm text-ds-text-secondary">Non-responders only</p>
              </div>
              <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
                {nonResponders} recipients
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-ds-border">
            <DialogTrigger asChild>
              <Button variant="outline" className="border-ds-border">
                Cancel
              </Button>
            </DialogTrigger>
            <Button 
              onClick={handleSendReminder}
              className="bg-ds-primary hover:bg-ds-primary-dark"
              disabled={!selectedTemplate && !customMessage.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              {reminderType === "immediate" ? "Send Now" : "Schedule Reminder"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
