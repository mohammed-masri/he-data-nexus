
interface AnalyticsGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const AnalyticsGrid = ({ 
  children, 
  columns = 4, 
  className = "" 
}: AnalyticsGridProps) => {
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-6 ${className}`}>
      {children}
    </div>
  );
};
