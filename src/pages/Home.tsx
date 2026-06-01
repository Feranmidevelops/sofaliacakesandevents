import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Hero } from '../components/Hero';
import { SegmentSection } from '../components/SegmentSection';
import { ContactModal } from '../components/ContactModal';
import { Phone, Sparkles, AlertCircle } from 'lucide-react';
import type { Product, Segment } from '../types';
import { getSegmentImages } from '../utils/segmentImages';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [floatingContactOpen, setFloatingContactOpen] = useState(false);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setProducts(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderClick = (productName?: string) => {
    const message = productName
      ? `Hi, I'm interested in ordering ${productName} from Sofalia Cakes and Events. Please share more details and pricing.`
      : `Hi, I'm interested in placing an order with Sofalia Cakes and Events. Please share more details.`;

    const whatsappUrl = `https://wa.me/2348134012455?text=${encodeURIComponent(message)}`;
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

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 mx-6 my-6 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      )}

      {/* Product Segments */}
      {!loading &&
        segments.map((segment) => {
          const segmentProducts = getProductsBySegment(segment);

          return (
            <SegmentSection
              key={segment}
              segment={segment}
              description={segmentDescriptions[segment]}
              products={segmentProducts}
              segmentImages={getSegmentImages(segment)}
              onOrderClick={handleOrderClick}
            />
          );
        })}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-600 text-lg">No products available at the moment.</p>
          <p className="text-gray-500">Please check back soon!</p>
        </div>
      )}

      {/* Floating Contact Button */}
      <button
        onClick={() => setFloatingContactOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-500 text-white p-4 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
        title="Contact us"
      >
        <Phone className="w-5 h-5 group-hover:rotate-6 transition-transform" />
      </button>

      {/* Contact Modal */}
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