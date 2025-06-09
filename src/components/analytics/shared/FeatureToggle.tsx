
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Brain, MessageSquare, Mic } from "lucide-react";

export interface AnalyticsFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const features: AnalyticsFeature[] = [
  {
    id: "reporting",
    name: "Reporting",
    description: "Standard reports and dashboards",
    icon: BarChart3,
    color: "bg-blue-500"
  },
  {
    id: "predictive",
    name: "Predictive AI",
    description: "ML-powered predictions and forecasting",
    icon: Brain,
    color: "bg-purple-500"
  },
  {
    id: "genai",
    name: "Gen AI",
    description: "Text-to-SQL and AI summaries",
    icon: MessageSquare,
    color: "bg-green-500"
  },
  {
    id: "voice",
    name: "Voice Analytics",
    description: "Voice-to-text and audio insights",
    icon: Mic,
    color: "bg-orange-500"
  }
];

interface FeatureToggleProps {
  selectedFeature: string;
  onFeatureChange: (feature: string) => void;
}

export const FeatureToggle = ({ selectedFeature, onFeatureChange }: FeatureToggleProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-ds-text-primary">Analytics Features</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isSelected = selectedFeature === feature.id;
          
          return (
            <Button
              key={feature.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onFeatureChange(feature.id)}
              className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                isSelected 
                  ? "bg-ds-primary hover:bg-ds-primary-dark shadow-lg" 
                  : "border-ds-border hover:bg-ds-bg-grey-light"
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? "bg-white/20" : feature.color}`}>
                <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-white"}`} />
              </div>
              <div className="text-center">
                <div className={`font-medium text-sm ${isSelected ? "text-white" : "text-ds-text-primary"}`}>
                  {feature.name}
                </div>
                <div className={`text-xs ${isSelected ? "text-white/80" : "text-ds-text-muted"}`}>
                  {feature.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
