
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export interface Domain {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const domains: Domain[] = [
  { id: "applicants-academic", name: "Academic Proficiency", category: "Applicants", description: "Academic performance metrics for applicants" },
  { id: "applicants-basic", name: "Basic Details", category: "Applicants", description: "Demographics and basic information" },
  { id: "institute-programs", name: "Academic Programs", category: "Institute", description: "Program offerings and curriculum data" },
  { id: "institute-operations", name: "Operations", category: "Institute", description: "Operational metrics and KPIs" },
  { id: "employee-basic", name: "Basic Details", category: "Employee", description: "Employee demographics and information" },
  { id: "employee-workload", name: "Workload", category: "Employee", description: "Workload distribution and capacity" },
  { id: "employee-occupation", name: "Elementary Occupation", category: "Employee", description: "Job roles and classifications" },
  { id: "students-graduates", name: "Graduates", category: "Students", description: "Graduation rates and outcomes" },
  { id: "students-attrition", name: "Attrition", category: "Students", description: "Student retention and dropout analysis" },
  { id: "students-enrollments", name: "Enrollments", category: "Students", description: "Enrollment trends and patterns" },
  { id: "students-scholarship", name: "Scholarship", category: "Students", description: "Financial aid and scholarship data" },
  { id: "graduates-microcredential", name: "Microcredential", category: "Graduates", description: "Post-graduation certifications" },
  { id: "students-internship", name: "Internship", category: "Students", description: "Internship placements and outcomes" },
  { id: "students-microcredential", name: "Microcredential", category: "Students", description: "Student micro-certifications" },
  { id: "sod-applicants", name: "SOD Applicants Template", category: "SOD", description: "SOD applicant data template" },
  { id: "sod-template", name: "SOD Template", category: "SOD", description: "General SOD template analytics" },
];

interface DomainSelectorProps {
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

export const DomainSelector = ({ selectedDomain, onDomainChange }: DomainSelectorProps) => {
  const selectedDomainData = domains.find(d => d.id === selectedDomain);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ds-text-primary">Select Domain</h3>
        {selectedDomainData && (
          <Badge className="bg-ds-secondary text-ds-primary border-ds-primary/30">
            {selectedDomainData.category}
          </Badge>
        )}
      </div>
      
      <Select value={selectedDomain} onValueChange={onDomainChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a domain to analyze" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          {Object.entries(
            domains.reduce((acc, domain) => {
              if (!acc[domain.category]) acc[domain.category] = [];
              acc[domain.category].push(domain);
              return acc;
            }, {} as Record<string, Domain[]>)
          ).map(([category, categoryDomains]) => (
            <div key={category}>
              <div className="px-2 py-1 text-xs font-semibold text-ds-text-secondary bg-ds-bg-grey-light">
                {category}
              </div>
              {categoryDomains.map((domain) => (
                <SelectItem key={domain.id} value={domain.id} className="pl-4">
                  <div>
                    <div className="font-medium">{domain.name}</div>
                    <div className="text-xs text-ds-text-muted">{domain.description}</div>
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedDomainData && (
        <p className="text-sm text-ds-text-secondary">{selectedDomainData.description}</p>
      )}
    </div>
  );
};
