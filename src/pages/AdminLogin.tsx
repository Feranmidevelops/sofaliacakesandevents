// src/pages/AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ADMIN_PASSCODE = '852456';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (passcode === ADMIN_PASSCODE) {
        authenticate();
        navigate('/admin/sofaliacakesandevents/dashboard');
      } else {
        setError('Invalid passcode. Please try again.');
        setPasscode('');
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-amber-100 transform transition-all">
        <div className="text-center mb-8">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Access</h1>
          <p className="text-gray-600 mt-2">Enter secure passcode to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">6-Digit Passcode</label>
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="••••••"
                maxLength={6}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition text-center text-2xl tracking-widest ${
                  error ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition"
              >
                {showPasscode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || passcode.length !== 6}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">Secured area — authorized personnel only</p>
      </div>
    </div>
  );
};