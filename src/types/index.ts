// src/types/index.ts
export type Segment = 'Catering' | 'Cake Making & Pastries' | 'Gift Items';

export interface Product {
  id: string;
  segment: Segment;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  reason: Segment | 'General';
  budget: string;
  message: string;
  timestamp: number;
  seen: boolean;
}