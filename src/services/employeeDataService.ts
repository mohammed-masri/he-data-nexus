
import { EmployeeAnalyticsData, EmployeeBasicDetails, EmployeeWorkload, EmployeeSalary } from "@/types/employeeTypes";

export class EmployeeDataService {
  generateMockEmployeeData(): EmployeeAnalyticsData {
    return {
      totalEmployees: 850,
      facultyCount: 420,
      staffCount: 430,
      averageSalary: 185000,
      averageExperience: 8.5,
      departmentDistribution: [
        { name: "Engineering", value: 180 },
        { name: "Business", value: 145 },
        { name: "Liberal Arts", value: 120 },
        { name: "Sciences", value: 110 },
        { name: "Health Sciences", value: 95 },
        { name: "Education", value: 85 },
        { name: "Administration", value: 115 }
      ],
      workloadDistribution: [
        { name: "Teaching", value: 45 },
        { name: "Research", value: 30 },
        { name: "Administration", value: 20 },
        { name: "Other", value: 5 }
      ],
      salaryByPosition: [
        { position: "Professor", salary: 280000 },
        { position: "Associate Professor", salary: 220000 },
        { position: "Assistant Professor", salary: 180000 },
        { position: "Instructor", salary: 140000 },
        { position: "Administrative Staff", salary: 95000 },
        { position: "Research Staff", salary: 160000 }
      ],
      employmentStatusDistribution: [
        { status: "Full-time", count: 720 },
        { status: "Part-time", count: 95 },
        { status: "Contract", count: 35 }
      ]
    };
  }

  generateDepartmentEmployeeData() {
    return [
      { name: "Engineering", faculty: 65, staff: 25, total: 90 },
      { name: "Business", faculty: 55, staff: 20, total: 75 },
      { name: "Liberal Arts", faculty: 45, staff: 15, total: 60 },
      { name: "Sciences", faculty: 50, staff: 18, total: 68 },
      { name: "Health Sciences", faculty: 40, staff: 12, total: 52 },
      { name: "Education", faculty: 35, staff: 10, total: 45 }
    ];
  }

  generateWorkloadTrendsData() {
    return [
      { semester: "Fall 2022", teaching: 42, research: 28, admin: 22, other: 8 },
      { semester: "Spring 2023", teaching: 44, research: 30, admin: 20, other: 6 },
      { semester: "Fall 2023", teaching: 43, research: 32, admin: 19, other: 6 },
      { semester: "Spring 2024", teaching: 45, research: 30, admin: 20, other: 5 },
      { semester: "Fall 2024", teaching: 45, research: 30, admin: 20, other: 5 }
    ];
  }

  generateSalaryAnalysisData() {
    return [
      { department: "Engineering", avgSalary: 195000, medianSalary: 185000, count: 90 },
      { department: "Business", avgSalary: 175000, medianSalary: 170000, count: 75 },
      { department: "Liberal Arts", avgSalary: 165000, medianSalary: 160000, count: 60 },
      { department: "Sciences", avgSalary: 180000, medianSalary: 175000, count: 68 },
      { department: "Health Sciences", avgSalary: 210000, medianSalary: 200000, count: 52 },
      { department: "Education", avgSalary: 155000, medianSalary: 150000, count: 45 }
    ];
  }
}

export const employeeDataService = new EmployeeDataService();
