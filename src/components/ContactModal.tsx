// src/components/ContactModal.tsx
import React from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/2348134012455', '_blank');
    onClose();
  };

  const handlePhone = () => {
    window.location.href = 'tel:+2348134012455';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-2xl animate-scale-up w-full max-w-md mx-auto my-4 sm:my-8">
        {/* Adjusted padding for mobile: smaller on small screens, larger on desktop */}
        <div className="p-5 sm:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">Connect With Us</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-amber-600 transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
            Reach out to us instantly via WhatsApp or phone call. We're here to help!
          </p>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-100 rounded-xl hover:border-amber-200 hover:bg-amber-50 transition-all duration-300 group"
            >
              <div className="bg-green-100 p-2 sm:p-3 rounded-full group-hover:bg-green-200 transition">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800 text-sm sm:text-base">WhatsApp</p>
                <p className="text-xs sm:text-sm text-gray-500">Chat with us instantly</p>
              </div>
            </button>

            <button
              onClick={handlePhone}
              className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-100 rounded-xl hover:border-amber-200 hover:bg-amber-50 transition-all duration-300 group"
            >
              <div className="bg-amber-100 p-2 sm:p-3 rounded-full group-hover:bg-amber-200 transition">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800 text-sm sm:text-base">Phone Call</p>
                <p className="text-xs sm:text-sm text-gray-500">Call us directly</p>
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-5 sm:mt-6 text-gray-600 border border-gray-200 rounded-full py-2 sm:py-2.5 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};