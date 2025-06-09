
import { LucideIcon } from "lucide-react";

interface HorizontalServiceCardProps {
  title: string;
  icon: LucideIcon;
  onCardClick?: () => void;
  className?: string;
}

const HorizontalServiceCard = ({ 
  title, 
  icon: Icon, 
  onCardClick,
  className = ""
}: HorizontalServiceCardProps) => {
  return (
    <div 
      className={`bg-white rounded-3xl border border-ds-border hover:shadow-xl transition-all duration-300 cursor-pointer text-center relative overflow-hidden w-[358px] h-[317px] ${className}`}
      onClick={onCardClick}
    >
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-8">
        <div className="w-24 h-24 rounded-2xl bg-ds-secondary flex items-center justify-center mb-6 shadow-lg">
          <Icon className="w-12 h-12 text-ds-primary" />
        </div>
        <h3 className="text-xl font-bold text-ds-text-primary leading-tight mb-3">{title}</h3>
        <p className="text-ds-text-secondary text-sm leading-relaxed">
          Join Sharjah's vision for academic excellence through our comprehensive platform
        </p>
      </div>
    </div>
  );
};

export default HorizontalServiceCard;
