"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";




export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-20 text-sacred-gold"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-20 text-sacred-gold"
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >

      </motion.div>

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 z-10"
      >
        {/* <motion.div 
          className="inline-block p-1 rounded-full bg-gradient-to-r from-sacred-gold via-deep-saffron to-sacred-gold mb-4"
          animate={{ 
            boxShadow: ["0 0 20px rgba(247, 184, 1, 0.3)", "0 0 40px rgba(247, 184, 1, 0.5)", "0 0 20px rgba(247, 184, 1, 0.3)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-mystic-indigo bg-opacity-90 rounded-full p-3">
            <Image 
              src="/images/vedvaani-logo.png" 
              alt="VedVaani Logo" 
              width={80} 
              height={80}
              className="rounded-full"
            />
          </div>
        </motion.div> */}

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-samarkan text-himalayan-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-shadow-divine font-samarkan">Ved</span>
          <span className="text-sacred-gold">Vaani</span>
        </motion.h1>
        
        <motion.p 
          className="mx-auto max-w-[700px] text-xl md:text-2xl lg:text-3xl text-himalayan-white font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Divine Wisdom for Your Spiritual Journey
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/login">
            <Button 
              variant="divine" 
              size="lg" 
              className="px-8 py-6 text-lg shadow-divine-glow"
            >
              Begin Your Journey
            </Button>
          </Link>
          <Link href="#features">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo"
            >
              Explore Features
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center text-himalayan-white">
          <p className="text-sm mb-2">Scroll to explore</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
