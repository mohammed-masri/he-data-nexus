
export interface EmployeeBasicDetails {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  employeeId: string;
  emiratesId?: string;
  emiratesIdMissingReason?: string;
  gender: 'Male' | 'Female' | 'Other';
  payroll: 'University' | 'Outsourced';
  nationality: string;
  dateOfBirth: string;
  campus: string;
  email: string;
  phoneNumber: string;
  name: string;
  hireDate: string;
  department: string;
  college: string;
  lastPromotionDate?: string;
  qualification: string;
  qualificationCountry: string;
  qualificationInstitutionName: string;
  qualificationInstitutionCode: string;
  qualificationYear: number;
  qualificationName: string;
  qualificationsMajor: string;
  equivalencyIndicator: 'Y' | 'R' | 'A' | 'N' | 'T';
  equivalencyNumber?: string;
  positionTitle: string;
  positionTitleOther?: string;
  employmentStatus: string;
  yearsOfExperience: number;
  orcId?: string;
}

export interface EmployeeWorkload {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  employeeId: string;
  programLevel: string;
  areaOfSpecialization: string;
  departmentName: string;
  employeeCategory: string;
  fullOrPartTime: 'Full-time' | 'Part-time';
  employeePosition: string;
  additionalPosition?: string;
  maxWorkloadPerSemester: number;
  researchWorkload: number;
  adminWorkload: number;
  otherAdminWorkload: number;
  teachingWorkload: number;
  exchangeInOut?: string;
  exchangeInstitutionCode?: string;
  exchangeInstitutionName?: string;
  exchangeInstitutionCountryCode?: string;
  creditsDelivered: number;
  totalCreditedCourses: number;
  totalNonCreditedCourseSections: number;
  totalCreditedStudents: number;
  totalNonCreditedStudents: number;
  departmentJoiningDate: string;
}

export interface ElementaryOccupationStaff {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  elementaryStaffInhouse: number;
  elementaryStaffOutsourced: number;
}

export interface EmployeeSalary {
  institutionCode: string;
  institutionName: string;
  academicYear: string;
  position: string;
  areaOfSpecialization?: string;
  averageAnnualSalary: number;
}

export interface EmployeeAnalyticsData {
  totalEmployees: number;
  facultyCount: number;
  staffCount: number;
  averageSalary: number;
  averageExperience: number;
  departmentDistribution: { name: string; value: number }[];
  workloadDistribution: { name: string; value: number }[];
  salaryByPosition: { position: string; salary: number }[];
  employmentStatusDistribution: { status: string; count: number }[];
}

export interface EmployeeFilters {
  department: string;
  employeeCategory: string;
  employmentStatus: string;
  payrollType: string;
  experience: string;
  position: string;
}
