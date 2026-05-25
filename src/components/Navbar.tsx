// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cake } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const location = useLocation();
  const isMobileMenuOpen = mobileMenuPath === location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-gradient-to-b from-black/30 to-transparent py-5'
      }`}
    >
      <div className="container-max flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight"
        >
          <Cake className={`w-6 h-6 ${isScrolled ? 'text-amber-600' : 'text-amber-300'}`} />
          <span className={isScrolled ? 'text-gray-800' : 'text-white'}>
            Sofalia
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/policy"
            className={`font-medium transition-all duration-300 hover:text-amber-400 relative group ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Policy
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
          </Link>
          <Link
            to="/bookings"
            className={`font-medium transition-all duration-300 hover:text-amber-400 relative group ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Bookings
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileMenuPath(isMobileMenuOpen ? null : location.pathname)
          }
          className={`md:hidden p-2 rounded-lg transition ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 animate-slide-down">
          <div className="flex flex-col p-6 gap-4">
            <Link
              to="/policy"
              className="text-gray-800 font-medium py-2 hover:text-amber-600 transition"
              onClick={() => setMobileMenuPath(null)}
            >
              Policy
            </Link>
            <Link
              to="/bookings"
              className="text-gray-800 font-medium py-2 hover:text-amber-600 transition"
              onClick={() => setMobileMenuPath(null)}
            >
              Bookings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};