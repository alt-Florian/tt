// src/components/ui/ProgressColumn.tsx
import React, { useState } from 'react';

interface ProgressColumnProps {
  value: number;
}

export const ProgressColumn: React.FC<ProgressColumnProps> = ({ value }) => {
  const [isHovered, setIsHovered] = useState(false);
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const getProgressColor = (value: number): string => {
    if (value < 25) return 'bg-red-500';
    if (value < 50) return 'bg-orange-500';
    if (value < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-24 bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor(clampedValue)}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {isHovered && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
          {clampedValue.toFixed(2)}%
        </span>
      )}
    </div>
  );
};
