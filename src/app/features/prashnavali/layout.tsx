import React from 'react';

export const metadata = {
  title: 'Prashnavali 2.0 - VedVaani',
  description: 'AI-Driven Divine Oracle that provides scripture-based wisdom for your questions',
}

export default function PrashnavaliLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
