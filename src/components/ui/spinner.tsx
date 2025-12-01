import { cn } from "@/utils";

import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return <Loader2 className={cn("text-secondary animate-spin", className)} />;
}
