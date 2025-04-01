import React from 'react';

export const metadata = {
  title: 'Profile - VedVaani',
  description: 'Manage your spiritual profile',
}

export default function ProfileLayout({
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
