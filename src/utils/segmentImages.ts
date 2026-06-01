import type { Segment } from '../types';


export const segmentImageMap: Record<Segment, string[]> = {
  Catering: [
    'https://images.unsplash.com/photo-1555939594-58d7cb561e1f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1564015231837-f0e26dfa8c82?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561e1f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=300&fit=crop',
  ],
  'Cake Making & Pastries': [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
  ],
  'Gift Items': [
    'https://images.unsplash.com/photo-1549465120-7beef77a357f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549465120-7beef77a357f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549465120-7beef77a357f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549465120-7beef77a357f?w=500&h=300&fit=crop',
  ],
};

export const getSegmentImages = (segment: Segment): string[] => {
  return segmentImageMap[segment] || [
    'https://via.placeholder.com/500x300?text=' + segment,
  ];

};