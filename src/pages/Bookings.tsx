import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Segment } from '../types';
import { Toast } from '../components/Toast';
import { Mail, User, Tag, MessageSquare, DollarSign, Send } from 'lucide-react';

export const Bookings: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'General' as Segment | 'General',
    budget: '',
    message: '',
  });

  const reasons: (Segment | 'General')[] = ['Catering', 'Cake Making & Pastries', 'Gift Items', 'General'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.reason) newErrors.reason = 'Please select an interest';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert([
        {
          name: formData.name,
          email: formData.email,
          reason: formData.reason,
          budget: formData.budget || null,
          message: formData.message || null,
          seen: false,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setToast({
        message: '✨ Booking submitted successfully! We will contact you within 24 hours.',
        type: 'success',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        reason: 'General',
        budget: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error);
      setToast({
        message: 'Failed to submit booking. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-32 pb-20">
      <div className="container-max max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Plan Your Perfect Event
          </h1>
          <p className="text-xl text-gray-700">
            Let us bring your vision to life with elegance and flavor.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-amber-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Interest (Select) */}
            <div>
              <label htmlFor="reason" className="block text-gray-800 font-semibold mb-2">
                What are you interested in? *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none z-10" />
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none bg-white cursor-pointer ${
                    errors.reason ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budget" className="block text-gray-800 font-semibold mb-2">
                Budget Range (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none" />
                <input
                  id="budget"
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., ₦150,000 - ₦300,000"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                Tell Us More (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-amber-500 w-5 h-5 pointer-events-none z-10" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your event, preferred dates, or special requirements..."
                  rows={5}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            * Required fields. We'll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </div>
  );
};