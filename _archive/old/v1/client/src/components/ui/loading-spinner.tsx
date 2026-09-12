import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-16 w-16"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-trust-blue border-t-transparent",
        sizeClasses[size],
        className
      )}
      data-testid="loading-spinner"
    />
  );
}
