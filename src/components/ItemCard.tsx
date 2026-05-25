import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { Product } from '../types';

interface ItemCardProps {
  product: Product;
  onOrderClick: (productName: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ product, onOrderClick }) => {
  return (
    <div className="flex-shrink-0 carousel-item w-80 group">
      <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-border-light">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content - flex column to push button row to bottom */}
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-lg font-serif font-bold text-deep-brown mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          {/* Price and button row - always at bottom with consistent spacing */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-serif font-bold text-gold">
              {product.price}
            </span>
            <button
              onClick={() => onOrderClick(product.name)}
              className="flex items-center gap-2 bg-gold text-white px-3 py-1 rounded-xl  hover:bg-deep-brown transition text-md font-medium min-w-[90px] justify-center"
            >
              <MessageCircle className="w-3 h-3" />
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};