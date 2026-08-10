import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hi",
  secondary: "bg-surface text-fg border border-border hover:bg-elevated",
  destructive: "bg-rose text-white hover:opacity-90",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none ${variantClass[variant]} ${className}`}
      {...props}
    />
  ),
);
Button.displayName = "Button";
