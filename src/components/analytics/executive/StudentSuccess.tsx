
import { AnalyticsCard } from "../shared/AnalyticsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, TrendingUp, Heart, Phone, Mail } from "lucide-react";

interface StudentSuccessProps {
  filters: any;
}

const atRiskStudents = [
  { id: 1, name: "Ahmed Al-Hassan", gpa: 2.1, absences: 8, lastContact: "2 days ago", risk: "high" },
  { id: 2, name: "Fatima Al-Zahra", gpa: 2.4, absences: 5, lastContact: "1 week ago", risk: "medium" },
  { id: 3, name: "Omar Al-Rashid", gpa: 2.3, absences: 6, lastContact: "3 days ago", risk: "high" },
  { id: 4, name: "Layla Al-Mansouri", gpa: 2.6, absences: 4, lastContact: "5 days ago", risk: "medium" }
];

const successPrograms = [
  {
    name: "Academic Support Services",
    participants: 156,
    successRate: 78,
    description: "Tutoring and study groups"
  },
  {
    name: "Mental Health & Wellness",
    participants: 89,
    successRate: 85,
    description: "Counseling and stress management"
  },
  {
    name: "Career Development",
    participants: 234,
    successRate: 92,
    description: "Internships and job placement"
  }
];

export const StudentSuccess = ({ filters }: StudentSuccessProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ds-text-primary">Student Success & Support</h2>
          <p className="text-ds-text-muted">Early intervention and support program analytics</p>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Students in Support"
          value="156"
          change={8.4}
          changeType="increase"
          description="Active intervention programs"
        />
        <AnalyticsCard
          title="Success Rate"
          value="82.3%"
          change={12.1}
          changeType="increase"
          description="Students improving GPA"
        />
        <AnalyticsCard
          title="Early Alerts"
          value="23"
          change={-18.5}
          changeType="increase"
          description="This week (reduction is good)"
        />
        <AnalyticsCard
          title="Counseling Sessions"
          value="145"
          change={15.7}
          changeType="increase"
          description="Mental health support"
        />
      </div>

      {/* At-Risk Students Dashboard */}
      <Card className="border-ds-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-ds-text-primary flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              At-Risk Students Requiring Attention
            </CardTitle>
            <Badge className="bg-orange-100 text-orange-800">
              {atRiskStudents.length} Students
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-ds-bg-grey-light rounded-lg border border-ds-border">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${student.risk === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                    <Users className={`w-4 h-4 ${student.risk === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ds-text-primary">{student.name}</h4>
                    <p className="text-sm text-ds-text-secondary">
                      GPA: {student.gpa} • {student.absences} absences • Last contact: {student.lastContact}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={student.risk === 'high' ? 'destructive' : 'secondary'}>
                    {student.risk === 'high' ? 'High Risk' : 'Medium Risk'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Programs Performance */}
      <Card className="border-ds-border">
        <CardHeader>
          <CardTitle className="text-ds-text-primary">Support Programs Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successPrograms.map((program, index) => (
              <div key={index} className="p-4 bg-ds-bg-grey-light rounded-lg border border-ds-border">
                <div className="flex items-center justify-between mb-3">
                  <Heart className="w-6 h-6 text-ds-primary" />
                  <Badge className="bg-ds-secondary text-ds-primary">
                    {program.successRate}% Success
                  </Badge>
                </div>
                <h4 className="font-semibold text-ds-text-primary mb-2">{program.name}</h4>
                <p className="text-sm text-ds-text-secondary mb-3">{program.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ds-text-muted">{program.participants} participants</span>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
