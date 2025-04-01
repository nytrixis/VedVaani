'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/app/components/ui/footer'

export default function ClientFooter() {
  const pathname = usePathname();
  
  // Don't render the footer on dashboard or feature pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/features')) {
    return null;
  }
  
  return <Footer />;
}
