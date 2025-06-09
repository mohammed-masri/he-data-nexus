
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Ticket, Calendar as CalendarIcon, Search, Filter, 
  Eye, Clock, CheckCircle, AlertTriangle, Video, Phone,
  MoreHorizontal, MessageSquare
} from "lucide-react";
import { format } from "date-fns";

interface SupportDashboardProps {
  tickets: any[];
  meetings: any[];
  onViewTicket: (ticket: any) => void;
  onViewMeeting: (meeting: any) => void;
}

export const SupportDashboard = ({ tickets, meetings, onViewTicket, onViewMeeting }: SupportDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-active-orange text-white";
      case "in-progress": return "bg-active-blue text-white";
      case "resolved": return "bg-active-teal text-white";
      case "closed": return "bg-ds-text-muted text-white";
      default: return "bg-ds-bg-grey-medium text-ds-text-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-ds-bg-grey-medium text-ds-text-secondary";
      case "medium": return "bg-active-orange text-white";
      case "high": return "bg-active-purple text-white";
      case "critical": return "bg-destructive text-white";
      default: return "bg-ds-bg-grey-medium text-ds-text-secondary";
    }
  };

  const getMeetingStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-active-blue text-white";
      case "completed": return "bg-active-teal text-white";
      case "cancelled": return "bg-ds-text-muted text-white";
      default: return "bg-ds-bg-grey-medium text-ds-text-secondary";
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-ds-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Ticket className="w-4 h-4 mr-2 text-active-orange" />
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">
              {tickets.filter(t => t.status === 'open').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <Clock className="w-4 h-4 mr-2 text-active-blue" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">
              {tickets.filter(t => t.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-active-purple" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">
              {meetings.filter(m => m.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-ds-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ds-text-secondary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-active-teal" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ds-text-primary">
              {tickets.filter(t => t.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-ds-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ds-text-muted w-4 h-4" />
                <Input
                  placeholder="Search tickets or meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for Tickets and Meetings */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="bg-ds-bg-grey-light">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-white">
            Support Tickets ({filteredTickets.length})
          </TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-white">
            Meetings ({filteredMeetings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="border-ds-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-ds-text-primary">{ticket.id}</span>
                      <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-ds-text-primary">{ticket.subject}</h3>
                    <p className="text-sm text-ds-text-secondary line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center text-xs text-ds-text-muted space-x-4">
                      <span>Created: {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</span>
                      <span>Updated: {format(new Date(ticket.updatedAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewTicket(ticket)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="border-ds-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-ds-text-primary">{meeting.id}</span>
                      <Badge className={getMeetingStatusColor(meeting.status)}>{meeting.status}</Badge>
                      <Badge variant="outline" className="text-xs">{meeting.meetingType}</Badge>
                    </div>
                    <h3 className="font-semibold text-ds-text-primary">{meeting.subject}</h3>
                    <div className="flex items-center text-sm text-ds-text-secondary space-x-4">
                      <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {format(new Date(meeting.date), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {meeting.timeSlot} ({meeting.duration} min)
                      </span>
                    </div>
                    {meeting.agenda && (
                      <p className="text-sm text-ds-text-secondary line-clamp-2">{meeting.agenda}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewMeeting(meeting)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {meeting.status === 'scheduled' && (
                      <Button variant="default" size="sm">
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
