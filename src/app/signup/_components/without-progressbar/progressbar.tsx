import { cn } from "@/utils";

interface ProgressbarProps {
  step: number;
}

export default function Progressbar({ step }: ProgressbarProps) {
  return (
    <div className="flex items-center gap-1 px-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-0.5 flex-1 rounded-xs transition-colors",
            index < step ? "bg-secondary" : "bg-tino-light-gray"
          )}
        />
      ))}
    </div>
  );
}
