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
  login: (email: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [magic, setMagic] = useState<Magic | null>(null)

  // Initialize Magic Link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string)
        setMagic(magic)
      } catch (error) {
        console.error("Failed to initialize Magic:", error);
        // Even if Magic fails to initialize, we should still set loading to false
        setLoading(false);
      }
    }
  }, [])

  // Check for existing session
  useEffect(() => {
    // Check for user session on initial load
    const getSession = async () => {
      try {
        console.log("AuthContext: Fetching session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
        } else if (data?.session?.user) {
          console.log("AuthContext: Session found, user exists");
          const supabaseUser = data.session.user;
          
          // Check if user exists in our users table
          const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();
          
          if (!existingUser && !userError) {
            // Create new user profile
            await supabase.from('users').insert({
              id: supabaseUser.id,
              email: supabaseUser.email,
            });
          }
          
          // Set user in state
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email!,
            full_name: existingUser?.full_name,
            avatar_url: existingUser?.avatar_url,
            spiritual_path: existingUser?.spiritual_path,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    getSession();
  
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const supabaseUser = session.user;
          
          // Check if user exists in our users table
          const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();
          
          if (!existingUser && !userError) {
            // Create new user profile
            await supabase.from('users').insert({
              id: supabaseUser.id,
              email: supabaseUser.email,
            });
          }
          
          // Set user in state
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email!,
            full_name: existingUser?.full_name,
            avatar_url: existingUser?.avatar_url,
            spiritual_path: existingUser?.spiritual_path,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );
  
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  

  // Login with Magic Link
  const login = async (email: string) => {
    try {
      setLoading(true);
  
      // Use Supabase's built-in magic link functionality
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
  
      if (error) throw error;
  
      // Return true to indicate success
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout
  const logout = async () => {
    try {
      setLoading(true)
      
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
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

  console.log("AuthContext: Current state - loading:", loading, "user:", user ? "exists" : "null");

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
