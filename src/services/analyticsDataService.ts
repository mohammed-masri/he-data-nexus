
export interface AnalyticsData {
  enrollment: {
    current: number;
    previous: number;
    target: number;
    trend: "up" | "down" | "stable";
  };
  performance: {
    avgGPA: number;
    retentionRate: number;
    graduationRate: number;
    trend: "up" | "down" | "stable";
  };
  financial: {
    budgetUtilization: number;
    revenuePerStudent: number;
    costEfficiency: number;
    trend: "up" | "down" | "stable";
  };
  strategic: {
    marketPosition: number;
    satisfactionScore: number;
    competitiveRank: number;
    trend: "up" | "down" | "stable";
  };
  student: {
    totalStudents: number;
    newEnrollments: number;
    graduationRate: number;
    attritionRate: number;
    scholarshipRecipients: number;
    internshipParticipation: number;
    specialNeedsSupport: number;
    averageGpa: number;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

class AnalyticsDataService {
  generateMockData(): AnalyticsData {
    return {
      enrollment: {
        current: 15420,
        previous: 13400,
        target: 13400,
        trend: "up"
      },
      performance: {
        avgGPA: 3.42,
        retentionRate: 87.5,
        graduationRate: 72.8,
        trend: "up"
      },
      financial: {
        budgetUtilization: 78.4,
        revenuePerStudent: 45200,
        costEfficiency: 92.3,
        trend: "stable"
      },
      strategic: {
        marketPosition: 2,
        satisfactionScore: 4.6,
        competitiveRank: 3,
        trend: "up"
      },
      student: {
        totalStudents: 15420,
        newEnrollments: 2850,
        graduationRate: 87.3,
        attritionRate: 12.7,
        scholarshipRecipients: 3240,
        internshipParticipation: 65.2,
        specialNeedsSupport: 285,
        averageGpa: 3.42,
      }
    };
  }

  generateStudentEnrollmentData(): ChartDataPoint[] {
    return [
      { name: "Fall 2020", value: 12800, newStudents: 2400, attrition: 380 },
      { name: "Spring 2021", value: 13100, newStudents: 2650, attrition: 350 },
      { name: "Fall 2021", value: 13600, newStudents: 2800, attrition: 320 },
      { name: "Spring 2022", value: 13900, newStudents: 2750, attrition: 340 },
      { name: "Fall 2022", value: 14200, newStudents: 2900, attrition: 310 },
      { name: "Spring 2023", value: 14600, newStudents: 2850, attrition: 295 },
      { name: "Fall 2023", value: 15000, newStudents: 3100, attrition: 280 },
      { name: "Spring 2024", value: 15200, newStudents: 2950, attrition: 265 },
      { name: "Fall 2024", value: 15420, newStudents: 3050, attrition: 250 }
    ];
  }

  generateEnrollmentTrends(): ChartDataPoint[] {
    return this.generateStudentEnrollmentData();
  }

  generatePerformanceMetrics(): ChartDataPoint[] {
    return [
      { name: "Retention Rate", value: 87.5 },
      { name: "Graduation Rate", value: 72.8 },
      { name: "Average GPA", value: 3.42 },
      { name: "Student Satisfaction", value: 4.6 }
    ];
  }

  generateDepartmentData(): ChartDataPoint[] {
    return [
      { name: "Engineering", value: 3500 },
      { name: "Business", value: 2800 },
      { name: "Health Sciences", value: 2200 },
      { name: "Arts & Sciences", value: 1800 },
      { name: "Information Technology", value: 1600 },
      { name: "Education", value: 1200 }
    ];
  }

  generateBudgetBreakdown(): ChartDataPoint[] {
    return [
      { name: "Academic Programs", value: 45 },
      { name: "Research", value: 20 },
      { name: "Student Services", value: 15 },
      { name: "Infrastructure", value: 12 },
      { name: "Administration", value: 8 }
    ];
  }

  generateRetentionData(): ChartDataPoint[] {
    return [
      { name: "2020 Cohort", value: 92, year1: 92, year2: 87, year3: 82, year4: 78 },
      { name: "2021 Cohort", value: 94, year1: 94, year2: 89, year3: 85, year4: 0 },
      { name: "2022 Cohort", value: 95, year1: 95, year2: 91, year3: 0, year4: 0 },
      { name: "2023 Cohort", value: 96, year1: 96, year2: 0, year3: 0, year4: 0 },
    ];
  }

  generateScholarshipData(): ChartDataPoint[] {
    return [
      { name: "Government", value: 1850, amount: 125000000 },
      { name: "Private Donors", value: 890, amount: 45000000 },
      { name: "University Merit", value: 650, amount: 32000000 },
      { name: "Athletic", value: 180, amount: 8500000 },
      { name: "International", value: 120, amount: 15000000 }
    ];
  }

  generateAttritionReasonsData(): ChartDataPoint[] {
    return [
      { name: "Academic Performance", value: 35, count: 88 },
      { name: "Financial Hardship", value: 25, count: 63 },
      { name: "Personal/Family", value: 20, count: 50 },
      { name: "Transfer", value: 15, count: 38 },
      { name: "Other", value: 5, count: 13 }
    ];
  }
}

export const analyticsDataService = new AnalyticsDataService();
