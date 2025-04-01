"use client";

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    spiritual_path: user?.spiritual_path || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await updateProfile({
        full_name: formData.full_name,
        spiritual_path: formData.spiritual_path as "seeker" | "practitioner" | "sage"
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            <Card variant="divine" className="shadow-divine-glow">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-mystic-indigo">
                    Profile Settings
                  </h1>
                  <Link href="/dashboard">
                    <Button variant="outline" className="border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-himalayan-white">
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>

                {message && (
                  <div className={`p-3 rounded-md mb-4 ${message.includes('success') ? 'bg-tranquil-sky-blue bg-opacity-10 text-tranquil-sky-blue' : 'bg-lotus-pink bg-opacity-10 text-lotus-pink'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-ashram-gray mb-1">
                      Full Name
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-tranquil-sky-blue rounded-md focus:outline-none focus:ring-2 focus:ring-sacred-gold"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="spiritual_path" className="block text-sm font-medium text-ashram-gray mb-1">
                      Spiritual Path
                    </label>
                    <select
                      id="spiritual_path"
                      name="spiritual_path"
                      value={formData.spiritual_path}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-tranquil-sky-blue rounded-md focus:outline-none focus:ring-2 focus:ring-sacred-gold"
                    >
                      <option value="">Select your spiritual path</option>
                      <option value="hinduism">Hinduism</option>
                      <option value="buddhism">Buddhism</option>
                      <option value="jainism">Jainism</option>
                      <option value="sikhism">Sikhism</option>
                      <option value="yoga">Yoga</option>
                      <option value="vedanta">Vedanta</option>
                      <option value="tantra">Tantra</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="divine"
                      className="w-full shadow-divine-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-tranquil-sky-blue border-opacity-20">
                  <h2 className="text-xl font-bold text-mystic-indigo mb-4">Account Information</h2>
                  <div className="space-y-2">
                    <p className="text-ashram-gray">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-ashram-gray">
                      <span className="font-medium">Account Created:</span> {new Date().toLocaleDateString()} {/* Replace with actual creation date if available */}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
