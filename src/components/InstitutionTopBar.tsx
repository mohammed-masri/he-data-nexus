
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "./UserProfile";

export function InstitutionTopBar() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-ds-border">
      <div className="flex items-center">
        <SidebarTrigger className="text-ds-text-secondary hover:text-ds-primary" />
      </div>
      <div className="flex items-center">
        <UserProfile 
          userName="Shadia Alzaatary"
          userRole="Director, Institutional Effectiveness & QA"
        />
      </div>
    </header>
  );
}
