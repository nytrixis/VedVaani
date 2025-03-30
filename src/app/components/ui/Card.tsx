import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const cardVariants = cva(
  "rounded-lg p-6 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-himalayan-white shadow-md",
        divine: "bg-himalayan-white shadow-divine-glow border border-sacred-gold",
        mystic: "bg-gradient-divine text-himalayan-white",
        elevated: "bg-himalayan-white shadow-md hover:shadow-lg transition-shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
