
export interface KPIPillarData {
  id: string;
  name: string;
  status: 'on-track' | 'needs-attention' | 'exceeds-target';
  overallScore: number;
  metrics: KPIMetric[];
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface KPIMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
  threeYearAverage?: number;
  fiveYearAverage?: number;
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'needs-attention' | 'exceeds-target';
  description: string;
}

export interface KPIChartData {
  name: string;
  value: number;
  target?: number;
  [key: string]: any;
}

class KPIDataService {
  generatePillarData(): KPIPillarData[] {
    return [
      {
        id: 'employment-outcomes',
        name: 'Employment Outcomes',
        status: 'on-track',
        overallScore: 82,
        trend: 'up',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'employment-rate',
            name: 'Employment Rate',
            value: 84.5,
            unit: '%',
            target: 85,
            threeYearAverage: 82.3,
            fiveYearAverage: 79.8,
            trend: 'up',
            status: 'on-track',
            description: 'Percentage of graduates employed within 6 months'
          },
          {
            id: 'relevant-employment',
            name: 'Employment Rate in Relevant Jobs',
            value: 78.2,
            unit: '%',
            target: 80,
            threeYearAverage: 76.1,
            fiveYearAverage: 73.5,
            trend: 'up',
            status: 'needs-attention',
            description: 'Graduates employed in field-relevant positions'
          }
        ]
      },
      {
        id: 'learning-outcomes',
        name: 'Learning Outcomes',
        status: 'exceeds-target',
        overallScore: 91,
        trend: 'up',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'retention-rate',
            name: 'Retention Rate (FYR)',
            value: 92.5,
            unit: '%',
            target: 90,
            threeYearAverage: 91.2,
            fiveYearAverage: 89.8,
            trend: 'up',
            status: 'exceeds-target',
            description: 'First-year retention rate'
          },
          {
            id: 'employer-feedback-placement',
            name: 'Employer Feedback in Work Placements',
            value: 4.3,
            unit: '/5',
            target: 4.0,
            threeYearAverage: 4.1,
            fiveYearAverage: 3.9,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Employer satisfaction with student placements'
          },
          {
            id: 'employer-feedback-employment',
            name: 'Employer Feedback in Employment',
            value: 4.2,
            unit: '/5',
            target: 4.0,
            threeYearAverage: 4.0,
            fiveYearAverage: 3.8,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Employer satisfaction with graduate performance'
          },
          {
            id: 'certification-success',
            name: 'Success Rate in Licenses & Certifications',
            value: 88.7,
            unit: '%',
            target: 85,
            threeYearAverage: 86.3,
            fiveYearAverage: 84.1,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Professional certification pass rates'
          },
          {
            id: 'student-satisfaction',
            name: 'Student Satisfaction with Learning Experience',
            value: 4.5,
            unit: '/5',
            target: 4.2,
            threeYearAverage: 4.3,
            fiveYearAverage: 4.1,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Overall learning experience satisfaction'
          }
        ]
      },
      {
        id: 'industry-collaboration',
        name: 'Industry Collaboration',
        status: 'on-track',
        overallScore: 76,
        trend: 'stable',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'job-offer-post-placement',
            name: 'Job Offer Post Work-placement',
            value: 68.4,
            unit: '%',
            target: 70,
            threeYearAverage: 67.2,
            fiveYearAverage: 65.8,
            trend: 'up',
            status: 'needs-attention',
            description: 'Students receiving job offers after placements'
          },
          {
            id: 'placement-participation',
            name: 'Student Participation Rate in Work Placements',
            value: 85.3,
            unit: '%',
            target: 80,
            threeYearAverage: 83.1,
            fiveYearAverage: 81.7,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Students participating in work placements'
          },
          {
            id: 'joint-industry-courses',
            name: 'Joint Industry Courses',
            value: 12.5,
            unit: '%',
            target: 15,
            threeYearAverage: 11.8,
            fiveYearAverage: 10.2,
            trend: 'up',
            status: 'needs-attention',
            description: 'Courses developed with industry partners'
          },
          {
            id: 'industry-contributions',
            name: 'Industry Contributions',
            value: 2.8,
            unit: 'M AED',
            target: 3.0,
            threeYearAverage: 2.5,
            fiveYearAverage: 2.1,
            trend: 'up',
            status: 'on-track',
            description: 'Financial contributions from industry partners'
          }
        ]
      },
      {
        id: 'research-outcomes',
        name: 'Research Outcomes',
        status: 'on-track',
        overallScore: 79,
        trend: 'up',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'publication-ratio',
            name: 'Publication Ratio',
            value: 1.8,
            unit: 'per faculty',
            target: 2.0,
            threeYearAverage: 1.6,
            fiveYearAverage: 1.4,
            trend: 'up',
            status: 'on-track',
            description: 'Publications per faculty member'
          },
          {
            id: 'joint-industry-research',
            name: 'Joint Industry Research',
            value: 24.6,
            unit: '%',
            target: 25,
            threeYearAverage: 22.8,
            fiveYearAverage: 20.3,
            trend: 'up',
            status: 'on-track',
            description: 'Research projects with industry collaboration'
          },
          {
            id: 'student-research-participation',
            name: 'Student Participation Rate in Research',
            value: 35.2,
            unit: '%',
            target: 40,
            threeYearAverage: 33.8,
            fiveYearAverage: 31.5,
            trend: 'up',
            status: 'needs-attention',
            description: 'Students engaged in research activities'
          },
          {
            id: 'research-impact',
            name: 'Impact of Research',
            value: 78.5,
            unit: '%',
            target: 75,
            threeYearAverage: 76.2,
            fiveYearAverage: 73.8,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Research projects with measurable impact'
          },
          {
            id: 'intellectual-property',
            name: 'Awarded Intellectual Property',
            value: 12,
            unit: 'patents',
            target: 10,
            threeYearAverage: 9,
            fiveYearAverage: 7,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Patents and IP awards granted'
          }
        ]
      },
      {
        id: 'reputation',
        name: 'Reputation',
        status: 'exceeds-target',
        overallScore: 88,
        trend: 'up',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'global-rankings',
            name: 'Global University and Subject Rankings',
            value: 245,
            unit: 'rank',
            target: 300,
            threeYearAverage: 267,
            fiveYearAverage: 289,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Best global ranking achieved'
          },
          {
            id: 'accreditation-status',
            name: 'International Accreditation Status',
            value: 8,
            unit: 'accreditations',
            target: 6,
            threeYearAverage: 7,
            fiveYearAverage: 5,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Number of international accreditations'
          },
          {
            id: 'dual-degree-participation',
            name: 'Student Participation Rate in International Dual Degrees',
            value: 18.7,
            unit: '%',
            target: 15,
            threeYearAverage: 16.2,
            fiveYearAverage: 13.8,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Students in dual degree programs'
          },
          {
            id: 'international-research',
            name: 'International Research Collaboration',
            value: 42.3,
            unit: '%',
            target: 35,
            threeYearAverage: 38.9,
            fiveYearAverage: 34.2,
            trend: 'up',
            status: 'exceeds-target',
            description: 'Research projects with international partners'
          }
        ]
      },
      {
        id: 'community-engagement',
        name: 'Community Engagement',
        status: 'on-track',
        overallScore: 73,
        trend: 'stable',
        lastUpdated: '2025-01-02',
        metrics: [
          {
            id: 'academic-events',
            name: 'Academic Events with Student Participation',
            value: 28,
            unit: 'events',
            target: 30,
            threeYearAverage: 26,
            fiveYearAverage: 24,
            trend: 'up',
            status: 'on-track',
            description: 'Academic events with student involvement'
          },
          {
            id: 'community-outreach',
            name: 'Community Outreach Programs',
            value: 15,
            unit: 'programs',
            target: 18,
            threeYearAverage: 14,
            fiveYearAverage: 12,
            trend: 'up',
            status: 'needs-attention',
            description: 'Active community engagement programs'
          },
          {
            id: 'social-impact-score',
            name: 'Social Impact Score',
            value: 7.2,
            unit: '/10',
            target: 7.5,
            threeYearAverage: 6.8,
            fiveYearAverage: 6.3,
            trend: 'up',
            status: 'on-track',
            description: 'Measured social impact of university activities'
          }
        ]
      }
    ];
  }

  generateTrendData(pillarId: string): KPIChartData[] {
    const baseData = [
      { name: '2020', value: 70 },
      { name: '2021', value: 73 },
      { name: '2022', value: 76 },
      { name: '2023', value: 79 },
      { name: '2024', value: 82 }
    ];

    // Vary data based on pillar
    const multiplier = pillarId === 'reputation' ? 1.1 : 
                     pillarId === 'learning-outcomes' ? 1.15 : 
                     pillarId === 'employment-outcomes' ? 1.05 : 1.0;

    return baseData.map(item => ({
      ...item,
      value: Math.round(item.value * multiplier),
      target: 85
    }));
  }

  generateComparisonData(): KPIChartData[] {
    return [
      { name: 'Employment Outcomes', value: 82, ourScore: 82, peerAverage: 78, nationalAverage: 75 },
      { name: 'Learning Outcomes', value: 91, ourScore: 91, peerAverage: 85, nationalAverage: 82 },
      { name: 'Industry Collaboration', value: 76, ourScore: 76, peerAverage: 72, nationalAverage: 69 },
      { name: 'Research Outcomes', value: 79, ourScore: 79, peerAverage: 81, nationalAverage: 77 },
      { name: 'Reputation', value: 88, ourScore: 88, peerAverage: 84, nationalAverage: 80 },
      { name: 'Community Engagement', value: 73, ourScore: 73, peerAverage: 75, nationalAverage: 71 }
    ];
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'exceeds-target':
        return 'text-green-600';
      case 'on-track':
        return 'text-blue-600';
      case 'needs-attention':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case 'exceeds-target':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs-attention':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
}

export const kpiDataService = new KPIDataService();
