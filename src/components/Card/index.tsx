import { FC, ReactNode } from "react";
import { cn } from "@/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-slate-100 bg-white shadow-sm transition-colors hover:border-blue-200",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader: FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-t-lg bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardTitle: FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h3 className={cn("text-lg font-semibold text-slate-900", className)}>
      {children}
    </h3>
  );
};

const CardContent: FC<CardContentProps> = ({ className, children }) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
