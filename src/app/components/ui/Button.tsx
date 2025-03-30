import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sacred-gold focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-deep-saffron text-himalayan-white hover:bg-opacity-90",
        secondary: "bg-tranquil-sky-blue text-himalayan-white hover:bg-opacity-90",
        outline: "bg-transparent border border-mystic-indigo text-mystic-indigo hover:bg-mystic-indigo hover:text-himalayan-white",
        ghost: "bg-transparent hover:bg-celestial-purple hover:bg-opacity-10 text-mystic-indigo",
        divine: "bg-gradient-button text-himalayan-white hover:opacity-90",
        elevated: "bg-himalayan-white text-mystic-indigo shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
