"use client";

import Link from "next/link";
import { motion } from "framer-motion";


// Social media icons
const SocialIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link 
    href={href}
    className="w-10 h-10 rounded-full bg-sacred-gold bg-opacity-10 flex items-center justify-center text-himalayan-white hover:bg-opacity-20 transition-all duration-300 group relative"
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-sacred-gold text-mystic-indigo text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {label}
    </span>
    {icon}
  </Link>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Footer animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-mystic-indigo text-himalayan-white overflow-hidden">
      {/* Decorative wave at the top */}
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
      
      {/* Main footer content */}
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and mission statement */}
          <motion.div 
            className="md:col-span-4 flex flex-col"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sacred-gold to-deep-saffron p-0.5 mr-3">
                <div className="w-full h-full rounded-full bg-mystic-indigo flex items-center justify-center">
                </div>
              </div>
              <h2 className="text-2xl font-bold font-samarkan">
                <span className="text-shadow-divine">Ved</span>
                <span className="text-sacred-gold">Vaani</span>
              </h2>
            </div>
            
            <p className="text-himalayan-white text-opacity-80 mb-6">
              Connecting ancient wisdom with modern technology to guide your spiritual journey through AI-powered divine insights.
            </p>
            
            <div className="flex space-x-3 mb-6">
              <SocialIcon 
                href="https://twitter.com/vedvaani" 
                label="Twitter"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.03 4.11 20.74 3 21 1.7C20.02 2.33 18.91 2.78 17.73 3.03C16.78 2 15.37 1.35 13.8 1.35C10.78 1.35 8.34 3.79 8.34 6.81C8.34 7.29 8.4 7.75 8.5 8.19C4.44 7.99 0.95 5.81 0.35 2.64C0.14 3.49 0.01 4.42 0.01 5.38C0.01 7.2 1.06 8.82 2.64 9.74C1.99 9.71 1.36 9.53 0.8 9.24V9.29C0.8 11.96 2.7 14.19 5.28 14.75C4.79 14.89 4.28 14.97 3.75 14.97C3.39 14.97 3.03 14.93 2.67 14.86C3.4 17.05 5.44 18.64 7.86 18.68C6 20.14 3.67 21 1.18 21C0.78 21 0.39 20.97 0 20.92C2.45 22.5 5.33 23.35 8.5 23.35C13.8 23.35 17.96 19.01 17.96 15.36C17.96 15.12 17.95 14.88 17.94 14.65C18.93 13.95 19.8 13.06 20.5 12.06L22 4.01Z" fill="currentColor"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://instagram.com/vedvaani" 
                label="Instagram"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.16C15.2 2.16 15.58 2.17 16.82 2.22C19.75 2.36 21.64 4.27 21.78 7.18C21.83 8.42 21.84 8.8 21.84 12C21.84 15.2 21.83 15.58 21.78 16.82C21.64 19.73 19.75 21.64 16.82 21.78C15.58 21.83 15.2 21.84 12 21.84C8.8 21.84 8.42 21.83 7.18 21.78C4.25 21.64 2.36 19.73 2.22 16.82C2.17 15.58 2.16 15.2 2.16 12C2.16 8.8 2.17 8.42 2.22 7.18C2.36 4.27 4.25 2.36 7.18 2.22C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0.01 7.05 0.06C2.7 0.27 0.27 2.69 0.06 7.05C0.01 8.33 0 8.74 0 12C0 15.26 0.01 15.67 0.06 16.95C0.27 21.31 2.69 23.73 7.05 23.94C8.33 23.99 8.74 24 12 24C15.26 24 15.67 23.99 16.95 23.94C21.31 23.73 23.73 21.31 23.94 16.95C23.99 15.67 24 15.26 24 12C24 8.74 23.99 8.33 23.94 7.05C23.73 2.69 21.31 0.27 16.95 0.06C15.67 0.01 15.26 0 12 0ZM12 5.84C8.6 5.84 5.84 8.6 5.84 12C5.84 15.4 8.6 18.16 12 18.16C15.4 18.16 18.16 15.4 18.16 12C18.16 8.6 15.4 5.84 12 5.84ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM18.41 4.15C17.67 4.15 17.07 4.75 17.07 5.49C17.07 6.23 17.67 6.83 18.41 6.83C19.15 6.83 19.75 6.23 19.75 5.49C19.75 4.75 19.15 4.15 18.41 4.15Z" fill="currentColor"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://facebook.com/vedvaani" 
                label="Facebook"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.07C24 5.41 18.63 0 12 0C5.37 0 0 5.41 0 12.07C0 18.1 4.39 23.09 10.12 24V15.56H7.08V12.07H10.12V9.41C10.12 6.38 11.91 4.71 14.65 4.71C15.97 4.71 17.34 4.95 17.34 4.95V7.92H15.83C14.35 7.92 13.88 8.85 13.88 9.81V12.07H17.2L16.67 15.56H13.88V24C19.61 23.09 24 18.1 24 12.07Z" fill="currentColor"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://youtube.com/vedvaani" 
                label="YouTube"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5 6.2C23.3 5.4 22.9 4.7 22.3 4.1C21.7 3.5 21 3.1 20.2 2.9C18.4 2.4 11.4 2.4 11.4 2.4C8.4 2.4 5.5 2.5 2.8 2.9C2 3.1 1.3 3.5 0.7 4.1C0.1 4.7 -0.3 5.4 -0.5 6.2C-0.7 8 -0.8 9.8 -0.8 11.6C-0.8 13.4 -0.7 15.2 -0.5 17C-0.3 17.8 0.1 18.5 0.7 19.1C1.3 19.7 2 20.1 2.8 20.3C4.6 20.8 11.4 20.8 11.4 20.8C14.4 20.8 17.3 20.7 20 20.3C20.8 20.1 21.5 19.7 22.1 19.1C22.7 18.5 23.1 17.8 23.3 17C23.5 15.2 23.6 13.4 23.6 11.6C23.6 9.8 23.5 8 23.5 6.2ZM9.2 15.6V7.6L15.4 11.6L9.2 15.6Z" fill="currentColor"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://linkedin.com/company/vedvaani" 
                label="LinkedIn"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.4 20.4H16.9V14.9C16.9 13.6 16.9 11.9 15 11.9C13.1 11.9 12.8 13.3 12.8 14.8V20.4H9.3V9H12.7V10.6H12.7C13.2 9.7 14.4 8.7 16.2 8.7C19.8 8.7 20.5 11.1 20.5 14.1V20.4H20.4ZM5.3 7.3C4.2 7.3 3.3 6.4 3.3 5.3C3.3 4.2 4.2 3.3 5.3 3.3C6.4 3.3 7.3 4.2 7.3 5.3C7.3 6.4 6.4 7.3 5.3 7.3ZM7.1 20.4H3.6V9H7.1V20.4Z" fill="currentColor"/>
                  </svg>
                }
              />
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center space-x-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sacred-gold">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <p className="text-himalayan-white text-opacity-80">Rated 4.9/5 from over 1,000 spiritual seekers</p>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-sacred-gold font-bold text-lg mb-4 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="currentColor"/>
              </svg>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Features", href: "/#features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Testimonials", href: "/#testimonials" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-himalayan-white text-opacity-80 hover:text-sacred-gold transition-colors duration-300 flex items-center group"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="mr-2 text-sacred-gold transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Features */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-sacred-gold font-bold text-lg mb-4 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              Features
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Prashnavali 2.0", href: "/features/prashnavali" },
                { name: "Spiritual Twin", href: "/features/spiritual-twin" },
                { name: "Mystic Sound Bath", href: "/features/sound-bath" },
                { name: "AnuShakti", href: "/features/anushakti" },
                { name: "Sacred Journal", href: "/features/journal" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-himalayan-white text-opacity-80 hover:text-sacred-gold transition-colors duration-300 flex items-center group"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="mr-2 text-sacred-gold transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-sacred-gold font-bold text-lg mb-4 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 9H18V11H10V9ZM10 12H14V14H10V12ZM10 6H18V8H10V6Z" fill="currentColor"/>
              </svg>
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/api" },
                { name: "Tutorials", href: "/tutorials" },
                { name: "Spiritual Guides", href: "/guides" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-himalayan-white text-opacity-80 hover:text-sacred-gold transition-colors duration-300 flex items-center group"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="mr-2 text-sacred-gold transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-sacred-gold font-bold text-lg mb-4 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
              </svg>
              Newsletter
            </h3>
            <p className="text-himalayan-white text-opacity-80 mb-4">
              Subscribe to receive divine wisdom and updates
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-mystic-indigo bg-opacity-50 border border-sacred-gold border-opacity-30 rounded-lg py-2 px-4 text-himalayan-white placeholder-himalayan-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-sacred-gold"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-sacred-gold to-deep-saffron text-mystic-indigo font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
              >
                <span>Subscribe</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-sacred-gold to-transparent my-8 opacity-30"
          variants={itemVariants}
        />
        
        {/* Bottom footer */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-himalayan-white text-opacity-70 text-sm mb-4 md:mb-0">
            © {currentYear} VedVaani, by Nandini Pandey. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookie Policy", href: "/cookies" },
              { name: "Accessibility", href: "/accessibility" },
              { name: "Sitemap", href: "/sitemap" },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-himalayan-white text-opacity-70 text-sm hover:text-sacred-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      
      {/* Floating particles */}
    </footer>
  );
}

