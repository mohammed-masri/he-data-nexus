
// Student Data Models
export interface StudentEnrollment {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  studentId: string;
  alEthbara: string;
  emiratesId: string;
  passportNumber: string;
  emiratesIdMissingReason?: string;
  familyBookNumber: string;
  familyNumber: string;
  cityNumber: string;
  studentNameEn: string;
  studentNameAr: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  email: string;
  mobile: string;
  specialNeeds: boolean;
  specialNeedsCategory?: string;
  maritalStatus: string;
  nationality: string;
  motherNationality: string;
  homeEmirate: string;
  campus: string;
  studentType: string;
  firstAcademicPeriod: string;
  level: string;
  degree: string;
  specializationArea: string;
  majorText: string;
  majorCip: string;
  minor?: string;
  program: string;
  modeOfStudy: 'FT' | 'PT';
  employmentStatus: string;
  employmentSector?: string;
  employmentPosition?: string;
  requiredPeriodsForGraduation: number;
  requiredCreditsForGraduation: number;
  currentRegisteredCredits: number;
  totalCreditsRegistered: number;
  totalCreditsCompleted: number;
  overallGpa: number;
  transferInstitution?: string;
  transferCredits?: number;
  languageTestName?: string;
  languageTestPassDate?: string;
  languageTestScore?: number;
  standardizedTestName?: string;
  standardizedTestScore?: number;
  highSchoolCountry: string;
  highSchoolSystem: string;
  highSchoolExitScore: number;
  highSchoolCompletionYear: number;
  highSchoolEquivalencyIndicator: boolean;
  highSchoolEquivalencyNumber?: string;
  grade12Stream: string;
  lastCompletedDegree?: string;
  lastCompletedInstitution?: string;
  lastCompletedInstitutionCountry?: string;
  lastCompletedInstitutionCode?: string;
  lastCompletedDegreeCgpa?: number;
  lastCompletedDegreeYear?: number;
  lastCompletedEquivalencyIndicator?: boolean;
  lastCompletedEquivalencyNumber?: string;
  researchTopic?: string;
  researchArea?: string;
  orcid?: string;
  outgoingExchangeIndicator: boolean;
  incomingExchangeIndicator: boolean;
  exchangePartnerUniversityCode?: string;
}

export interface StudentGraduate {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  studentId: string;
  emiratesId: string;
  studentNameEn: string;
  studentNameAr: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  level: string;
  specializationArea: string;
  program: string;
  graduationDate: string;
  finalGpa: number;
  honors?: string;
}

export interface StudentScholarship {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  studentId: string;
  emiratesId: string;
  studentNameEn: string;
  studentNameAr: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  level: string;
  specializationArea: string;
  program: string;
  scholarshipType: string;
  scholarshipProviderType: string;
  scholarshipProviderName: string;
  scholarshipValue: number;
  scholarshipAmount: number;
  scholarshipDuration: number;
}

export interface StudentInternship {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  studentId: string;
  emiratesId: string;
  passportNumber: string;
  studentNameEn: string;
  studentNameAr: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  level: string;
  specializationArea: string;
  program: string;
  internshipOrganization: string;
  internshipSector: string;
  internshipIndustry: string;
  internshipDuration: number;
}

export interface StudentSOD {
  institutionCode: string;
  institutionName: string;
  academicPeriod: string;
  studentId: string;
  accommodationType: string;
  nationalAwardParticipated?: string;
  nationalAwardWon?: string;
  internationalAwardParticipated?: string;
  internationalAwardWon?: string;
  instructionalAssistiveTechnology?: string;
  instructionalAssistiveTechnologyDetails?: string;
  medicalAssistiveDevices?: string;
  medicalAssistiveDevicesDetails?: string;
  specialAccommodations?: string;
  specialAccommodationsDetails?: string;
}

export interface StudentAttrition {
  institutionCode: string;
  institutionName: string;
  submissionTerm: string;
  lastAcademicPeriod: string;
  studentId: string;
  emiratesId: string;
  studentNameEn: string;
  studentNameAr: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  level: string;
  specializationArea: string;
  program: string;
  attritionCategory: string;
  attritionReason: string;
}

export interface StudentAnalyticsData {
  enrollments: StudentEnrollment[];
  graduates: StudentGraduate[];
  scholarships: StudentScholarship[];
  internships: StudentInternship[];
  sod: StudentSOD[];
  attrition: StudentAttrition[];
}

export interface StudentMetrics {
  totalEnrollment: number;
  newEnrollments: number;
  graduationRate: number;
  retentionRate: number;
  attritionRate: number;
  averageGpa: number;
  scholarshipRecipients: number;
  internshipParticipation: number;
  specialNeedsSupport: number;
  diversityMetrics: {
    genderDistribution: { male: number; female: number };
    nationalityDistribution: Record<string, number>;
    ageDistribution: Record<string, number>;
  };
  academicMetrics: {
    levelDistribution: Record<string, number>;
    programDistribution: Record<string, number>;
    gpaDistribution: Record<string, number>;
  };
  financialMetrics: {
    totalScholarshipValue: number;
    averageScholarshipAmount: number;
    scholarshipDistribution: Record<string, number>;
  };
  careerMetrics: {
    internshipPlacement: number;
    industryDistribution: Record<string, number>;
    employmentStatus: Record<string, number>;
  };
}

class StudentDataService {
  // Generate mock student data for demonstration
  generateMockStudentData(): StudentAnalyticsData {
    return {
      enrollments: this.generateMockEnrollments(),
      graduates: this.generateMockGraduates(),
      scholarships: this.generateMockScholarships(),
      internships: this.generateMockInternships(),
      sod: this.generateMockSOD(),
      attrition: this.generateMockAttrition(),
    };
  }

  private generateMockEnrollments(): StudentEnrollment[] {
    // Generate mock enrollment data
    return Array.from({ length: 100 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      academicPeriod: "Fall 2024",
      studentId: `STU${i.toString().padStart(6, '0')}`,
      alEthbara: `ETH${i}`,
      emiratesId: `784${i.toString().padStart(12, '0')}`,
      passportNumber: `P${i.toString().padStart(8, '0')}`,
      familyBookNumber: `FB${i}`,
      familyNumber: `FN${i}`,
      cityNumber: `C${i}`,
      studentNameEn: `Student ${i}`,
      studentNameAr: `طالب ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      dateOfBirth: new Date(1995 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      email: `student${i}@university.edu`,
      mobile: `+971${Math.floor(Math.random() * 1000000000)}`,
      specialNeeds: Math.random() < 0.1,
      maritalStatus: Math.random() < 0.3 ? 'Married' : 'Single',
      nationality: ['UAE', 'Saudi Arabia', 'Egypt', 'Jordan', 'Lebanon'][Math.floor(Math.random() * 5)],
      motherNationality: ['UAE', 'Saudi Arabia', 'Egypt', 'Jordan', 'Lebanon'][Math.floor(Math.random() * 5)],
      homeEmirate: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'][Math.floor(Math.random() * 4)],
      campus: ['Main Campus', 'Dubai Campus', 'Abu Dhabi Campus'][Math.floor(Math.random() * 3)],
      studentType: 'Regular',
      firstAcademicPeriod: 'Fall 2020',
      level: ['Undergraduate', 'Graduate', 'PhD'][Math.floor(Math.random() * 3)],
      degree: 'Bachelor',
      specializationArea: ['Engineering', 'Business', 'Medicine', 'Law'][Math.floor(Math.random() * 4)],
      majorText: 'Computer Science',
      majorCip: 'CIP11.0701',
      program: 'BSc Computer Science',
      modeOfStudy: Math.random() < 0.8 ? 'FT' : 'PT',
      employmentStatus: Math.random() < 0.3 ? 'Employed' : 'Student',
      requiredPeriodsForGraduation: 8,
      requiredCreditsForGraduation: 120,
      currentRegisteredCredits: 15,
      totalCreditsRegistered: 60 + Math.floor(Math.random() * 60),
      totalCreditsCompleted: 45 + Math.floor(Math.random() * 60),
      overallGpa: 2.0 + Math.random() * 2.0,
      highSchoolCountry: 'UAE',
      highSchoolSystem: 'Emirates Curriculum',
      highSchoolExitScore: 85 + Math.floor(Math.random() * 15),
      highSchoolCompletionYear: 2018 + Math.floor(Math.random() * 6),
      highSchoolEquivalencyIndicator: false,
      grade12Stream: 'Scientific',
      outgoingExchangeIndicator: Math.random() < 0.05,
      incomingExchangeIndicator: Math.random() < 0.05,
    }));
  }

  private generateMockGraduates(): StudentGraduate[] {
    return Array.from({ length: 25 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      academicPeriod: "Spring 2024",
      studentId: `GRAD${i.toString().padStart(6, '0')}`,
      emiratesId: `784${i.toString().padStart(12, '0')}`,
      studentNameEn: `Graduate ${i}`,
      studentNameAr: `خريج ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      dateOfBirth: new Date(1995 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      nationality: ['UAE', 'Saudi Arabia', 'Egypt'][Math.floor(Math.random() * 3)],
      level: 'Undergraduate',
      specializationArea: ['Engineering', 'Business', 'Medicine'][Math.floor(Math.random() * 3)],
      program: 'BSc Computer Science',
      graduationDate: '2024-06-15',
      finalGpa: 2.5 + Math.random() * 1.5,
      honors: Math.random() < 0.3 ? 'Cum Laude' : undefined,
    }));
  }

  private generateMockScholarships(): StudentScholarship[] {
    return Array.from({ length: 30 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      academicPeriod: "Fall 2024",
      studentId: `SCHOL${i.toString().padStart(6, '0')}`,
      emiratesId: `784${i.toString().padStart(12, '0')}`,
      studentNameEn: `Scholar ${i}`,
      studentNameAr: `منحة ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      dateOfBirth: new Date(1995 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      nationality: ['UAE', 'Saudi Arabia', 'Egypt'][Math.floor(Math.random() * 3)],
      level: 'Undergraduate',
      specializationArea: ['Engineering', 'Business', 'Medicine'][Math.floor(Math.random() * 3)],
      program: 'BSc Computer Science',
      scholarshipType: ['Merit', 'Need-based', 'Athletic'][Math.floor(Math.random() * 3)],
      scholarshipProviderType: ['Government', 'Private', 'University'][Math.floor(Math.random() * 3)],
      scholarshipProviderName: 'UAE Government Scholarship',
      scholarshipValue: 50000 + Math.floor(Math.random() * 100000),
      scholarshipAmount: 25000 + Math.floor(Math.random() * 50000),
      scholarshipDuration: 4,
    }));
  }

  private generateMockInternships(): StudentInternship[] {
    return Array.from({ length: 40 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      academicPeriod: "Summer 2024",
      studentId: `INTERN${i.toString().padStart(6, '0')}`,
      emiratesId: `784${i.toString().padStart(12, '0')}`,
      passportNumber: `P${i.toString().padStart(8, '0')}`,
      studentNameEn: `Intern ${i}`,
      studentNameAr: `متدرب ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      dateOfBirth: new Date(1998 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      nationality: ['UAE', 'Saudi Arabia', 'Egypt'][Math.floor(Math.random() * 3)],
      level: 'Undergraduate',
      specializationArea: ['Engineering', 'Business', 'IT'][Math.floor(Math.random() * 3)],
      program: 'BSc Computer Science',
      internshipOrganization: ['Emirates Airlines', 'ADNOC', 'Dubai Municipality', 'Etisalat'][Math.floor(Math.random() * 4)],
      internshipSector: ['Aviation', 'Oil & Gas', 'Government', 'Telecommunications'][Math.floor(Math.random() * 4)],
      internshipIndustry: ['Technology', 'Energy', 'Transportation', 'Communications'][Math.floor(Math.random() * 4)],
      internshipDuration: 3 + Math.floor(Math.random() * 6),
    }));
  }

  private generateMockSOD(): StudentSOD[] {
    return Array.from({ length: 15 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      academicPeriod: "Fall 2024",
      studentId: `SOD${i.toString().padStart(6, '0')}`,
      accommodationType: ['Visual Impairment', 'Hearing Impairment', 'Physical Disability', 'Learning Disability'][Math.floor(Math.random() * 4)],
      nationalAwardParticipated: Math.random() < 0.3 ? 'UAE Innovation Award' : undefined,
      nationalAwardWon: Math.random() < 0.1 ? 'Best Student Innovation' : undefined,
      instructionalAssistiveTechnology: Math.random() < 0.6 ? 'Screen Reader' : undefined,
      instructionalAssistiveTechnologyDetails: 'JAWS screen reader software',
      specialAccommodations: 'Extended time for exams',
      specialAccommodationsDetails: 'Additional 50% time for all assessments',
    }));
  }

  private generateMockAttrition(): StudentAttrition[] {
    return Array.from({ length: 20 }, (_, i) => ({
      institutionCode: "INST001",
      institutionName: "Sample University",
      submissionTerm: "Fall 2024",
      lastAcademicPeriod: "Spring 2024",
      studentId: `ATTR${i.toString().padStart(6, '0')}`,
      emiratesId: `784${i.toString().padStart(12, '0')}`,
      studentNameEn: `Attrition ${i}`,
      studentNameAr: `منقطع ${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      dateOfBirth: new Date(1995 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      nationality: ['UAE', 'Saudi Arabia', 'Egypt'][Math.floor(Math.random() * 3)],
      level: 'Undergraduate',
      specializationArea: ['Engineering', 'Business', 'Medicine'][Math.floor(Math.random() * 3)],
      program: 'BSc Computer Science',
      attritionCategory: ['Academic', 'Financial', 'Personal', 'Transfer'][Math.floor(Math.random() * 4)],
      attritionReason: ['Poor Performance', 'Financial Hardship', 'Family Issues', 'Transfer to Another Institution'][Math.floor(Math.random() * 4)],
    }));
  }

  calculateStudentMetrics(data: StudentAnalyticsData): StudentMetrics {
    const enrollments = data.enrollments;
    const graduates = data.graduates;
    const scholarships = data.scholarships;
    const internships = data.internships;
    const attrition = data.attrition;

    // Calculate basic metrics
    const totalEnrollment = enrollments.length;
    const newEnrollments = enrollments.filter(e => e.firstAcademicPeriod === e.academicPeriod).length;
    const graduationRate = graduates.length / (graduates.length + attrition.length) * 100;
    const attritionRate = attrition.length / totalEnrollment * 100;
    const retentionRate = 100 - attritionRate;
    const averageGpa = enrollments.reduce((sum, e) => sum + e.overallGpa, 0) / enrollments.length;

    // Gender distribution
    const genderDistribution = enrollments.reduce((acc, e) => {
      acc[e.gender.toLowerCase()] = (acc[e.gender.toLowerCase()] || 0) + 1;
      return acc;
    }, { male: 0, female: 0 });

    // Nationality distribution
    const nationalityDistribution = enrollments.reduce((acc, e) => {
      acc[e.nationality] = (acc[e.nationality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Academic metrics
    const levelDistribution = enrollments.reduce((acc, e) => {
      acc[e.level] = (acc[e.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const programDistribution = enrollments.reduce((acc, e) => {
      acc[e.program] = (acc[e.program] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Financial metrics
    const totalScholarshipValue = scholarships.reduce((sum, s) => sum + s.scholarshipValue, 0);
    const averageScholarshipAmount = scholarships.length > 0 ? 
      scholarships.reduce((sum, s) => sum + s.scholarshipAmount, 0) / scholarships.length : 0;

    return {
      totalEnrollment,
      newEnrollments,
      graduationRate,
      retentionRate,
      attritionRate,
      averageGpa,
      scholarshipRecipients: scholarships.length,
      internshipParticipation: internships.length,
      specialNeedsSupport: enrollments.filter(e => e.specialNeeds).length,
      diversityMetrics: {
        genderDistribution,
        nationalityDistribution,
        ageDistribution: { "18-22": 60, "23-27": 30, "28+": 10 },
      },
      academicMetrics: {
        levelDistribution,
        programDistribution,
        gpaDistribution: { "3.5-4.0": 25, "3.0-3.4": 35, "2.5-2.9": 25, "2.0-2.4": 15 },
      },
      financialMetrics: {
        totalScholarshipValue,
        averageScholarshipAmount,
        scholarshipDistribution: { "Government": 15, "Private": 8, "University": 7 },
      },
      careerMetrics: {
        internshipPlacement: (internships.length / totalEnrollment) * 100,
        industryDistribution: { "Technology": 15, "Energy": 12, "Healthcare": 8, "Finance": 5 },
        employmentStatus: { "Employed": 25, "Student": 70, "Seeking": 5 },
      },
    };
  }

  generateChartData() {
    return {
      enrollmentTrends: [
        { period: "Fall 2020", enrollment: 850, graduates: 200, attrition: 45 },
        { period: "Spring 2021", enrollment: 920, graduates: 250, attrition: 38 },
        { period: "Fall 2021", enrollment: 1050, graduates: 275, attrition: 42 },
        { period: "Spring 2022", enrollment: 1150, graduates: 290, attrition: 35 },
        { period: "Fall 2022", enrollment: 1280, graduates: 310, attrition: 40 },
        { period: "Spring 2023", enrollment: 1350, graduates: 325, attrition: 32 },
        { period: "Fall 2023", enrollment: 1420, graduates: 340, attrition: 28 },
        { period: "Spring 2024", enrollment: 1485, graduates: 355, attrition: 25 },
      ],
      retentionAnalysis: [
        { cohort: "2020", year1: 92, year2: 87, year3: 82, year4: 78 },
        { cohort: "2021", year1: 94, year2: 89, year3: 85, year4: 0 },
        { cohort: "2022", year1: 95, year2: 91, year3: 0, year4: 0 },
        { cohort: "2023", year1: 96, year2: 0, year3: 0, year4: 0 },
      ],
      gpaDistribution: [
        { range: "3.7-4.0", count: 245, percentage: 16.5 },
        { range: "3.3-3.6", count: 380, percentage: 25.6 },
        { range: "3.0-3.2", count: 425, percentage: 28.6 },
        { range: "2.7-2.9", count: 285, percentage: 19.2 },
        { range: "2.0-2.6", count: 150, percentage: 10.1 },
      ],
      attritionReasons: [
        { reason: "Academic Performance", count: 45, percentage: 35 },
        { reason: "Financial Hardship", count: 32, percentage: 25 },
        { reason: "Personal/Family", count: 25, percentage: 19.5 },
        { reason: "Transfer", count: 18, percentage: 14 },
        { reason: "Other", count: 8, percentage: 6.5 },
      ],
    };
  }
}

export const studentDataService = new StudentDataService();
