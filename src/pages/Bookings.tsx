// src/pages/Bookings.tsx
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Booking, Segment } from '../types';
import { Toast } from '../components/Toast';
import { Mail, User, Tag, MessageSquare, DollarSign } from 'lucide-react';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('bookings', []);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'General' as Segment | 'General',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const reasons: (Segment | 'General')[] = ['Catering', 'Cake Making & Pastries', 'Gift Items', 'General'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBooking: Booking = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      reason: formData.reason,
      budget: formData.budget,
      message: formData.message,
      timestamp: Date.now(),
      seen: false,
    };

    setBookings([...bookings, newBooking]);
    setFormData({ name: '', email: '', reason: 'General', budget: '', message: '' });
    setToast({ message: ' Booking submitted successfully! We will contact you soon.', type: 'success' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-32 pb-20">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Plan Your Event</h1>
          <p className="text-xl text-gray-700">Let us bring your vision to life with elegance and flavor.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-amber-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 w-3 h-3 pointer-events-none z-10" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`w-full pl-14 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 w-3 h-3 pointer-events-none z-10" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full pl-14 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Interest (Select) */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Interest *</label>
              <div className="relative">
                <Tag className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 w-3 h-3 pointer-events-none z-10" />
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none bg-white ${errors.reason ? 'border-red-400' : 'border-gray-200'}`}
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
                {/* Custom dropdown arrow to prevent icon clash */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Budget Range</label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 w-3 h-3 pointer-events-none z-10" />
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., ₦150,000 - ₦300,000"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Additional Details</label>
              <div className="relative ">
                <MessageSquare className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 w-3 h-3 pointer-events-none z-10" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your event, preferred dates, or special requirements..."
                  rows={5}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-lg bg-amber-500 hover:bg-amber-600 text-white text-lg py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Booking Request
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            * We'll respond within 24 hours.
          </p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};