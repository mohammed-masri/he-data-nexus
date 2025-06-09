
import { Shield, Building2, BarChart3, MessageSquare, Users, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", value: "overview", icon: Shield, color: "ds-primary" },
  { title: "Institutions", value: "institutions", icon: Building2, color: "active-blue" },
  { title: "Analytics", value: "analytics", icon: BarChart3, color: "active-purple" },
  { title: "Surveys", value: "surveys", icon: MessageSquare, color: "active-orange" },
  { title: "Administration", value: "administration", icon: Settings, color: "active-indigo" },
];

export function RegulatorSidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-ds-border bg-white">
      <SidebarHeader className="border-b border-ds-border bg-gradient-to-r from-ds-bg-grey-light to-white">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2">
          <div className="p-2 bg-gradient-to-br from-ds-primary to-ds-primary-dark rounded-lg shadow-sm">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-ds-text-primary truncate">Governance Portal</h2>
              <p className="text-xs sm:text-sm text-ds-text-secondary truncate">Sharjah's Council for Higher Education and Scientific Research</p>
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
