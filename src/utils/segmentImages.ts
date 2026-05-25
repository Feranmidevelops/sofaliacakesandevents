// src/utils/segmentImages.ts
import type { Segment } from '../types';

export const getSegmentImages = (segment: Segment): string[] => {
  const baseImages = [
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/2606894/pexels-photo-2606894.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/2067420/pexels-photo-2067420.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  ];

  const segmentSpecific: Record<Segment, string[]> = {
    Catering: [
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/2606894/pexels-photo-2606894.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/2067420/pexels-photo-2067420.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    ],
    'Cake Making & Pastries': [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    ],
    'Gift Items': [
      'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/2067420/pexels-photo-2067420.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/2606894/pexels-photo-2606894.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/956999/pexels-photo-956999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    ],
  };
  return segmentSpecific[segment] || baseImages;
};