import { FC, LabelHTMLAttributes } from "react";
import { cn } from "@/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };
