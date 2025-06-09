
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

interface TypeFilterProps {
  value?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
}

export const TypeFilter = ({ value = "all", onChange, options, label }: TypeFilterProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-10 px-4 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-200 text-gray-700 font-medium"
        >
          <BarChart3 className="w-4 h-4 mr-2 text-purple-500 hover:scale-110 transition-transform duration-200" />
          {selectedOption?.label || `Select ${label.toLowerCase()}`}
          {value !== "all" && (
            <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-800 border-blue-200">
              1
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-lg border-gray-200" align="start">
        <div className="p-2 bg-white rounded-lg">
          {options.map((option) => (
            <Button
              key={option.value}
              variant={value === option.value ? "default" : "ghost"}
              className={`w-full justify-start mb-1 last:mb-0 transition-all duration-200 ${
                value === option.value 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
