import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  background?: "white" | "gray" | "blue" | "gradient";
  padding?: "sm" | "md" | "lg";
}

export function OptimizedSection({ children, id, background = "white", padding = "md" }: SectionProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    gradient: "bg-gradient-to-br from-blue-600 to-green-600"
  };

  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16"
  };

  return (
    <section 
      id={id} 
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function ContentCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      {children}
    </div>
  );
}

export function GridLayout({ children, cols = 4 }: { children: ReactNode; cols?: number }) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${colClasses[cols as keyof typeof colClasses]} gap-6`}>
      {children}
    </div>
  );
}