import React from 'react';

export const metadata = {
  title: 'Dashboard - VedVaani',
  description: 'Your spiritual journey dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-himalayan-white to-tranquil-sky-blue bg-opacity-10">
      {children}
    </div>
  );
}
