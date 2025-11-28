import { cn } from "@/utils";

export default function FloatingContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-mobile fixed bottom-0 left-1/2 w-full -translate-x-1/2 px-4 py-2.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
