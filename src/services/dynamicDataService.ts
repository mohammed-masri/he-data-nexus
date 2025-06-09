
// Dynamic data service to simulate real institutional data with Fall semester progression
export interface DynamicDataFilters {
  timeRange: string;
  comparison: string;
  view: string;
}

export class DynamicDataService {
  private static instance: DynamicDataService;
  private fallStartDate = new Date('2024-08-01');
  private currentDate = new Date();
  
  static getInstance(): DynamicDataService {
    if (!DynamicDataService.instance) {
      DynamicDataService.instance = new DynamicDataService();
    }
    return DynamicDataService.instance;
  }

  // Calculate days since Fall semester started
  private getDaysSinceFallStart(): number {
    return Math.floor((this.currentDate.getTime() - this.fallStartDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Generate enrollment data with realistic Fall progression
  generateEnrollmentData(filters: DynamicDataFilters) {
    const daysSinceFall = this.getDaysSinceFallStart();
    const baseEnrollment = 7200;
    const seasonalGrowth = Math.min(daysSinceFall * 2.5, 1047); // Growth plateaus after initial enrollment period
    
    return {
      current: baseEnrollment + seasonalGrowth,
      projected: baseEnrollment + 1200,
      trend: filters.timeRange === 'current-semester' ? 'increasing' : 'stable',
      confidence: 87.4 + (daysSinceFall * 0.1)
    };
  }

  // Generate retention data with real patterns
  generateRetentionData(filters: DynamicDataFilters) {
    const daysSinceFall = this.getDaysSinceFallStart();
    const baseRetention = 89.5;
    
    // Retention typically dips slightly mid-semester
    const midSemesterDip = daysSinceFall > 60 && daysSinceFall < 90 ? -1.2 : 0;
    
    return {
      current: baseRetention + midSemesterDip,
      target: 92.0,
      atRiskStudents: Math.max(180 - Math.floor(daysSinceFall * 0.8), 120),
      interventionSuccess: 78.3 + (daysSinceFall * 0.05)
    };
  }

  // Generate performance metrics
  generatePerformanceData(filters: DynamicDataFilters) {
    const daysSinceFall = this.getDaysSinceFallStart();
    
    return {
      avgGPA: 3.42 + (daysSinceFall * 0.002), // Slight improvement over semester
      courseCompletion: 82.5 + (daysSinceFall * 0.03),
      satisfactionScore: 4.6 + (Math.sin(daysSinceFall / 30) * 0.1), // Periodic variation
      budgetUtilization: 68.5 + (daysSinceFall * 0.15) // Increases through semester
    };
  }

  // Generate strategic insights
  generateStrategicData(filters: DynamicDataFilters) {
    const daysSinceFall = this.getDaysSinceFallStart();
    
    return {
      marketPosition: 2,
      competitiveAdvantage: 'digital_infrastructure',
      riskFactors: ['sophomore_retention', 'budget_constraints'],
      opportunities: ['ai_integration', 'research_partnerships'],
      predictedGrowth: 6.7 + (daysSinceFall * 0.01)
    };
  }

  // Generate AI predictions
  generatePredictiveInsights(context: string, filters: DynamicDataFilters) {
    const daysSinceFall = this.getDaysSinceFallStart();
    
    const insights = {
      enrollment: {
        prediction: `Enrollment likely to reach 8,400 by Spring 2025`,
        confidence: 89.2,
        factors: ['Strong Fall performance', 'Effective recruitment', 'Economic conditions']
      },
      retention: {
        prediction: `Retention may dip 2-3% in mid-November, recovery expected`,
        confidence: 76.8,
        factors: ['Historical patterns', 'Student stress indicators', 'Support program effectiveness']
      },
      academic: {
        prediction: `GPA trends suggest 3% improvement by semester end`,
        confidence: 82.4,
        factors: ['Early intervention programs', 'Faculty development', 'Student engagement']
      },
      strategic: {
        prediction: `Digital transformation ROI expected to reach 287% by 2025`,
        confidence: 91.6,
        factors: ['Technology adoption rates', 'Process optimization', 'Student satisfaction improvements']
      }
    };

    return insights[context as keyof typeof insights] || insights.enrollment;
  }

  // Generate daily incremental updates
  generateIncrementalUpdates() {
    const today = new Date().toLocaleDateString();
    
    return {
      date: today,
      recordsUpdated: Math.floor(Math.random() * 50) + 200,
      newEnrollments: Math.floor(Math.random() * 15) + 5,
      dataQualityScore: 98.5 + (Math.random() * 1.0),
      systemHealth: 'optimal',
      lastSyncTime: new Date().toLocaleTimeString()
    };
  }
}

export const dynamicData = DynamicDataService.getInstance();
