
import { Building2, BarChart3, Key, MessageSquare, FileText, Database, Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./UserProfile";

const navigationItems = [
  { title: "Dashboard", value: "dashboard", icon: Building2 },
  { title: "API Management", value: "api", icon: Key },
  { title: "Surveys", value: "surveys", icon: MessageSquare },
  { title: "Analytics", value: "analytics", icon: BarChart3 },
  { title: "Logs", value: "logs", icon: Database },
  { title: "Support", value: "support", icon: FileText },
];

interface InstitutionTopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function InstitutionTopNav({ activeTab, onTabChange }: InstitutionTopNavProps) {
  return (
    <header className="bg-white shadow-sm border-b border-ds-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img 
              src="https://seabackend.creatrixcampus.com/uploads/img/logo.png" 
              alt="SEA Logo"
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-ds-text-primary">Institution Portal</h1>
              <p className="text-xs text-ds-text-secondary hidden md:block">Sharjah Education Academy</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onTabChange(item.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.value
                    ? 'bg-ds-secondary text-ds-primary'
                    : 'text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="flex items-center space-x-2 text-sm text-ds-text-secondary hover:text-ds-primary transition-colors">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">EN</span>
            </button>
            <UserProfile 
              userName="Shadia Alzaatary"
              userRole="Director, Institutional Effectiveness & QA"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-ds-border pt-2 pb-2">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {navigationItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onTabChange(item.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === item.value
                    ? 'bg-ds-secondary text-ds-primary'
                    : 'text-ds-text-secondary hover:text-ds-primary hover:bg-ds-secondary/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
