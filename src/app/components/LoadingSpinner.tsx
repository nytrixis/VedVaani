import { Card } from '@/app/components/ui/Card';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading your divine journey...' }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-himalayan-white">
      <Card variant="divine" className="p-8 shadow-divine-glow">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-mystic-indigo text-lg">{message}</p>
        </div>
      </Card>
    </div>
  );
}
