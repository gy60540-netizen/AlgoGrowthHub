import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 18 }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            size={size}
            fill={isFilled ? '#F59E0B' : 'transparent'}
            color={isFilled ? '#F59E0B' : '#CBD5E1'}
          />
        );
      })}
    </div>
  );
};
