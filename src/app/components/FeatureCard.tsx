"use client";

import { Card } from '@/app/components/ui/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
  delay?: number;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  link, 
  color, 
  delay = 0 
}: FeatureCardProps) {
  // Map color names to their corresponding Tailwind classes
  const colorClasses: Record<string, string> = {
    'deep-saffron': 'bg-deep-saffron',
    'celestial-purple': 'bg-celestial-purple',
    'tranquil-sky-blue': 'bg-tranquil-sky-blue',
    'glowing-cyan': 'bg-glowing-cyan',
    'lotus-pink': 'bg-lotus-pink',
    'deep-teal': 'bg-deep-teal',
    'mystic-indigo': 'bg-mystic-indigo',
    'sacred-gold': 'bg-sacred-gold',
  };

  const bgColorClass = colorClasses[color] || 'bg-sacred-gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={link} className="block h-full">
        <Card variant="divine" className="h-full transition-all duration-300 hover:shadow-lg group">
          <div className="p-6 flex flex-col items-center text-center space-y-4 h-full">
            <div className={`w-16 h-16 rounded-full ${bgColorClass} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              {icon}
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
