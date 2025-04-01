"use client";

import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // No need to redirect, the ProtectedRoute will handle it
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-himalayan-white to-tranquil-sky-blue bg-opacity-10 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="divine" className="mb-8 shadow-divine-glow">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-mystic-indigo mb-2">
                    Welcome, <span className="text-sacred-gold">{user?.full_name || user?.email?.split('@')[0] || 'Seeker'}</span>
                  </h1>
                  <p className="text-ashram-gray">Your divine journey continues...</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-himalayan-white"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <FeatureCard 
              title="Prashnavali 2.0"
              description="Ask questions and receive divine wisdom from ancient scriptures"
              icon="🔮"
              link="/features/prashnavali"
              color="deep-saffron"
            />
            
            <FeatureCard 
              title="Spiritual Twin"
              description="Connect with your AI spiritual guide"
              icon="🧘‍♂️"
              link="/features/spiritual-twin"
              color="celestial-purple"
            />
            
            <FeatureCard 
              title="Mystic Sound Bath"
              description="Experience healing through sacred sounds and mantras"
              icon="🎵"
              link="/features/sound-bath"
              color="tranquil-sky-blue"
            />
            
            <FeatureCard 
              title="AnuShakti"
              description="Explore quantum meditation techniques"
              icon="⚛️"
              link="/features/anushakti"
              color="glowing-cyan"
            />
            
            <FeatureCard 
              title="Sacred Journal"
              description="Record your spiritual insights and progress"
              icon="📜"
              link="/features/journal"
              color="lotus-pink"
            />
            
            <FeatureCard 
              title="Profile Settings"
              description="Update your spiritual preferences and account details"
              icon="⚙️"
              link="/profile"
              color="deep-teal"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

function FeatureCard({ title, description, icon, link, color }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={link} className="block h-full">
        <Card variant="divine" className="h-full transition-all duration-300 hover:shadow-lg group">
          <div className="p-6 flex flex-col items-center text-center space-y-4 h-full">
            <div className={`w-16 h-16 rounded-full bg-${color} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-2xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-mystic-indigo">{title}</h3>
            <p className="text-ashram-gray">{description}</p>
            
            <motion.div 
              className="w-full h-1 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mt-2 opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
