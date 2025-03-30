'use client'

import { useRef } from 'react'
import AuroraBackgroundDemo from '@/app/components/aurora-background-demo'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'

import DashboardShowcase from '@/app/components/dashboard-showcase'
import InfiniteMovingCardsDemo from '@/app/components/infinite-moving-cards-demo'
export default function Home() {
  // Refs for scroll animations
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)
  
  // Check if sections are in view
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.2 })
  
  // Scroll animations
  const { scrollYProgress } = useScroll()
  
  return (
    <div className="flex flex-col items-center">
      {/* Full-screen Hero Section with Aurora Background */}
      <AuroraBackgroundDemo />

      {/* Dashboard Showcase Section */}
      <DashboardShowcase />

      {/* Testimonials Section with Parallax Effect */}
      <motion.section 
        ref={testimonialsRef}
        className="w-full py-20 md:py-32 bg-gradient-to-b from-tranquil-sky-blue to-himalayan-white relative overflow-hidden"
>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-[url('/images/mandala-pattern.png')] bg-repeat opacity-5"
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-mystic-indigo to-celestial-purple mb-4">
              <div className="bg-himalayan-white rounded-full p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 8H3V16H7V8Z" fill="#4B0082"/>
                  <path d="M21 8H17V16H21V8Z" fill="#4B0082"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-playfair text-mystic-indigo">
              Sacred <span className="text-shadow-divine text-deep-saffron">Testimonials</span>
            </h2>
            
            <p className="mx-auto max-w-[700px] text-lg text-ashram-gray md:text-xl">
              Hear from seekers who have found wisdom on their spiritual journey
            </p>

            <InfiniteMovingCardsDemo />
          </motion.div>
          
          
        </div>
      </motion.section>
      
      {/* CTA Section with Parallax Effect */}
      
      {/* Footer with animated wave */}
      <div className="w-full bg-mystic-indigo relative">
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
            <motion.path 
              d="M0,0 C150,90 350,0 500,100 C650,200 750,0 900,100 C1050,200 1150,90 1200,0 V120 H0 Z" 
              className="fill-mystic-indigo"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
        </div>
        
      </div>
    </div>
  )
}
