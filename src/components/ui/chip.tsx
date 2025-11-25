import { cn } from "@/utils";

interface ChipProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "orange" | "gray";
}

const variantMap = {
  default: "text-tino-blue-02 bg-tino-blue-01",
  orange: "text-[#FF5500] bg-[#FFF6F1]",
  gray: "text-[#333] bg-[#F2F2F2]",
};

export default function Chip({ children, className, variant = "default", ...props }: ChipProps) {
  return (
    <p
      className={cn("text-2xs w-max rounded-[3px] px-1 py-0.5", variantMap[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
}
