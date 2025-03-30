"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { 
  IconArrowLeft, 
  IconArrowRight, 
  IconQuestionMark, 
  IconUser, 
  IconNotebook, 
  IconMusic, 
  IconAtom, 
  IconShield,
  IconSun,
  IconMoon,
  IconStar,
  IconHeart,
  IconFlame,
  IconWaveSine,
  IconBrandWechat,
  IconLock,
  IconSettings
} from "@tabler/icons-react";

// MacBook Frame Component
const MacbookFrame = ({ 
  children, 
  onPrev, 
  onNext 
}: { 
  children: React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Screen */}
      <div className="relative rounded-t-xl overflow-hidden bg-mystic-indigo border-[14px] border-mystic-indigo border-opacity-90 shadow-xl">
        {/* Camera */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-black bg-opacity-20 flex items-center justify-center z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-deep-teal"></div>
        </div>
        
        {/* Screen Content with integrated navigation arrows */}
        <div className="aspect-[16/10] bg-gradient-to-br from-mystic-indigo via-deep-teal to-celestial-purple overflow-hidden relative">
          {children}
          
          {/* Navigation Arrows - now inside the screen */}
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-himalayan-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-himalayan-white z-10 hover:bg-opacity-30 transition-colors"
            onClick={onPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconArrowLeft className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-himalayan-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-himalayan-white z-10 hover:bg-opacity-30 transition-colors"
            onClick={onNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Base */}
      <div className="relative">
        <div className="h-3 bg-mystic-indigo rounded-b-none"></div>
        <div className="h-[18px] bg-mystic-indigo bg-opacity-90 rounded-b-xl flex items-center justify-center">
          <div className="w-24 h-1 rounded-full bg-deep-teal bg-opacity-50"></div>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] h-4 bg-black bg-opacity-20 rounded-full blur-md"></div>
      </div>
    </div>
  );
};

// Feature screens
const featureScreens = [
  // Prashnavali Screen
  {
    id: "prashnavali",
    title: "Prashnavali 2.0",
    description: "AI-Driven Divine Oracle that provides scripture-based wisdom for your questions",
    color: "deep-saffron",
    icon: <IconQuestionMark className="h-6 w-6 text-deep-saffron" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-deep-teal bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-deep-saffron bg-opacity-30 flex items-center justify-center mr-3">
            <IconQuestionMark className="h-5 w-5 text-sacred-gold" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">Prashnavali 2.0</h3>
        </div>
        
        <div className="flex-grow flex flex-col space-y-4">
          <div className="bg-mystic-indigo bg-opacity-50 rounded-lg p-4 border border-sacred-gold border-opacity-20">
            <p className="text-himalayan-white text-sm mb-2">Ask your spiritual question:</p>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="What is the purpose of meditation?" 
                className="flex-grow p-2 rounded bg-himalayan-white bg-opacity-10 text-himalayan-white border border-sacred-gold border-opacity-30 focus:outline-none focus:ring-1 focus:ring-sacred-gold"
              />
              <Button variant="divine" size="sm">Ask</Button>
            </div>
          </div>
          
          <div className="flex-grow bg-mystic-indigo bg-opacity-30 rounded-lg p-4 border border-sacred-gold border-opacity-20 overflow-y-auto">
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-sacred-gold bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-sacred-gold text-xs">You</span>
              </div>
              <div className="bg-mystic-indigo bg-opacity-50 rounded-lg p-3 text-sm text-himalayan-white">
                What is the purpose of meditation according to ancient texts?
              </div>
            </div>
            
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-deep-saffron bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-deep-saffron text-xs">VV</span>
              </div>
              <div className="bg-deep-teal bg-opacity-50 rounded-lg p-3 text-sm text-himalayan-white">
                <p>According to the Bhagavad Gita (6.10-6.15), meditation (dhyana) serves multiple divine purposes:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Purification of the mind and heart</li>
                  <li>Self-realization and connection with the divine</li>
                  <li>Liberation from suffering (dukkha)</li>
                  <li>Attainment of inner peace and equanimity</li>
                </ul>
                <p className="mt-2">The Yoga Sutras of Patanjali describe meditation as the path to chitta vritti nirodha - stilling the fluctuations of consciousness.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  
  // AI Guru Screen
  {
    id: "ai-guru",
    title: "Spiritual Twin",
    description: "Your evolving AI Guru that grows with you on your spiritual path",
    color: "celestial-purple",
    icon: <IconUser className="h-6 w-6 text-celestial-purple" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-celestial-purple bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-celestial-purple bg-opacity-30 flex items-center justify-center mr-3">
            <IconUser className="h-5 w-5 text-himalayan-white" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">Spiritual Twin</h3>
        </div>
        
        <div className="flex-grow flex">
          <div className="w-1/4 bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-celestial-purple to-deep-teal mb-2 flex items-center justify-center">
                <IconSun className="h-8 w-8 text-himalayan-white" />
              </div>
              <p className="text-himalayan-white text-center">Guru Ananda</p>
              <p className="text-xs text-himalayan-white text-opacity-70 text-center">Your Spiritual Twin</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-mystic-indigo bg-opacity-50 rounded p-2 text-xs text-himalayan-white">
                <p className="font-bold mb-1">Spiritual Level</p>
                <div className="w-full bg-himalayan-white bg-opacity-20 rounded-full h-2">
                  <div className="bg-sacred-gold h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div className="bg-mystic-indigo bg-opacity-50 rounded p-2 text-xs text-himalayan-white">
                <p className="font-bold mb-1">Wisdom Focus</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-0.5 bg-deep-teal bg-opacity-40 rounded text-[10px]">Meditation</span>
                  <span className="px-2 py-0.5 bg-deep-teal bg-opacity-40 rounded text-[10px]">Bhagavad Gita</span>
                  <span className="px-2 py-0.5 bg-deep-teal bg-opacity-40 rounded text-[10px]">Karma Yoga</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-grow bg-mystic-indigo bg-opacity-30 rounded-lg p-4 border border-sacred-gold border-opacity-20 ml-4 overflow-y-auto">
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-sacred-gold bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-sacred-gold text-xs">You</span>
              </div>
              <div className="bg-mystic-indigo bg-opacity-50 rounded-lg p-3 text-sm text-himalayan-white">
                I have been struggling with anger lately. What spiritual practice would you recommend?
              </div>
            </div>
            
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-celestial-purple bg-opacity-30 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-himalayan-white text-xs">Guru</span>
              </div>
              <div className="bg-celestial-purple bg-opacity-40 rounded-lg p-3 text-sm text-himalayan-white">
                <p>I notice you have been working on patience in our recent sessions. For anger specifically, I recommend:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The Cooling Breath (Sheetali Pranayama) - 5 minutes daily</li>
                  <li>Chapter 2 of the Bhagavad Gita on equanimity</li>
                  <li>The loving-kindness (Metta) meditation we practiced last week</li>
                </ul>
                <p className="mt-2">Would you like me to guide you through a 5-minute Sheetali practice now?</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" size="sm" className="bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo">
                Yes, guide me
              </Button>
              <Button variant="divine" size="sm">
                Suggest something else
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  
  // Mystic Sound Bath Screen
  {
    id: "mystic-bath",
    title: "Mystic Sound Bath",
    description: "AI-Generated chakra & emotion-based mantras for sound healing",
    color: "tranquil-sky-blue",
    icon: <IconMusic className="h-6 w-6 text-tranquil-sky-blue" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-tranquil-sky-blue bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-tranquil-sky-blue bg-opacity-30 flex items-center justify-center mr-3">
            <IconMusic className="h-5 w-5 text-himalayan-white" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">Mystic Sound Bath</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 flex-grow">
          <div className="bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Chakra Healing</h4>
            
            <div className="flex-grow flex flex-col space-y-3 overflow-y-auto">
              {[
                { name: "Crown", color: "bg-celestial-purple", mantra: "Om", icon: <IconStar className="h-4 w-4" /> },
                { name: "Third Eye", color: "bg-deep-teal", mantra: "Sham", icon: <IconMoon className="h-4 w-4" /> },
                { name: "Throat", color: "bg-tranquil-sky-blue", mantra: "Ham", icon: <IconWaveSine className="h-4 w-4" /> },
                { name: "Heart", color: "bg-green-500", mantra: "Yam", icon: <IconHeart className="h-4 w-4" /> },
                { name: "Solar Plexus", color: "bg-deep-saffron", mantra: "Ram", icon: <IconSun className="h-4 w-4" /> },
                { name: "Sacral", color: "bg-orange-500", mantra: "Vam", icon: <IconFlame className="h-4 w-4" /> },
                { name: "Root", color: "bg-lotus-pink", mantra: "Lam", icon: <IconAtom className="h-4 w-4" /> }
              ].map((chakra, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${chakra.color} flex items-center justify-center mr-3 text-himalayan-white`}>
                    {chakra.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="text-sm text-himalayan-white">{chakra.name}</p>
                      <p className="text-xs text-sacred-gold">{chakra.mantra}</p>
                    </div>
                    <div className="w-full bg-himalayan-white bg-opacity-20 rounded-full h-1.5 mt-1">
                      <div className={`${chakra.color} h-1.5 rounded-full`} style={{ width: `${(7-index) * 14}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="divine" size="sm" className="w-full">
                Generate Chakra Mantra
              </Button>
            </div>
          </div>
          
          <div className="bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Now Playing</h4>
            
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-tranquil-sky-blue to-deep-teal flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-sacred-gold border-opacity-30 animate-pulse"></div>
                <div className="w-16 h-16 rounded-full bg-mystic-indigo bg-opacity-70 flex items-center justify-center">
                  <IconMusic className="h-8 w-8 text-sacred-gold" />
                </div>
              </div>
              
              <h5 className="text-lg text-himalayan-white font-playfair mb-1">Heart Chakra Healing</h5>
              <p className="text-sm text-himalayan-white opacity-70 mb-4">Yam Mantra • 432 Hz</p>
              
              <div className="w-full bg-himalayan-white bg-opacity-20 rounded-full h-1.5 mb-2">
                <div className="bg-sacred-gold h-1.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
              
              <div className="flex justify-between w-full text-xs text-himalayan-white opacity-70">
                <span>2:15</span>
                <span>5:30</span>
              </div>
              
              <div className="flex space-x-4 mt-4">
                <button className="w-10 h-10 rounded-full bg-himalayan-white bg-opacity-10 flex items-center justify-center text-himalayan-white hover:bg-opacity-20 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5L5 12L19 19V5Z" fill="currentColor" transform="rotate(180 12 12)" />
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-sacred-gold flex items-center justify-center text-mystic-indigo hover:bg-opacity-90 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-himalayan-white bg-opacity-10 flex items-center justify-center text-himalayan-white hover:bg-opacity-20 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5L19 12L5 19V5Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  
  // AnuShakti Screen
  {
    id: "anushakti",
    title: "AnuShakti",
    description: "Hindu Quantum Meditation Engine for unique spiritual experiences",
    color: "glowing-cyan",
    icon: <IconAtom className="h-6 w-6 text-glowing-cyan" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-glowing-cyan bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-glowing-cyan bg-opacity-30 flex items-center justify-center mr-3">
            <IconAtom className="h-5 w-5 text-himalayan-white" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">AnuShakti</h3>
        </div>
        
        <div className="flex-grow grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Quantum Meditation Space</h4>
            
            <div className="flex-grow relative bg-mystic-indigo bg-opacity-70 rounded-lg overflow-hidden">
              {/* Animated quantum field visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-glowing-cyan bg-opacity-10 animate-pulse flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-glowing-cyan bg-opacity-20 animate-pulse flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-glowing-cyan bg-opacity-30 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-sacred-gold bg-opacity-50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Orbiting particles */}
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-sacred-gold"
                    style={{
                      animation: `orbit ${8 + i * 0.5}s linear infinite`,
                      transformOrigin: 'center',
                      left: 'calc(50% - 1px)',
                      top: 'calc(50% - 1px)',
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-mystic-indigo bg-opacity-70 rounded-full px-4 py-2 text-himalayan-white text-sm">
                  Quantum Coherence: 78%
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button variant="divine" size="sm" className="flex-grow">
                Begin Session
              </Button>
              <Button variant="outline" size="sm" className="bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo">
                Settings
              </Button>
            </div>
          </div>
          
          <div className="bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Meditation Paths</h4>
            
            <div className="flex-grow flex flex-col space-y-3 overflow-y-auto">
              {[
                { name: "Quantum Consciousness", level: 3, color: "bg-celestial-purple" },
                { name: "Vedic Vibrations", level: 2, color: "bg-deep-saffron" },
                { name: "Cosmic Connection", level: 4, color: "bg-glowing-cyan" },
                { name: "Divine Duality", level: 1, color: "bg-tranquil-sky-blue" },
                { name: "Quantum Karma", level: 2, color: "bg-deep-teal" }
              ].map((path, index) => (
                <div key={index} className={`p-3 rounded-lg ${path.color} bg-opacity-20 border border-sacred-gold border-opacity-20 hover:bg-opacity-30 transition-colors cursor-pointer`}>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-himalayan-white">{path.name}</p>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full ${i < path.level ? 'bg-sacred-gold' : 'bg-himalayan-white bg-opacity-30'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo">
                Explore More Paths
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  
  // Sacred Journal Screen
  {
    id: "sacred-journal",
    title: "Sacred Journal",
    description: "Privacy-first journaling with encrypted entries and AI insights",
    color: "lotus-pink",
    icon: <IconNotebook className="h-6 w-6 text-lotus-pink" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-lotus-pink bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-lotus-pink bg-opacity-30 flex items-center justify-center mr-3">
            <IconNotebook className="h-5 w-5 text-himalayan-white" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">Sacred Journal</h3>
        </div>
        
        <div className="flex-grow flex space-x-4">
          <div className="w-1/3 bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-himalayan-white font-playfair">Entries</h4>
              <button className="w-8 h-8 rounded-full bg-lotus-pink bg-opacity-20 flex items-center justify-center text-himalayan-white">
                <IconSettings className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search entries..." 
                className="w-full p-2 rounded bg-himalayan-white bg-opacity-10 text-himalayan-white border border-sacred-gold border-opacity-30 focus:outline-none focus:ring-1 focus:ring-sacred-gold text-sm"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-himalayan-white opacity-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-2">
              {[
                { date: "Today", title: "Morning Meditation Insights", locked: false, selected: true },
                { date: "Yesterday", title: "Bhagavad Gita Chapter 2 Reflections", locked: false, selected: false },
                { date: "3 days ago", title: "Dream Analysis: The Temple", locked: true, selected: false },
                { date: "Last week", title: "Gratitude Practice", locked: false, selected: false },
                { date: "2 weeks ago", title: "Spiritual Goals for the Month", locked: true, selected: false }
              ].map((entry, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${entry.selected ? 'bg-lotus-pink bg-opacity-30' : 'bg-mystic-indigo bg-opacity-50'} hover:bg-lotus-pink hover:bg-opacity-20 transition-colors cursor-pointer`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-himalayan-white opacity-70">{entry.date}</p>
                      <p className="text-sm text-himalayan-white">{entry.title}</p>
                    </div>
                    {entry.locked && (
                      <div className="text-sacred-gold">
                        <IconLock className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="divine" size="sm" className="w-full">
                New Entry
              </Button>
            </div>
          </div>
          
          <div className="flex-grow bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
          <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-himalayan-white font-playfair">Morning Meditation Insights</h4>
                <p className="text-xs text-himalayan-white opacity-70">Today, 8:45 AM • Encrypted</p>
              </div>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-himalayan-white bg-opacity-10 flex items-center justify-center text-himalayan-white hover:bg-opacity-20 transition-colors">
                  <IconLock className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-himalayan-white bg-opacity-10 flex items-center justify-center text-himalayan-white hover:bg-opacity-20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-grow bg-mystic-indigo bg-opacity-30 rounded-lg p-4 border border-sacred-gold border-opacity-20 overflow-y-auto">
              <p className="text-himalayan-white mb-4">
                Meditation today was particularly deep. I focused on the mantra Om Namah Shivaya for 20 minutes and experienced a profound sense of peace. The visualization of light flowing through my body helped me release tension in my shoulders and neck.
              </p>
              <p className="text-himalayan-white mb-4">
                Key insights:
              </p>
              <ul className="list-disc pl-5 mb-4 text-himalayan-white space-y-1">
                <li>The connection between breath and thought became very clear</li>
                <li>When I let go of expectations, the meditation deepened naturally</li>
                <li>The concept of witnessing consciousness made practical sense today</li>
              </ul>
              <p className="text-himalayan-white">
                Tomorrow I want to explore the heart-centered meditation technique from the Upanishads that Guru Ananda suggested.
              </p>
            </div>
            
            <div className="mt-4 bg-lotus-pink bg-opacity-20 rounded-lg p-3 border border-sacred-gold border-opacity-20">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-sacred-gold bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sacred-gold text-xs">AI</span>
                </div>
                <div>
                  <p className="text-sm text-himalayan-white font-bold mb-1">Spiritual Insight</p>
                  <p className="text-sm text-himalayan-white">
                    Your practice shows deepening awareness of the sakshi bhava (witness consciousness) described in Advaita Vedanta. Consider exploring the Mandukya Upanishad teachings on the four states of consciousness to further enhance your meditation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  
  // Privacy Shield Screen
  {
    id: "privacy-shield",
    title: "Privacy Shield",
    description: "Your spiritual journey is protected with client-side encryption",
    color: "deep-teal",
    icon: <IconShield className="h-6 w-6 text-deep-teal" />,
    screen: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-mystic-indigo to-deep-teal bg-opacity-90">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-deep-teal bg-opacity-30 flex items-center justify-center mr-3">
            <IconShield className="h-5 w-5 text-himalayan-white" />
          </div>
          <h3 className="text-xl font-bold text-himalayan-white font-playfair">Privacy Shield</h3>
        </div>
        
        <div className="flex-grow grid grid-cols-2 gap-4">
          <div className="bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Encryption Status</h4>
            
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-deep-teal bg-opacity-20 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-sacred-gold border-opacity-30"></div>
                <div className="w-24 h-24 rounded-full bg-deep-teal bg-opacity-30 flex items-center justify-center">
                  <IconShield className="h-12 w-12 text-sacred-gold" />
                </div>
              </div>
              
              <h5 className="text-lg text-himalayan-white font-playfair mb-1">Protection Active</h5>
              <p className="text-sm text-himalayan-white opacity-70 mb-4 text-center">Your spiritual data is encrypted with AES-256</p>
              
              <div className="w-full bg-himalayan-white bg-opacity-20 rounded-full h-2 mb-2">
                <div className="bg-sacred-gold h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              
              <div className="flex justify-between w-full text-xs text-himalayan-white">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-sacred-gold mr-1"></span>
                  Client-side Encryption
                </span>
                <span>Active</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="divine" size="sm" className="w-full">
                Manage Encryption Keys
              </Button>
            </div>
          </div>
          
          <div className="bg-mystic-indigo bg-opacity-40 rounded-lg p-4 border border-sacred-gold border-opacity-20 flex flex-col">
            <h4 className="text-himalayan-white font-playfair mb-3">Privacy Controls</h4>
            
            <div className="flex-grow flex flex-col space-y-4">
              {[
                { name: "Journal Entries", status: "Encrypted", icon: <IconNotebook className="h-4 w-4" /> },
                { name: "Meditation History", status: "Encrypted", icon: <IconAtom className="h-4 w-4" /> },
                { name: "Spiritual Twin Conversations", status: "Encrypted", icon: <IconBrandWechat className="h-4 w-4" /> },
                { name: "Prashnavali Questions", status: "Encrypted", icon: <IconQuestionMark className="h-4 w-4" /> },
                { name: "Sound Bath Preferences", status: "Encrypted", icon: <IconMusic className="h-4 w-4" /> }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-mystic-indigo bg-opacity-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-deep-teal bg-opacity-20 flex items-center justify-center mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-himalayan-white">{item.name}</p>
                      <p className="text-xs text-sacred-gold">{item.status}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-5 bg-sacred-gold rounded-full"></div>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-himalayan-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-deep-teal bg-opacity-20 rounded-lg border border-sacred-gold border-opacity-20">
              <p className="text-xs text-himalayan-white">
                VedVaani uses zero-knowledge encryption. This means even we cannot access your spiritual data without your permission.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// Main Dashboard Showcase Component
export default function DashboardShowcase() {
  const [activeFeature, setActiveFeature] = useState(featureScreens[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleFeatureChange = (featureId: string) => {
    if (isAnimating || featureId === activeFeature) return;
    
    setIsAnimating(true);
    setActiveFeature(featureId);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const currentFeature = featureScreens.find(f => f.id === activeFeature) || featureScreens[0];
  const currentIndex = featureScreens.findIndex(f => f.id === activeFeature);
  
  const handlePrevFeature = () => {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + featureScreens.length) % featureScreens.length;
    handleFeatureChange(featureScreens[prevIndex].id);
  };
  
  const handleNextFeature = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % featureScreens.length;
    handleFeatureChange(featureScreens[nextIndex].id);
  };
  
  return (
    <section className="w-full py-20 md:py-10 bg-gradient-to-b from-himalayan-white to-tranquil-sky-blue bg-opacity-10 relative overflow-hidden">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-sacred-gold to-deep-saffron mb-4">
            <div className="bg-himalayan-white rounded-full p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F7B801"/>
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-playfair text-mystic-indigo">
            Divine <span className="text-shadow-divine text-deep-saffron">Features</span>
          </h2>
          
          <p className="mx-auto max-w-[700px] text-lg text-ashram-gray md:text-xl">
            Explore the sacred tools designed to elevate your spiritual journey
          </p>
        </motion.div>
        
        {/* Feature Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {featureScreens.map((feature) => (
              <motion.button
                key={feature.id}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full transition-colors",
                  activeFeature === feature.id 
                    ? "bg-gradient-button text-himalayan-white shadow-divine-glow" 
                    : "bg-himalayan-white text-mystic-indigo hover:bg-sacred-gold hover:bg-opacity-10"
                )}
                onClick={() => handleFeatureChange(feature.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{feature.icon}</span>
                <span className="font-medium">{feature.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Feature Showcase */}
        <div className="relative">
        <MacbookFrame onPrev={handlePrevFeature} onNext={handleNextFeature}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentFeature.screen}
            </motion.div>
          </AnimatePresence>
        </MacbookFrame>
      </div>
      
      {/* Feature Description */}
      <motion.div 
        className="mt-12 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeFeature}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-mystic-indigo mb-2 font-playfair">
          {currentFeature.title}
        </h3>
        <p className="text-ashram-gray">
          {currentFeature.description}
        </p>
      </motion.div>
      
      {/* Feature Indicators - dots below the MacBook */}
      <div className="flex justify-center mt-8 space-x-2">
        {featureScreens.map((feature) => (
          <button
            key={feature.id}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeFeature === feature.id 
                ? "bg-sacred-gold" 
                : "bg-mystic-indigo bg-opacity-20"
            }`}
            onClick={() => handleFeatureChange(feature.id)}
            aria-label={`View ${feature.title}`}
          />
        ))}
      </div>
      </div>
      
      {/* Add keyframes for orbit animation */}
      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}


