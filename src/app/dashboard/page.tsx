"use client";

import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import { AuroraBackground } from '@/app/components/ui/aurora-background';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FeatureCard from '@/app/components/FeatureCard';
import { Footer } from '@/app/components/ui/footer';
import {
  IconCrystalBall,
  IconYoga,
  IconMusic,
  IconAtom,
  IconCell,
  IconSettings,
} from "@tabler/icons-react";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardSidebar>
        <DashboardContent />
      </DashboardSidebar>

    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  
  const features = [
    {
      title: "Prashnavali 2.0",
      description: "Ask questions and receive divine wisdom from ancient scriptures",
      icon: <IconCrystalBall className="h-6 w-6 text-deep-saffron" />,
      link: "/features/prashnavali",
      color: "deep-saffron",
    },
    {
      title: "Spiritual Twin",
      description: "Connect with your AI spiritual guide",
      icon: <IconYoga className="h-6 w-6 text-celestial-purple" />,
      link: "/features/spiritual-twin",
      color: "celestial-purple",
    },
    {
      title: "Mystic Sound Bath",
      description: "Experience healing through sacred sounds and mantras",
      icon: <IconMusic className="h-6 w-6 text-tranquil-sky-blue" />,
      link: "/features/sound-bath",
      color: "tranquil-sky-blue",
    },
    {
      title: "AnuShakti",
      description: "Explore quantum meditation techniques",
      icon: <IconAtom className="h-6 w-6 text-glowing-cyan" />,
      link: "/features/anushakti",
      color: "glowing-cyan",
    },
    {
      title: "Sacred Journal",
      description: "Record your spiritual insights and progress",
      icon: <IconCell className="h-6 w-6 text-lotus-pink" />,
      link: "/features/journal",
      color: "lotus-pink",
    },
    {
      title: "Profile Settings",
      description: "Update your spiritual preferences and account details",
      icon: <IconSettings className="h-6 w-6 text-deep-teal" />,
      link: "/profile",
      color: "deep-teal",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Aurora Background */}
      <div className="h-[100vh] relative">
      <div className="h-full w-full overflow-hidden">
        <AuroraBackground showRadialGradient={false}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center z-10"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-himalayan-white mb-4">
                <span className="text-shadow-divine">Radhe Radhe, </span>
                <span className="text-sacred-gold">
                  {user?.full_name || user?.email?.split('@')[0] || 'Seeker'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-himalayan-white font-light">
                Continue your divine journey today
              </p>
            </motion.div>
          </div>
        </AuroraBackground>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-mystic-indigo mb-8">
            Divine <span className="text-shadow-divine text-deep-saffron">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
                color={feature.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-mystic-indigo mb-8">
            Recent <span className="text-shadow-divine text-deep-saffron">Activity</span>
          </h2>
          
          <Card variant="divine" className="p-6 shadow-divine-glow">
            <div className="text-center py-8">
              <p className="text-ashram-gray">
                Your spiritual journey is just beginning. Explore the features to create activity.
              </p>
              <Button 
                variant="divine" 
                size="lg" 
                className="mt-4 shadow-divine-glow"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Start Exploring
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Spiritual Quote of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-mystic-indigo mb-8">
            Daily <span className="text-shadow-divine text-deep-saffron">Wisdom</span>
          </h2>
          
          <Card variant="mystic" className="p-8 shadow-divine-glow">
            <div className="text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sacred-gold opacity-70 mx-auto mb-4">
                <path d="M7 8H3V16H7V8Z" fill="currentColor"/>
                <path d="M21 8H17V16H21V8Z" fill="currentColor"/>
              </svg>
              
              <p className="text-himalayan-white text-lg md:text-xl italic mb-4">
                "The mind is everything. What you think you become."
              </p>
              
              <p className="text-sacred-gold text-sm">
                — Buddha
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="mt-auto pt-16">
        <Footer />
      </div>
      </div>
    </div>
  );
}
