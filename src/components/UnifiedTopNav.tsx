
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./UserProfile";
import { useState } from "react";

interface NavigationItem {
  title: string;
  value: string;
}

interface UnifiedTopNavProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle?: string;
  navigationItems: NavigationItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userRole: string;
  showLanguageToggle?: boolean;
}

export function UnifiedTopNav({
  logoSrc,
  logoAlt,
  title,
  subtitle,
  navigationItems,
  activeTab,
  onTabChange,
  userName,
  userRole,
  showLanguageToggle = true
}: UnifiedTopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title - Left aligned */}
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="h-8 w-auto"
            />
            <div className="min-w-0 hidden sm:block">
              <h1 className="text-base font-semibold text-gray-900 truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-gray-500 hidden lg:block truncate">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => onTabChange(item.value)}
                  className={`relative text-sm font-medium transition-colors duration-200 py-4 px-2 hover:bg-gray-50 rounded-md ${
                    activeTab === item.value
                      ? 'text-[#00A651]'
                      : 'text-gray-600 hover:text-[#00A651]'
                  }`}
                >
                  {item.title}
                  {activeTab === item.value && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A651]" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {showLanguageToggle && (
              <button className="hidden sm:flex items-center space-x-1 text-sm text-gray-600 hover:text-[#00A651] hover:bg-gray-50 transition-all duration-200 px-2 py-1 rounded-md">
                <Globe className="w-4 h-4 hover:scale-110 transition-transform duration-200" />
                <span>عربي</span>
              </button>
            )}
            
            <UserProfile 
              userName={userName}
              userRole={userRole}
            />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#00A651] hover:bg-gray-50 transition-all duration-200 rounded-md"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onTabChange(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                    activeTab === item.value
                      ? 'text-[#00A651] bg-gray-50 border-r-2 border-[#00A651]'
                      : 'text-gray-600 hover:text-[#00A651]'
                  }`}
                >
                  {item.title}
                </button>
              ))}
              
              {showLanguageToggle && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-[#00A651] hover:bg-gray-50 transition-all duration-200 px-2 py-1 rounded-md">
                    <Globe className="w-4 h-4 hover:scale-110 transition-transform duration-200" />
                    <span>عربي</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
