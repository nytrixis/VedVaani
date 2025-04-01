"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import html2canvas from 'html2canvas';
import { Share2, BookmarkPlus, Copy, Download, Volume } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";


// Scripture options
const scriptureOptions = [
  { id: "bhagavad-gita", name: "Bhagavad Gita", icon: "🕉️", description: "The divine song of spiritual wisdom and guidance" },
  { id: "upanishads", name: "Upanishads", icon: "📜", description: "Ancient texts containing the philosophical essence of the Vedas" },
  { id: "vedas", name: "Vedas", icon: "⚛️", description: "The oldest sacred texts of Hinduism" },
  { id: "yoga-sutras", name: "Yoga Sutras", icon: "🧘", description: "Patanjali's classical text on the theory and practice of yoga" },
  { id: "ramayana", name: "Ramayana", icon: "🏹", description: "Epic tale of Lord Rama's journey and dharma" },
  { id: "mahabharata", name: "Mahabharata", icon: "⚔️", description: "Epic narrative of the Kurukshetra War and the fates of the Kaurava and Pandava princes" },
  { id: "puranas", name: "Puranas", icon: "🌟", description: "Ancient texts narrating the history of the universe and Hindu mythology" },
  { id: "all", name: "All Scriptures", icon: "📚", description: "Seek wisdom from across all sacred texts" }
];

// Language options
const languageOptions = [
  { id: "en", name: "English", nativeName: "English" },
  { id: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { id: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" },
  { id: "bn", name: "Bengali", nativeName: "বাংলা" },
  { id: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { id: "te", name: "Telugu", nativeName: "తెలుగు" },
  { id: "mr", name: "Marathi", nativeName: "मराठी" },
  { id: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { id: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { id: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { id: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

// Practitioner level options
const levelOptions = [
  { 
    id: "seeker", 
    name: "Seeker", 
    icon: "🌱", 
    description: "Beginning your spiritual journey and seeking foundational wisdom" 
  },
  { 
    id: "practitioner", 
    name: "Practitioner", 
    icon: "🌿", 
    description: "Regular spiritual practice with basic understanding of concepts" 
  },
  { 
    id: "sage", 
    name: "Sage", 
    icon: "🌳", 
    description: "Advanced practitioner seeking deeper philosophical insights" 
  },
];

export default function PrashnavaliPage() {
  // State for multi-step form
  const [step, setStep] = useState(1);
  const [selectedScriptures, setSelectedScriptures] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedLevel, setSelectedLevel] = useState("seeker");
  const [question, setQuestion] = useState("");
  
  // State for API response
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
    const [isReading, setIsReading] = useState(false);
  
  // UI state
  const [showExplanation, setShowExplanation] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  
  // Refs
  const questionInputRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  
  
  // Focus the question input when reaching step 4
  useEffect(() => {
    if (step === 4 && questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, [step]);
  
  // Scroll to response when it's received
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  // Add with your other useEffect hooks
    useEffect(() => {
    if (response) {
        generateRelatedQuestions();
        }
    }, [response]);
  
  
  // Handle scripture selection
  const toggleScripture = (scriptureId: string) => {
    if (scriptureId === "all") {
      // If "All Scriptures" is selected, clear other selections
      setSelectedScriptures(["all"]);
      return;
    }
    
    // Remove "all" if it was previously selected
    const updatedSelection = selectedScriptures.filter(id => id !== "all");
    
    if (updatedSelection.includes(scriptureId)) {
      // Remove if already selected
      setSelectedScriptures(updatedSelection.filter(id => id !== scriptureId));
    } else {
      // Add if not selected, but limit to 3 selections
      if (updatedSelection.length < 3) {
        setSelectedScriptures([...updatedSelection, scriptureId]);
      }
    }
  };

  // Add this function to handle submission with current settings
const handleSubmitWithCurrentSettings = async (newQuestion: string) => {
    try {
      setError("");
      setIsLoading(true);
      
      const response = await fetch('/api/prashnavali', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestion,
          scriptures: selectedScriptures,
          level: selectedLevel,
          language: selectedLanguage,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }
  
      const data = await response.json();
      setResponse(data);
      setStep(5); // Go directly to the response step
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  // Handle language selection
  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId);
  };
  
  // Handle level selection
  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    setStep(prev => prev - 1);
  };
  
  // Reset the form
  const handleReset = () => {
    setStep(1);
    setSelectedScriptures([]);
    setSelectedLanguage("en");
    setSelectedLevel("seeker");
    setQuestion("");
    setResponse(null);
    setError(null);
    setShowExplanation(true);
    setShowApplication(false);
    setShowMeditation(false);
  };
  
  // Submit the question to the API
  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    try {
            // Convert selected scripture IDs to names for the API
            const scriptureNames = selectedScriptures.includes("all") 
            ? ["All Scriptures"] 
            : selectedScriptures.map(id => {
                const scripture = scriptureOptions.find(s => s.id === id);
                return scripture ? scripture.name : id;
              });
          
          // Get the language name for the prompt
          const languageName = languageOptions.find(l => l.id === selectedLanguage)?.name || "English";
    
          const response = await fetch('/api/prashnavali', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              question,
              scriptures: scriptureNames,
              level: selectedLevel,
              language: selectedLanguage,
              languageName: languageName
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get divine guidance');
          }
          
          const data = await response.json();
          setResponse(data.structured || {
            quote: data.response,
            source: "Ancient Scripture",
            explanation: "Divine wisdom to contemplate.",
            application: "",
            meditation: ""
          });
          
          // Move to the response step
          setStep(5);
          
        } catch (error) {
          console.error('Error fetching divine guidance:', error);
          setError(error instanceof Error ? error.message : 'Failed to connect with divine wisdom');
        } finally {
          setIsLoading(false);
        }
      };
      
      // Render the appropriate step
      const renderStep = () => {
        switch (step) {
          case 1:
            return (
              <motion.div
                key="scripture-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-mystic-indigo bg-opacity-40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-divine-glow"
              >
                <h2 className="text-2xl font-bold text-himalayan-white mb-6 text-center">
                  Select Sacred Scriptures
                  <span className="block text-sm font-normal text-himalayan-white text-opacity-70 mt-2">
                    Choose up to 3 scriptures for your guidance
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {scriptureOptions.map((scripture) => (
                    <div
                      key={scripture.id}
                      onClick={() => toggleScripture(scripture.id)}
                      className={`
                        cursor-pointer rounded-xl p-4 transition-all duration-300
                        ${selectedScriptures.includes(scripture.id) 
                          ? 'bg-sacred-gold bg-opacity-20 border border-sacred-gold' 
                          : 'bg-himalayan-white bg-opacity-10 border border-himalayan-white border-opacity-20 hover:bg-opacity-15'}
                      `}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-mystic-indigo flex items-center justify-center text-2xl mr-3">
                          {scripture.icon}
                        </div>
                        <div>
                          <h3 className="text-himalayan-white font-medium">{scripture.name}</h3>
                          <p className="text-himalayan-white text-opacity-70 text-sm">{scripture.description}</p>
                        </div>
                        {selectedScriptures.includes(scripture.id) && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 rounded-full bg-sacred-gold flex items-center justify-center">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#3D348B"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <div className="text-himalayan-white text-opacity-70">
                    {selectedScriptures.length}/3 selected
                  </div>
                  <Button
                    variant="divine"
                    onClick={goToNextStep}
                    disabled={selectedScriptures.length === 0}
                    className="px-6 py-3 shadow-divine-glow"
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor"/>
                    </svg>
                  </Button>
                </div>
              </motion.div>
            );
            
          case 2:
            return (
              <motion.div
                key="language-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-mystic-indigo bg-opacity-40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-divine-glow"
              >
                <h2 className="text-2xl font-bold text-himalayan-white mb-6 text-center">
                  Select Language
                  <span className="block text-sm font-normal text-himalayan-white text-opacity-70 mt-2">
                    Choose the language for your divine guidance
                  </span>
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {languageOptions.map((language) => (
                    <div
                      key={language.id}
                      onClick={() => handleLanguageChange(language.id)}
                      className={`
                        cursor-pointer rounded-xl p-4 transition-all duration-300 text-center
                        ${selectedLanguage === language.id 
                          ? 'bg-sacred-gold bg-opacity-20 border border-sacred-gold' 
                          : 'bg-himalayan-white bg-opacity-10 border border-himalayan-white border-opacity-20 hover:bg-opacity-15'}
                      `}
                    >
                      <h3 className="text-himalayan-white font-medium">{language.name}</h3>
                      <p className="text-himalayan-white text-opacity-70 text-sm">{language.nativeName}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    className="px-6 py-3 bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                    </svg>
                    Back
                  </Button>
                  <Button
                    variant="divine"
                    onClick={goToNextStep}
                    className="px-6 py-3 shadow-divine-glow"
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor"/>
                    </svg>
                  </Button>
                </div>
              </motion.div>
            );
            
          case 3:
            return (
              <motion.div
                key="level-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-mystic-indigo bg-opacity-40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-divine-glow"
              >
                <h2 className="text-2xl font-bold text-himalayan-white mb-6 text-center">
                  Select Your Spiritual Level
                  <span className="block text-sm font-normal text-himalayan-white text-opacity-70 mt-2">
                    This helps tailor the guidance to your spiritual journey
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {levelOptions.map((level) => (
                    <div
                      key={level.id}
                      onClick={() => handleLevelChange(level.id)}
                      className={`
                        cursor-pointer rounded-xl p-6 transition-all duration-300 text-center
                        ${selectedLevel === level.id 
                          ? 'bg-sacred-gold bg-opacity-20 border border-sacred-gold' 
                          : 'bg-himalayan-white bg-opacity-10 border border-himalayan-white border-opacity-20 hover:bg-opacity-15'}
                      `}
                    >
                      <div className="text-4xl mb-3">{level.icon}</div>
                      <h3 className="text-himalayan-white font-medium text-lg mb-2">{level.name}</h3>
                      <p className="text-himalayan-white text-opacity-70 text-sm">{level.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    className="px-6 py-3 bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                    </svg>
                    Back
                  </Button>
                  <Button
                    variant="divine"
                    onClick={goToNextStep}
                    className="px-6 py-3 shadow-divine-glow"
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor"/>
                    </svg>
                  </Button>
                </div>
              </motion.div>
            );
            
          case 4:
            return (
              <motion.div
                key="question-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-mystic-indigo bg-opacity-40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-divine-glow"
              >
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sacred-gold to-deep-saffron p-1">
                    <div className="w-full h-full rounded-full bg-mystic-indigo flex items-center justify-center">
                      <span className="text-4xl">🔮</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-himalayan-white mb-6 text-center">
                  What wisdom do you seek?
                  <span className="block text-sm font-normal text-himalayan-white text-opacity-70 mt-2">
                    Ask your question with a clear mind and open heart
                  </span>
                </h2>
                
                <div className="mb-6">
                  <textarea
                    ref={questionInputRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question here..."
                    className="w-full h-32 bg-himalayan-white bg-opacity-10 border border-sacred-gold border-opacity-30 rounded-lg p-4 text-himalayan-white placeholder-himalayan-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-sacred-gold resize-none"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="bg-sacred-gold bg-opacity-10 rounded-lg p-4">
                    <h3 className="text-sacred-gold font-medium mb-2">Your Prashnavali Settings:</h3>
                    <ul className="text-himalayan-white text-opacity-80 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2">📚</span>
                        <span>Scriptures: </span>
                        <span className="ml-1 font-medium">
                          {selectedScriptures.includes("all") 
                            ? "All Scriptures" 
                            : selectedScriptures.map(id => {
                                const scripture = scriptureOptions.find(s => s.id === id);
                                return scripture ? scripture.name : id;
                              }).join(", ")}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">🗣️</span>
                        <span>Language: </span>
                        <span className="ml-1 font-medium">
                          {languageOptions.find(l => l.id === selectedLanguage)?.name || selectedLanguage}
                        </span>
                      </li>
                      <li className="flex items-center">
                      <span className="mr-2">🌱</span>
                    <span>Spiritual Level: </span>
                    <span className="ml-1 font-medium">
                      {levelOptions.find(l => l.id === selectedLevel)?.name || selectedLevel}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                className="px-6 py-3 bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                </svg>
                Back
              </Button>
              <Button
                variant="divine"
                onClick={handleSubmitQuestion}
                disabled={!question.trim() || isLoading}
                className="px-6 py-3 shadow-divine-glow"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Seeking Wisdom...
                  </>
                ) : (
                  <>
                    Seek Divine Wisdom
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor"/>
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        );
        
        case 5: // Response display step
      return (
        <motion.div
          key="step5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-mystic-indigo bg-opacity-30 backdrop-blur-sm rounded-lg p-8"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-himalayan-white text-lg">Seeking divine wisdom...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-lotus-pink text-lg mb-4">{error}</p>
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-sacred-gold text-himalayan-white hover:bg-sacred-gold hover:text-mystic-indigo"
              >
                Try Again
              </Button>
            </div>
          ) : response ? (
            <>
              {/* Response container with ref */}
              <div ref={responseRef} className="bg-mystic-indigo p-6 rounded-lg shadow-divine-glow">
                <h2 className="text-2xl font-playfair text-sacred-gold mb-6">Divine Wisdom</h2>
                
                <blockquote className="border-l-4 border-sacred-gold pl-4 italic text-himalayan-white mb-4">
                {response.structured?.quote || response.quote || "Divine wisdom"}
                </blockquote>
                
                <p className="text-tranquil-sky-blue mb-2">
                    Source: {response.structured?.source || response.source || "Ancient Scripture"}
                    {(response.structured?.chapter && response.structured?.verse) && 
                        ` ${response.structured.chapter}:${response.structured.verse}`
                    }
                </p>
                
                {/* Explanation Section with Toggle */}
                <div className="mt-6 mb-4 border-b border-sacred-gold border-opacity-30 pb-4">
                    <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => setShowExplanation(!showExplanation)}
                    >
                    <h3 className="text-xl text-sacred-gold">Meaning</h3>
                    <button className="text-himalayan-white">
                        {showExplanation ? '▼' : '►'}
                    </button>
                    </div>
                    
                    {showExplanation && (
                    <p className="text-himalayan-white mt-2">
                        {response.structured?.explanation || response.explanation || ""}
                    </p>
                    )}
                </div>
    
                {/* Application Section with Toggle */}
            <div className="mt-6 mb-4 border-b border-sacred-gold border-opacity-30 pb-4">
                <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => setShowApplication(!showApplication)}
                >
                <h3 className="text-xl text-sacred-gold">Application</h3>
                <button className="text-himalayan-white">
                    {showApplication ? '▼' : '►'}
                </button>
                </div>
                
                {showApplication && (
                <p className="text-himalayan-white mt-2">
                    {response.structured?.application || response.application || ""}
                </p>
                )}
            </div>
                
                {/* Meditation Section with Toggle */}
            <div className="mt-6">
                <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => setShowMeditation(!showMeditation)}
                >
                <h3 className="text-xl text-sacred-gold">Meditation</h3>
                <button className="text-himalayan-white">
                    {showMeditation ? '▼' : '►'}
                </button>
                </div>
                
                {showMeditation && (
                <p className="text-himalayan-white mt-2">
                    {response.structured?.meditation || response.meditation || ""}
                </p>
                )}
            </div>
            </div>
                        
              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 justify-center"
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-himalayan-white bg-opacity-10 text-himalayan-white"
                    onClick={handleCopyToClipboard}
                  >
                    <Copy size={16} />
                    Copy
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-himalayan-white bg-opacity-10 text-himalayan-white"
                    onClick={handleShareResponse}
                  >
                    <Share2 size={16} />
                    Share
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-himalayan-white bg-opacity-10 text-himalayan-white"
                    onClick={handleSaveToJournal}
                  >
                    <BookmarkPlus size={16} />
                    Save to Journal
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-himalayan-white bg-opacity-10 text-himalayan-white"
                    onClick={handleReadAloud}
                  >
                    <Volume size={16} />
                    {isReading ? "Stop" : "Read Aloud"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-himalayan-white bg-opacity-10 text-himalayan-white"
                    onClick={handleDownloadImage}
                  >
                    <Download size={16} />
                    Save Image
                  </Button>
                </motion.div>
              </div>
              
              {/* Related questions */}
              {relatedQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 bg-mystic-indigo bg-opacity-30 backdrop-blur-sm rounded-lg p-8 shadow-divine-glow border border-sacred-gold border-opacity-40">
                  <h3 className="text-xl text-himalayan-white font-playfair mb-6 text-center">Continue Your Spiritual Journey</h3>
                  <div className="flex flex-col gap-4">
                    {relatedQuestions.map((q, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="text-left justify-start w-full p-4 bg-himalayan-white bg-opacity-10 text-himalayan-white hover:bg-sacred-gold hover:text-mystic-indigo border-sacred-gold border-opacity-30 shadow-sm hover:shadow-divine-glow transition-all duration-300"
                        onClick={() => {
                          setQuestion(q);
                          setIsLoading(true);
                        handleSubmitWithCurrentSettings(q);
                        }}
                      >
                        <span className="mr-2 text-sacred-gold">•</span>{q}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="border-sacred-gold text-himalayan-white hover:bg-sacred-gold hover:text-mystic-indigo"
                >
                  Ask Another Question
                </Button>
              </div>
            </>
          ) : null}
        </motion.div>
      );
      
    //   case 6:
        return (
          <motion.div
            key="divine-response"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-mystic-indigo bg-opacity-40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-divine-glow"
            ref={responseRef}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-sacred-gold bg-opacity-20 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full bg-sacred-gold bg-opacity-40 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-sacred-gold bg-opacity-60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="absolute inset-6 rounded-full bg-sacred-gold bg-opacity-80 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  <div className="absolute inset-8 rounded-full bg-sacred-gold flex items-center justify-center">
                    <span className="text-2xl">🔮</span>
                  </div>
                </div>
                <p className="text-himalayan-white mt-6 animate-pulse">Consulting ancient wisdom...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-lotus-pink bg-opacity-20 flex items-center justify-center mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl text-himalayan-white mb-4">Divine Connection Interrupted</h3>
                <p className="text-himalayan-white text-opacity-80 mb-6">{error}</p>
                <Button
                  variant="divine"
                  onClick={handleReset}
                  className="px-6 py-3 shadow-divine-glow"
                >
                  Try Again
                </Button>
              </div>
            ) : response ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl text-himalayan-white mb-2">Your Question:</h3>
                  <Card variant="mystic" className="p-4 mb-8">
                    <p className="text-himalayan-white italic">{question}</p>
                  </Card>
                  
                  <h3 className="text-xl text-himalayan-white mb-4">Divine Guidance:</h3>
                  
                  <Card variant="divine" className="mb-6">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold text-mystic-indigo">
                          {response.source}
                          {response.chapter && response.verse && (
                            <span> {response.chapter}:{response.verse}</span>
                          )}
                        </h4>
                        <div className="bg-sacred-gold bg-opacity-20 px-3 py-1 rounded-full text-sm text-deep-saffron">
                          Scripture
                        </div>
                      </div>
                      
                      <blockquote className="border-l-4 border-sacred-gold pl-4 italic text-ashram-gray mb-4">
                        {response.quote}
                      </blockquote>
                      
                      <AnimatePresence>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="bg-mystic-indigo bg-opacity-5 p-4 rounded-lg mt-4">
                              <h5 className="font-bold text-mystic-indigo mb-2">Meaning & Interpretation:</h5>
                              <p className="text-ashram-gray">{response.explanation}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="mt-4">
                        <button
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="text-celestial-purple hover:text-mystic-indigo transition-colors flex items-center text-sm"
                        >
                          {showExplanation ? (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Hide Explanation
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Show Explanation
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                  
                  {response.application && (
                    <Card variant="divine" className="mb-6">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold text-mystic-indigo">
                            Practical Application
                          </h4>
                          <div className="bg-tranquil-sky-blue bg-opacity-20 px-3 py-1 rounded-full text-sm text-deep-teal">
                            Practice
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {showApplication && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="bg-tranquil-sky-blue bg-opacity-5 p-4 rounded-lg">
                                <p className="text-ashram-gray">{response.application}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="mt-4">
                          <button
                            onClick={() => setShowApplication(!showApplication)}
                            className="text-deep-teal hover:text-mystic-indigo transition-colors flex items-center text-sm"
                          >
                            {showApplication ? (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                  <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Hide Application
                              </>
                            ) : (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Show Application
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {response.meditation && (
                    <Card variant="divine" className="mb-6">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold text-mystic-indigo">
                            Meditation Practice
                          </h4>
                          <div className="bg-celestial-purple bg-opacity-20 px-3 py-1 rounded-full text-sm text-celestial-purple">
                            Meditation
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {showMeditation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="bg-celestial-purple bg-opacity-5 p-4 rounded-lg">
                                <p className="text-ashram-gray">{response.meditation}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="mt-4">
                          <button
                            onClick={() => setShowMeditation(!showMeditation)}
                            className="text-celestial-purple hover:text-mystic-indigo transition-colors flex items-center text-sm"
                          >
                            {showMeditation ? (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                  <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Hide Meditation
                              </>
                            ) : (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Show Meditation
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="px-6 py-3 bg-himalayan-white bg-opacity-10 border-sacred-gold text-himalayan-white hover:bg-himalayan-white hover:text-mystic-indigo"
                    >
                      Ask Another Question
                    </Button>
                    
                    <Button
                      variant="divine"
                      className="px-6 py-3 shadow-divine-glow"
                    >
                      Save to Journal
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </motion.div>
        );
        
        default:
            return null;
        }
      };
      
      // Progress indicator for the multi-step form
      const renderProgressIndicator = () => {
        const totalSteps = 4;
        const currentStep = Math.min(step, totalSteps);
        
        return (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${stepNumber < currentStep 
                        ? 'bg-sacred-gold text-mystic-indigo' 
                        : stepNumber === currentStep 
                          ? 'bg-sacred-gold bg-opacity-70 text-mystic-indigo' 
                          : 'bg-himalayan-white bg-opacity-20 text-himalayan-white'}
                    `}
                  >
                    {stepNumber < currentStep ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="text-xs text-himalayan-white mt-2 text-center">
                    {stepNumber === 1 && "Scriptures"}
                    {stepNumber === 2 && "Language"}
                    {stepNumber === 3 && "Level"}
                    {stepNumber === 4 && "Question"}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative mt-4">
              <div className="absolute top-0 left-0 h-1 bg-himalayan-white bg-opacity-20 w-full rounded-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-sacred-gold rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        );
      };

    // For copying to clipboard
    const handleCopyToClipboard = () => {
      if (!response) {
        toast.error("No wisdom to copy yet");
        return;
      }
      
      try {
        // Log the response to see its structure
        console.log("Response in copy function:", response);
        
        // Safely extract data with multiple fallbacks
        let quote = "";
        let source = "Ancient Scripture";
        let chapter = "";
        let verse = "";
        let explanation = "";
        let application = "";
        let meditation = "";
        
        // Try different possible structures
        if (typeof response === 'object') {
          // If response has structured property
          if (response.structured) {
            quote = response.structured.quote || "";
            source = response.structured.source || "Ancient Scripture";
            chapter = response.structured.chapter || "";
            verse = response.structured.verse || "";
            explanation = response.structured.explanation || "";
            application = response.structured.application || "";
            meditation = response.structured.meditation || "";
          } 
          // If response has direct properties
          else {
            quote = response.quote || "";
            source = response.source || "Ancient Scripture";
            chapter = response.chapter || "";
            verse = response.verse || "";
            explanation = response.explanation || "";
            application = response.application || "";
            meditation = response.meditation || "";
          }
        } 
        // If response is a string (unlikely but possible)
        else if (typeof response === 'string') {
          quote = response;
        }
        
        // Build the text to copy
        let textToCopy = `"${quote}"\n`;
        textToCopy += `- ${source}`;
        
        if (chapter && verse) {
          textToCopy += ` ${chapter}:${verse}`;
        }
        
        textToCopy += "\n\n";
        
        if (explanation) {
          textToCopy += `${explanation}\n\n`;
        }
        
        if (application) {
          textToCopy += `Application: ${application}\n\n`;
        }
        
        if (meditation) {
          textToCopy += `Meditation: ${meditation}\n\n`;
        }
        
        textToCopy += "Generated by VedVaani Prashnavali";
        
        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy);
        toast.success("Divine wisdom copied to clipboard");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast.error("Failed to copy to clipboard");
      }
    };
    
  
  // For sharing
  // For sharing
const handleShareResponse = () => {
  if (!response) {
    toast.error("No wisdom to share yet");
    return;
  }
  
  try {
    // Extract data safely (similar to copy function)
    let quote = "";
    let source = "Ancient Scripture";
    
    if (typeof response === 'object') {
      if (response.structured) {
        quote = response.structured.quote || "";
        source = response.structured.source || "Ancient Scripture";
      } else {
        quote = response.quote || "";
        source = response.source || "Ancient Scripture";
      }
    } else if (typeof response === 'string') {
      quote = response;
    }
    
    if (navigator.share) {
      navigator.share({
        title: 'Divine Wisdom from VedVaani',
        text: `"${quote}" - ${source}`,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => toast.error("Error sharing: " + error));
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyToClipboard();
      toast.success("Link copied! You can now share it manually");
    }
  } catch (error) {
    console.error("Error sharing:", error);
    toast.error("Failed to share wisdom");
  }
};

// For reading aloud
const handleReadAloud = () => {
  if (!response) {
    toast.error("No wisdom to read yet");
    return;
  }
  
  try {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    // Extract data safely (similar to copy function)
    let quote = "";
    let source = "Ancient Scripture";
    let explanation = "";
    let application = "";
    let meditation = "";
    
    if (typeof response === 'object') {
      if (response.structured) {
        quote = response.structured.quote || "";
        source = response.structured.source || "Ancient Scripture";
        explanation = response.structured.explanation || "";
        application = response.structured.application || "";
        meditation = response.structured.meditation || "";
      } else {
        quote = response.quote || "";
        source = response.source || "Ancient Scripture";
        explanation = response.explanation || "";
        application = response.application || "";
        meditation = response.meditation || "";
      }
    } else if (typeof response === 'string') {
      quote = response;
    }
    
    const textToRead = `
      ${quote}
      From ${source}.
      ${explanation}
      ${application ? `Application: ${application}` : ""}
      ${meditation ? `Meditation: ${meditation}` : ""}
    `;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower for spiritual content
    utterance.pitch = 1;
    utterance.onend = () => setIsReading(false);
    
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Error reading aloud:", error);
    toast.error("Failed to read wisdom aloud");
    setIsReading(false);
  }
};

  
  // For saving to journal
  const handleSaveToJournal = async () => {
    if (!response) return;
    
    try {
      // Check if user is logged in
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        toast.error("Please log in to save to your journal");
        // Optionally redirect to login
        // router.push('/login?redirect=/features/prashnavali');
        return;
      }
      
      // Save to journal table in Supabase
      const { error } = await supabase.from('journal_entries').insert({
        user_id: user.data.user.id,
        title: `Prashnavali: ${question}`,
        content: JSON.stringify(response),
        type: 'prashnavali',
        tags: selectedScriptures,
        created_at: new Date().toISOString()
      });
      
      if (error) {
        console.error("Error saving to journal:", error);
        toast.error("Failed to save to journal");
        return;
      }
      
      toast.success("Saved to your spiritual journal");
    } catch (error) {
      console.error("Error in save to journal:", error);
      toast.error("An error occurred while saving");
    }
  };
  
  const handleDownloadImage = async () => {
    if (!responseRef.current || !response) return;
    
    try {
      const element = responseRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#3D348B', // Mystic indigo background
        scale: 2, // Higher quality
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `vedvaani-wisdom-${Date.now()}.png`;
      link.click();
      
      toast.success("Divine wisdom image downloaded");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    }
  };



  const generateRelatedQuestions = async () => {
    if (!response || !question) return;
    
    try {
      const prompt = `
        Based on the original question: "${question}" 
        and the response about ${selectedScriptures.join(', ')},
        generate 3 related follow-up questions that the user might be interested in.
        Return only the questions as a JSON array of strings, nothing else.
      `;
      
      const groqResponse = await fetch('/api/generate-related', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!groqResponse.ok) {
        throw new Error('Failed to generate related questions');
      }
      
      const data = await groqResponse.json();
      setRelatedQuestions(data.questions);
    } catch (error) {
      console.error("Error generating related questions:", error);
      // Fallback to static questions if needed
      setRelatedQuestions([
        "How can I apply this wisdom in difficult situations?",
        "What does this teaching say about personal growth?",
        "How does this relate to modern spiritual practice?"
      ]);
    }
  };

      
      return (
        <div className="flex flex-col">
        <div className="relative w-full flex-grow pb-24">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-mystic-indigo via-deep-teal to-mystic-indigo opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/sacred-geometry-light.png')] bg-repeat opacity-5"></div>
          
          {/* Animated particles or decorative elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-sacred-gold opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
          <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 relative z-10 pt-1"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-himalayan-white mt-2">
                <span className="text-shadow-divine">Prashna</span>
                <span className="text-sacred-gold">vali</span>
                <span className="text-himalayan-white"> 2.0</span>
              </h1>
              <p className="text-xl text-himalayan-white max-w-2xl mx-auto">
                Seek divine wisdom from ancient scriptures. Ask your question and receive guidance from the timeless knowledge of Vedas, Upanishads, Bhagavad Gita, and more.
              </p>
            </motion.div>
            
            {step <= 4 && renderProgressIndicator()}
            
            <div className="relative z-10 mb-16">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>
            
            
            <motion.div 
              className="absolute bottom-20 right-20 opacity-20 hidden md:block"
              animate={{ 
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sacred-gold">
                <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M30 30L70 70M30 70L70 30" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 20V80" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 50H80" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </motion.div>
            <div className="pb-30"></div>
          </div>
        </div>
        </div>
      );
    }
    
