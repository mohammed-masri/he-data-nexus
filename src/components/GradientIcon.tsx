
import React from "react";
import { LucideIcon } from "lucide-react";

interface GradientIconProps {
  icon: LucideIcon;
  gradientType?: "primary" | "secondary" | "neutral" | "success";
  size?: number;
  className?: string;
}

export const GradientIcon: React.FC<GradientIconProps> = ({
  icon: Icon,
  gradientType = "primary",
  size = 16,
  className = "",
}) => {
  const gradientId = `gradient-${gradientType}-${Math.random().toString(36).substr(2, 9)}`;

  const gradientColors = {
    primary: { from: "hsl(var(--green-primary))", to: "hsl(var(--grey-medium))" },
    secondary: { from: "#22c55e", to: "#86efac" },
    neutral: { from: "hsl(var(--grey-light))", to: "hsl(var(--grey-dark))" },
    success: { from: "#22c55e", to: "#059669" },
  };

  const colors = gradientColors[gradientType];

  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
        </defs>
        <Icon size={size} style={{ stroke: `url(#${gradientId})`, fill: "none" }} />
      </svg>
    </div>
  );
};
