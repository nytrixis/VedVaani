"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  console.log("ProtectedRoute: loading:", loading, "user:", user ? "exists" : "null", "mounted:", mounted);

  // Safety timeout for local loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localLoading) {
        console.log("ProtectedRoute: Safety timeout triggered - forcing localLoading to false");
        setLocalLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [localLoading]);

  useEffect(() => {
    setMounted(true);
    
    // Update local loading state based on auth loading
    if (!loading) {
      setLocalLoading(false);
    }
    
    // If authentication is done loading and there's no user, redirect to login
    if (!loading && !user) {
      console.log("ProtectedRoute: Redirecting to login");
      // Store the current path to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Show loading state while checking authentication
  if (loading && localLoading) {
    console.log("ProtectedRoute: Showing loading spinner");
    return (
      <div className="min-h-screen flex items-center justify-center bg-himalayan-white">
        <Card variant="divine" className="p-8 shadow-divine-glow">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-mystic-indigo text-lg">Checking authentication...</p>
          </div>
        </Card>
      </div>
    );
  }

  // If we have a user or if the safety timeout has triggered, render the children
  return <>{children}</>;
}
