// src/pages/Policy.tsx
import React from 'react';
import { Shield, FileText, Users, Clock } from 'lucide-react';

export const Policy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Our Policies</h1>
          <p className="text-xl text-gray-700">Commitment to transparency and excellence</p>
        </div>

        <div className="space-y-8">
          {/* Privacy Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-serif font-bold text-gray-800">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>At Sofalia Cakes and Events, your privacy is our priority. This policy outlines how we collect, use, and protect your information.</p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Information Collection</h3>
                <p>We collect personal information (name, email, phone) solely to process bookings and provide customer support. No data is shared with third parties.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                <p>All data is stored securely using encrypted browser storage. We implement industry-standard measures to protect your information.</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-serif font-bold text-gray-800">Terms & Conditions</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>By using our services, you agree to these terms. Please read carefully.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Orders require a 50% deposit to confirm booking.</li>
                <li>Cancellations must be made at least 7 days before the event for a full refund of deposit.</li>
                <li>Custom cake designs require a consultation prior to production.</li>
                <li>Delivery fees apply based on location.</li>
              </ul>
            </div>
          </div>

          {/* Service Guarantee */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-serif font-bold text-gray-800">Service Guarantee</h2>
            </div>
            <p className="text-gray-700">We are committed to delivering exceptional quality and service. If you're not satisfied, we'll work to make it right.</p>
          </div>

          {/* Contact */}
          <div className="bg-amber-50 rounded-2xl p-8 text-center">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Questions?</h3>
            <p className="text-gray-700">Reach out to us at +234 813 401 2455 or via our booking form.</p>
          </div>
        </div>
      </div>
    </div>
  );
};