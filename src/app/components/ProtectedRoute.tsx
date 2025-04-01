"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Card } from '@/app/components/ui/Card';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If authentication is done loading and there's no user, redirect to login
    if (!loading && !user) {
      // Store the current path to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-himalayan-white">
        <Card variant="divine" className="p-8 shadow-divine-glow">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-mystic-indigo text-lg">Loading your divine journey...</p>
          </div>
        </Card>
      </div>
    );
  }

  // If not loading and we have a user, render the children
  if (!loading && user) {
    return <>{children}</>;
  }

  // This return is just a fallback and shouldn't be visible
  // because of the redirect in the useEffect
  return null;
}
