// src/pages/Home.tsx
import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { SegmentSection } from '../components/SegmentSection';
import { ContactModal } from '../components/ContactModal';
import { Phone, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, Segment } from '../types';
import { initialProducts } from '../utils/initialData';
import { getSegmentImages } from '../utils/segmentImages.ts';

export const Home: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', initialProducts);
  const [floatingContactOpen, setFloatingContactOpen] = useState(false);

  const handleOrderClick = (productName?: string) => {
    const whatsappUrl = productName
      ? `https://wa.me/2348134012455?text=Hi%2C%20I'm%20interested%20in%20ordering%20${encodeURIComponent(productName)}%20from%20Sofalia%20Cakes%20and%20Events.%20Please%20share%20more%20details.`
      : `https://wa.me/2348134012455?text=Hi%2C%20I'm%20interested%20in%20placing%20an%20order%20with%20Sofalia%20Cakes%20and%20Events.%20Please%20share%20more%20details.`;
    window.open(whatsappUrl, '_blank');
  };

  const segments: Segment[] = ['Catering', 'Cake Making & Pastries', 'Gift Items'];

  const segmentDescriptions: Record<Segment, string> = {
    Catering:
      'Elevate your events with our premium catering services. From corporate gatherings to intimate weddings, we bring culinary excellence to every table.',
    'Cake Making & Pastries':
      'Exquisite custom cakes and artisanal pastries crafted with passion. Each creation tells a unique story of flavor and elegance.',
    'Gift Items':
      'Beautifully curated gift collections perfect for every celebration. Thoughtful, elegant, and memorable.',
  };

  const getProductsBySegment = (segment: Segment): Product[] => {
    return products.filter((p) => p.segment === segment);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero onOrderClick={() => handleOrderClick()} />

      {/* Product Segments */}
      {segments.map((segment) => (
        <SegmentSection
          key={segment}
          segment={segment}
          description={segmentDescriptions[segment]}
          products={getProductsBySegment(segment)}
          segmentImages={getSegmentImages(segment)}
          onOrderClick={handleOrderClick}
        />
      ))}

      {/* Floating Contact Button */}
      <button
        onClick={() => setFloatingContactOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-500 text-white p-4 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
      >
        <Phone className="w-4 h-4 group-hover:rotate-6 transition-transform" />
      </button>

      <ContactModal
        isOpen={floatingContactOpen}
        onClose={() => setFloatingContactOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container-max text-center">
          <div className="flex justify-center gap-2 items-center mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <p className="font-serif text-2xl">Sofalia Cakes and Events</p>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 All rights reserved. Crafted with love and elegance.
          </p>
        </div>
      </footer>
    </div>
  );
};