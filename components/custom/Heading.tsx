import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor?: string;
}

export function Heading({ 
  title, 
  description, 
  icon: Icon,
  bgColor 
}: HeadingProps) {
  return (
    <header className="px-4 lg:px-8 flex items-center gap-x-4 mb-8">
      <div className={cn("p-4 rounded-3xl", bgColor)}>
        <Icon className={cn("w-16 h-16 text-xl text-white")} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </header>
  );
}