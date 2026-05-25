// src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Wedding cake
  'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Catering spread
  'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Pastries
  'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Gift items
  'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Event setup
];

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Ken Burns Effect */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center z-10 px-6">
        <div className="animate-fade-in-up">
          
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
            Sofalia Cakes <br className="hidden sm:block" />& Events
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 mb-10 drop-shadow-lg max-w-3xl mx-auto font-light">
            Elegantly crafted celebrations for every occasion — where dreams meet exquisite flavors.
          </p>
          <button
            onClick={onOrderClick}
            className="group relative bg-amber-500 hover:bg-amber-600 text-white text-lg px-5 py-2 rounded-full font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Start Your Order
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
            <ChevronDown className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div> */}
      </div>
    </section>
  );
};