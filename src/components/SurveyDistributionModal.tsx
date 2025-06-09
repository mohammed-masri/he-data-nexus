
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Users, Filter, Calendar, GraduationCap, Briefcase, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SurveyData {
  id: string;
  title: string;
  type: "GDS" | "ESS" | "SES";
  description: string;
  deadline: string;
  createdBy: string;
}

interface SurveyDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: SurveyData | null;
  onDistribute: (distributionData: any) => void;
}

export const SurveyDistributionModal = ({ isOpen, onClose, survey, onDistribute }: SurveyDistributionModalProps) => {
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    academicYear: "",
    semester: "",
    program: "",
    department: "",
    yearLevel: "",
    graduationYear: ""
  });
  const [customMessage, setCustomMessage] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [isDistributing, setIsDistributing] = useState(false);
  const { toast } = useToast();

  const audienceTypes = [
    { id: "students", label: "Students", icon: GraduationCap, count: 3247 },
    { id: "employees", label: "Employees", icon: Briefcase, count: 186 },
    { id: "alumni", label: "Alumni", icon: UserCheck, count: 8924 }
  ];

  const handleAudienceChange = (audienceId: string, checked: boolean) => {
    if (checked) {
      setSelectedAudience([...selectedAudience, audienceId]);
    } else {
      setSelectedAudience(selectedAudience.filter(id => id !== audienceId));
    }
  };

  const handleDistribute = async () => {
    setIsDistributing(true);
    
    // Simulate distribution process
    setTimeout(() => {
      const distributionData = {
        surveyId: survey?.id,
        audience: selectedAudience,
        filters,
        customMessage,
        estimatedRecipients: selectedCount
      };
      
      onDistribute(distributionData);
      
      toast({
        title: "Survey Distributed Successfully",
        description: `Survey sent to ${selectedCount} recipients across ${selectedAudience.length} audience type(s).`,
      });
      
      setIsDistributing(false);
      onClose();
    }, 2000);
  };

  // Calculate estimated recipients based on selection
  const calculateRecipients = () => {
    let total = 0;
    selectedAudience.forEach(audienceId => {
      const audience = audienceTypes.find(a => a.id === audienceId);
      if (audience) total += audience.count;
    });
    // Apply filter reduction (simplified calculation)
    const filterReduction = Object.values(filters).filter(f => f).length * 0.2;
    return Math.max(1, Math.floor(total * (1 - filterReduction)));
  };

  if (!survey) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Distribute Survey: {survey.title}</span>
          </DialogTitle>
          <DialogDescription>
            Configure distribution settings for this {survey.type} survey.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Survey Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <Badge variant="outline">{survey.type}</Badge>
                <span>{survey.title}</span>
              </CardTitle>
              <CardDescription>{survey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Deadline:</span> {new Date(survey.deadline).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Created by:</span> {survey.createdBy}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="audience" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="audience" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Audience</span>
              </TabsTrigger>
              <TabsTrigger value="filters" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </TabsTrigger>
              <TabsTrigger value="message" className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Message</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="audience" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {audienceTypes.map((audience) => {
                  const Icon = audience.icon;
                  const isSelected = selectedAudience.includes(audience.id);
                  
                  return (
                    <Card 
                      key={audience.id} 
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-ds-primary bg-ds-secondary' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleAudienceChange(audience.id, !isSelected)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <Icon className="w-5 h-5 text-ds-primary" />
                          <div className="flex-1">
                            <h3 className="font-medium">{audience.label}</h3>
                            <p className="text-sm text-ds-text-secondary">{audience.count.toLocaleString()} total</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="filters" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Select value={filters.academicYear} onValueChange={(value) => setFilters({...filters, academicYear: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={filters.semester} onValueChange={(value) => setFilters({...filters, semester: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="program">Program</Label>
                  <Select value={filters.program} onValueChange={(value) => setFilters({...filters, program: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Administration</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="arts">Arts & Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={filters.department} onValueChange={(value) => setFilters({...filters, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="yearLevel">Year Level</Label>
                  <Select value={filters.yearLevel} onValueChange={(value) => setFilters({...filters, yearLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Year 1</SelectItem>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select value={filters.graduationYear} onValueChange={(value) => setFilters({...filters, graduationYear: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Graduation Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="message" className="space-y-4">
              <div>
                <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                <Textarea
                  id="customMessage"
                  placeholder="Add a custom message to include with the survey invitation..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Distribution Summary */}
          <Card className="bg-ds-secondary">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-ds-text-primary">Estimated Recipients</h3>
                  <p className="text-sm text-ds-text-secondary">
                    Based on selected audience and filters
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ds-primary">{calculateRecipients().toLocaleString()}</div>
                  <p className="text-xs text-ds-text-secondary">people will receive this survey</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDistributing}>
            Cancel
          </Button>
          <Button 
            onClick={handleDistribute} 
            disabled={isDistributing || selectedAudience.length === 0}
            className="bg-ds-primary hover:bg-ds-primary-dark"
          >
            {isDistributing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Distributing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Distribute Survey
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
