import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-divine">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-himalayan-white mb-4">
          <span className="text-shadow-divine">404</span>
        </h1>
        <h2 className="text-3xl font-bold text-sacred-gold mb-6">
          Page Not Found
        </h2>
        <p className="text-himalayan-white mb-8">
          Bhule bhatke vats, let's go home.
        </p>
        <Link href="/">
          <Button variant="divine" size="lg" className="shadow-divine-glow">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
