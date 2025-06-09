
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface UserProfileProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
}

export function UserProfile({ userName, userRole }: UserProfileProps) {
  const initials = userName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

  // Generate dynamic color based on initials
  const getAvatarColor = (initials: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600', 
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-rose-500 to-rose-600',
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 hover:bg-accent/50 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarFallback className={`${getAvatarColor(initials)} text-white text-sm font-semibold shadow-lg`}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-white border-ds-border shadow-xl" align="end">
        <div className="space-y-1">
          <div className="px-3 py-2 bg-gradient-to-r from-ds-secondary/30 to-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`${getAvatarColor(initials)} text-white text-sm font-semibold`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-ds-text-primary">{userName}</p>
                <p className="text-xs text-ds-text-secondary">{userRole}</p>
              </div>
            </div>
          </div>
          <Separator className="border-ds-border/50" />
          <Button variant="ghost" className="w-full justify-start text-ds-text-primary hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <User className="w-4 h-4 mr-3 text-blue-500" />
            View Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-ds-text-primary hover:bg-purple-50 hover:text-purple-600 transition-colors">
            <Settings className="w-4 h-4 mr-3 text-purple-500" />
            Account Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-ds-text-primary hover:bg-teal-50 hover:text-teal-600 transition-colors">
            <HelpCircle className="w-4 h-4 mr-3 text-teal-500" />
            Help & Support
          </Button>
          <Separator className="border-ds-border/50" />
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
