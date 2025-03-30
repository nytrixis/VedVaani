'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { supabase } from '@/app/lib/supabase'

type User = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  spiritual_path?: 'seeker' | 'practitioner' | 'sage'
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [magic, setMagic] = useState<Magic | null>(null)

  // Initialize Magic Link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string)
      setMagic(magic)
    }
  }, [])

  // Check for existing session
  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Get user profile from our users table
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
              spiritual_path: profile.spiritual_path,
            })
          } else {
            // User exists in auth but not in our users table
            setUser({
              id: session.user.id,
              email: session.user.email!,
            })
          }
        }
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Login with Magic Link
  const login = async (email: string) => {
    try {
      setLoading(true)
      
      if (!magic) throw new Error('Magic not initialized')
      
      // Get DID token with Magic Link
      const didToken = await magic.auth.loginWithMagicLink({ email })
      
      if (!didToken) throw new Error('Failed to get DID token')
      
      // Exchange DID token for Supabase session
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'magic',
        token: didToken as string,
      })
      
      if (error) throw error
      
      if (data.user) {
        // Check if user exists in our users table
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        if (!existingUser && !userError) {
          // Create new user profile
          await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
          })
        }
        
        // Set user in state
        setUser({
          id: data.user.id,
          email: data.user.email!,
          full_name: existingUser?.full_name,
          avatar_url: existingUser?.avatar_url,
          spiritual_path: existingUser?.spiritual_path,
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  // Logout
  const logout = async () => {
    try {
      setLoading(true)
      
      if (magic) {
        await magic.user.logout()
      }
      
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update user profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true)
      
      if (!user) throw new Error('Not authenticated')
      
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)
      
      if (error) throw error
      
      setUser({ ...user, ...data })
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
