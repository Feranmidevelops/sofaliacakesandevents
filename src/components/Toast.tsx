// src/components/Toast.tsx
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed bottom-6 left-6 ${bgColor} ${borderColor} border-l-4 rounded-lg p-4 flex items-center gap-3 shadow-xl animate-slide-up max-w-md z-50`}
    >
      <Icon className={`w-5 h-5 ${textColor}`} />
      <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`ml-auto ${textColor} hover:opacity-70 transition`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};