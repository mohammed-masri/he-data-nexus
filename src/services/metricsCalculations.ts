
import { AnalyticsData } from "./analyticsDataService";

export class MetricsCalculations {
  static calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100 * 10) / 10;
  }

  static calculateTargetProgress(current: number, target: number): number {
    if (target === 0) return 0;
    return Math.round((current / target) * 100 * 10) / 10;
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  static formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  static formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  static getChangeType(current: number, previous: number): "increase" | "decrease" | "neutral" {
    if (current > previous) return "increase";
    if (current < previous) return "decrease";
    return "neutral";
  }

  static calculateOverallScore(data: AnalyticsData): number {
    const enrollmentScore = Math.min((data.enrollment.current / data.enrollment.target) * 100, 100);
    const performanceScore = (data.performance.avgGPA / 4.0) * 100;
    const financialScore = data.financial.budgetUtilization;
    const strategicScore = Math.max(100 - (data.strategic.marketPosition - 1) * 10, 0);
    
    return Math.round((enrollmentScore + performanceScore + financialScore + strategicScore) / 4);
  }

  static generateInsights(data: AnalyticsData): string[] {
    const insights: string[] = [];
    
    const enrollmentGrowth = this.calculateGrowthRate(data.enrollment.current, data.enrollment.previous);
    if (enrollmentGrowth > 10) {
      insights.push(`Exceptional enrollment growth of ${enrollmentGrowth}% exceeds expectations`);
    }
    
    if (data.performance.avgGPA > 3.5) {
      insights.push("Academic performance remains strong with high GPA averages");
    }
    
    if (data.financial.budgetUtilization > 75 && data.financial.budgetUtilization < 85) {
      insights.push("Budget utilization is in the optimal efficiency range");
    }
    
    if (data.strategic.marketPosition <= 3) {
      insights.push("Institution maintains strong competitive positioning in the market");
    }
    
    return insights;
  }
}
