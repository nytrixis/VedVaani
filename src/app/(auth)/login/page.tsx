'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await login(email)
      setMessage('Magic link sent! Check your email to complete login.')
    } catch (error) {
      console.error('Login error:', error)
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card variant="divine" className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mystic-indigo mb-2">
            Welcome to <span className="text-shadow-divine">Ved</span>Vaani
          </h1>
          <p className="text-ashram-gray">Enter your email to begin your spiritual journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-deep-teal mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-tranquil-sky-blue rounded-md focus:outline-none focus:ring-2 focus:ring-sacred-gold"
              placeholder="your@email.com"
            />
          </div>

          {message && (
            <div className="p-3 bg-tranquil-sky-blue bg-opacity-20 rounded-md text-deep-teal text-sm">
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            variant="divine" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Sending Magic Link...' : 'Continue with Magic Link'}
          </Button>

          <div className="text-center text-sm text-ashram-gray">
            <p>
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-deep-teal hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-deep-teal hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}
