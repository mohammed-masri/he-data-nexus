
import { Building2, Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { UserProfile } from "../UserProfile";

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  showBackToHome?: boolean;
  showUserProfile?: boolean;
  userName?: string;
  userRole?: string;
}

export function Header({ 
  title, 
  subtitle, 
  icon: Icon, 
  showBackToHome = true,
  showUserProfile = false,
  userName = "Dr. Sarah Al-Zahra",
  userRole = "Regulatory Officer"
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-ds-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            {showBackToHome && (
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-ds-text-secondary hover:text-ds-primary transition-colors duration-200 order-2 sm:order-1"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            )}
            <div className="flex items-center space-x-3 order-1 sm:order-2">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-ds-primary flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-ds-text-primary truncate">{title}</h1>
                <p className="text-xs sm:text-sm text-ds-text-secondary truncate">{subtitle}</p>
              </div>
            </div>
          </div>
          
          {showUserProfile && (
            <div className="flex items-center w-full sm:w-auto justify-end">
              <UserProfile 
                userName={userName}
                userRole={userRole}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
