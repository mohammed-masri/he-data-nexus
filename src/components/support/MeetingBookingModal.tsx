
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Video, Users } from "lucide-react";
import { format } from "date-fns";

interface MeetingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingBooked: (meeting: any) => void;
}

export const MeetingBookingModal = ({ isOpen, onClose, onMeetingBooked }: MeetingBookingModalProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    meetingType: "",
    duration: "",
    timeSlot: "",
    subject: "",
    agenda: "",
    attendeeEmail: "",
    attendeeName: "",
    phoneNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const meetingTypes = [
    { value: "technical", label: "Technical Consultation", icon: "⚙️" },
    { value: "demo", label: "Product Demo", icon: "🖥️" },
    { value: "training", label: "Training Session", icon: "📚" },
    { value: "onboarding", label: "Onboarding Support", icon: "🚀" },
    { value: "general", label: "General Consultation", icon: "💬" }
  ];

  const durations = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedDate || !formData.timeSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const meetingId = `MTG-${Date.now().toString().slice(-6)}`;
    
    const meeting = {
      id: meetingId,
      ...formData,
      date: selectedDate.toISOString(),
      status: "scheduled",
      meetingLink: `https://meet.sharjah.ac.ae/room/${meetingId}`,
      createdAt: new Date().toISOString()
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onMeetingBooked(meeting);
      toast({
        title: "Meeting Scheduled Successfully",
        description: `Your meeting ${meetingId} has been scheduled for ${format(selectedDate, 'PPP')} at ${formData.timeSlot}. Calendar invite sent!`,
      });
      
      // Reset form
      setFormData({
        meetingType: "",
        duration: "",
        timeSlot: "",
        subject: "",
        agenda: "",
        attendeeEmail: "",
        attendeeName: "",
        phoneNumber: ""
      });
      setSelectedDate(undefined);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ds-text-primary">
            <CalendarIcon className="w-5 h-5 mr-2 text-ds-primary" />
            Schedule Consultation Meeting
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Select Date</Label>
              <div className="border border-ds-border rounded-lg p-3 mt-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 5 || date.getDay() === 6}
                  className="rounded-md"
                />
              </div>
            </div>

            {selectedDate && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={formData.timeSlot === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: time }))}
                      className="text-xs"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Meeting Type *</Label>
              <Select value={formData.meetingType} onValueChange={(value) => setFormData(prev => ({ ...prev, meetingType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  {meetingTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{type.icon}</span>
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration *</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration.value} value={duration.value}>{duration.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Meeting Subject *</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief subject for the meeting"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Agenda</Label>
              <Textarea
                value={formData.agenda}
                onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                placeholder="Meeting agenda and topics to discuss..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your Name *</Label>
                <Input
                  value={formData.attendeeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendeeName: e.target.value }))}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.attendeeEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendeeEmail: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+971 XX XXX XXXX"
              />
            </div>

            {selectedDate && formData.timeSlot && (
              <div className="bg-ds-secondary p-3 rounded-lg">
                <div className="flex items-center text-ds-primary mb-2">
                  <Video className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Meeting Details</span>
                </div>
                <div className="text-sm text-ds-text-secondary space-y-1">
                  <p><strong>Date:</strong> {format(selectedDate, 'PPP')}</p>
                  <p><strong>Time:</strong> {formData.timeSlot} ({formData.duration} minutes)</p>
                  <p><strong>Platform:</strong> Video Conference (link will be provided)</p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !selectedDate || !formData.timeSlot || !formData.meetingType || !formData.duration || !formData.subject || !formData.attendeeName || !formData.attendeeEmail}
              >
                {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
