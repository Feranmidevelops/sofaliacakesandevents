// src/components/Carousel.tsx
import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { ItemCard } from './ItemCard';

interface CarouselProps {
  products: Product[];
  onOrderClick: (productName: string) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ products, onOrderClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Width of one card (w-80 = 320px) + gap
      const newPosition =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products available in this segment.
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-amber-500 text-white p-2.5 rounded-full hover:bg-amber-700 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Scroll left"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Carousel container */}
      <div
        ref={scrollContainerRef}
        className="carousel-scroll flex gap-6 overflow-x-auto pb-6 scroll-smooth"
      >
        {products.map((product) => (
          <ItemCard
            key={product.id}
            product={product}
            onOrderClick={onOrderClick}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-amber-500 text-white p-2.5 rounded-full hover:bg-amber-700 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Scroll right"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};