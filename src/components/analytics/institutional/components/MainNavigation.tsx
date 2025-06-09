
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, BarChart3, Activity } from "lucide-react";

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const MainNavigation = ({ activeTab, onTabChange }: MainNavigationProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "detailed", label: "Area Analysis", icon: BarChart3 },
    { id: "deep-dive", label: "Deep Insights", icon: Activity }
  ];

  return (
    <div className="bg-white border border-ds-border rounded-xl p-1.5 shadow-lg animate-fade-in">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-transparent w-full grid grid-cols-1 sm:grid-cols-3 gap-2 h-auto">
          {tabs.map((tab, index) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-ds-primary data-[state=active]:to-ds-primary-dark data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-3 py-3 text-sm lg:text-base font-medium hover:bg-ds-secondary group transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <IconComponent className="w-4 h-4 mr-2 group-hover:animate-pulse flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};
