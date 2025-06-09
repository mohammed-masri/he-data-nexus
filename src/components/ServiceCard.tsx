
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  onButtonClick?: () => void;
  className?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  buttonText, 
  icon: Icon, 
  onButtonClick,
  className = ""
}: ServiceCardProps) => {
  return (
    <Card className={`border border-ds-border hover:shadow-lg transition-all duration-300 bg-white ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-2xl bg-ds-secondary flex items-center justify-center mb-4 mx-auto">
          <Icon className="w-8 h-8 text-ds-primary" />
        </div>
        <CardTitle className="text-2xl text-ds-text-primary mb-4">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg text-ds-text-secondary mb-8 leading-relaxed">
          {description}
        </p>
        <Button 
          size="lg" 
          className="h-14 text-lg font-semibold bg-ds-primary hover:bg-ds-primary-dark text-white rounded-xl px-8 transition-all duration-300"
          onClick={onButtonClick}
        >
          <Icon className="w-5 h-5 mr-3" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
