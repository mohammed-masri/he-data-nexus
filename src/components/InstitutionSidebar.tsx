
import { Building2, BarChart3, Key, MessageSquare, FileText, Database, Clock } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", value: "dashboard", icon: Building2, color: "ds-primary" },
  { title: "API Management", value: "api", icon: Key, color: "active-blue" },
  { title: "Surveys", value: "surveys", icon: MessageSquare, color: "active-orange" },
  { title: "Analytics", value: "analytics", icon: BarChart3, color: "active-purple" },
  { title: "Logs", value: "logs", icon: Database, color: "active-teal" },
  { title: "Support", value: "support", icon: FileText, color: "active-indigo" },
];

export function InstitutionSidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-ds-border bg-white">
      <SidebarHeader className="border-b border-ds-border bg-gradient-to-r from-ds-bg-grey-light to-white">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2">
          <div className="p-1.5 bg-white rounded-lg shadow-sm border border-ds-border">
            <img 
              src="https://seabackend.creatrixcampus.com/uploads/img/logo.png" 
              alt="SEA Logo"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-ds-text-primary truncate">Institution Portal</h2>
              <p className="text-xs sm:text-sm text-ds-text-secondary truncate">Sharjah Education Academy</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activeTab === item.value}
                    onClick={() => onTabChange(item.value)}
                    className={`hover:bg-ds-secondary hover:text-ds-primary transition-all duration-200 group relative ${
                      activeTab === item.value 
                        ? `bg-gradient-to-r from-ds-secondary to-ds-secondary/50 text-ds-primary border-r-4 border-ds-primary shadow-sm`
                        : 'text-ds-text-secondary hover:shadow-sm'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md transition-all duration-200 ${
                      activeTab === item.value 
                        ? `bg-ds-secondary`
                        : `group-hover:bg-ds-secondary`
                    }`}>
                      <item.icon className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                        activeTab === item.value 
                          ? item.color === "ds-primary"
                            ? `text-ds-primary`
                            : `text-${item.color}-600`
                          : `text-ds-primary group-hover:text-ds-primary`
                      }`} />
                    </div>
                    {!collapsed && (
                      <span className="truncate font-medium">{item.title}</span>
                    )}
                    {activeTab === item.value && !collapsed && (
                      <div className="absolute right-2 w-2 h-2 rounded-full bg-ds-primary animate-pulse"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
