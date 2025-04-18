import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import FloatingDockDemo from './components/floating-dock-demo'
import ClientFooter from './components/ClientFooter'
import { Toaster } from 'sonner'

// Font setup
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'VedVaani - Divine Wisdom Platform',
  description: 'Experience spiritual wisdom through AI-powered divine guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-himalayan-white`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Toaster position="top-center" />
            <FloatingDockDemo />
            <ClientFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
