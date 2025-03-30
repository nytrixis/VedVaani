"use client";

import { cn } from "@/app/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="w-full">
      <div
        className={cn(
          "transition-bg relative flex h-[120vh] w-full flex-col items-center justify-center bg-himalayan-white text-mystic-indigo dark:bg-mystic-indigo py-8 md:py-16",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden w-full h-full"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#3D348B 10%,#7B2CBF 15%,#7CAFC4 20%,#F7B801 25%,#F18701 30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#3D348B 0%,#3D348B 7%,transparent 10%,transparent 12%,#3D348B 16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#F5F5F5 0%,#F5F5F5 7%,transparent 10%,transparent 12%,#F5F5F5 16%)",
              "--mystic-indigo": "#3D348B",
              "--celestial-purple": "#7B2CBF",
              "--tranquil-sky-blue": "#7CAFC4",
              "--sacred-gold": "#F7B801",
              "--deep-saffron": "#F18701",
              "--himalayan-white": "#F5F5F5",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] w-[calc(100%+20px)] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--mystic-indigo)_10%,var(--celestial-purple)_15%,var(--tranquil-sky-blue)_20%,var(--sacred-gold)_25%,var(--deep-saffron)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--mystic-indigo)_0%,var(--mystic-indigo)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--mystic-indigo)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--himalayan-white)_0%,var(--himalayan-white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--himalayan-white)_16%)] after:absolute after:inset-0 after:w-full after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
