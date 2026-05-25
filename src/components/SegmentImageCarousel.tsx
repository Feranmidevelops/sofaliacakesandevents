// src/components/SegmentImageCarousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SegmentImageCarouselProps {
  images: string[];
  segmentName: string;
  autoScrollInterval?: number;
}

export const SegmentImageCarousel: React.FC<SegmentImageCarouselProps> = ({
  images,
  segmentName,
  autoScrollInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isAutoScrolling && !isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoScrollInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, isHovered, images.length, autoScrollInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoScrolling(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoScrolling(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);
  };



  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl mb-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Container */}
      <div className="relative h-80 md:h-96 lg:h-[450px] bg-gradient-to-r from-gray-900 to-gray-800">
        <img
          src={images[currentIndex]}
          alt={`${segmentName} showcase ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Segment Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">
            {segmentName}
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-2 max-w-xl">
            Explore our exquisite {segmentName.toLowerCase()} collection
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-600 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-600 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Auto-scroll Toggle */}
      {/* <button
        onClick={toggleAutoScroll}
        className="absolute bottom-4 right-4 bg-black/50 hover:bg-amber-600 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label={isAutoScrolling ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-amber-500'
                : 'w-2 h-2 bg-white/60 hover:bg-white/90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};