// src/components/SegmentSection.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Product, Segment } from '../types';
import { Carousel } from './Carousel';
import { SegmentImageCarousel } from './SegmentImageCarousel';

interface SegmentSectionProps {
  segment: Segment;
  description: string;
  products: Product[];
  segmentImages: string[];
  onOrderClick: (productName: string) => void;
}

export const SegmentSection: React.FC<SegmentSectionProps> = ({
  segment,
  description,
  products,
  segmentImages,
  onOrderClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const collapsedProducts = products.slice(0, 4);
  const displayProducts = isExpanded ? products : collapsedProducts;

  return (
    <section className="py-20 border-b border-gray-200 last:border-b-0 bg-gradient-to-b from-white to-gray-50">
      <div className="container-max">
        {/* Image Carousel for Segment */}
        <SegmentImageCarousel images={segmentImages} segmentName={segment} />

        {/* Header */}
        <div className="mb-12 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-3 mb-4 hover:text-amber-600 transition-colors group"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
              {segment}
            </h2>
            <ChevronDown
              className={`w-8 h-8 text-amber-500 transition-all duration-300 ${
                isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'
              }`}
            />
          </button>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Product Carousel */}
        <Carousel products={displayProducts} onOrderClick={onOrderClick} />

        {/* Expand/Collapse toggle */}
        {products.length > 4 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-100 text-amber-700 font-semibold hover:bg-amber-200 transition-all duration-300 hover:shadow-md"
            >
              {isExpanded ? 'Show Less' : `View All ${products.length} Items`}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};