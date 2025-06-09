
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "./UserProfile";

export function RegulatorTopBar() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-ds-border">
      <div className="flex items-center">
        <SidebarTrigger className="text-ds-text-secondary hover:text-ds-primary" />
      </div>
      <div className="flex items-center">
        <UserProfile 
          userName="Dr. Sarah Al-Zahra"
          userRole="Governance Officer"
        />
      </div>
    </header>
  );
}
