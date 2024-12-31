import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="absolute right-3 top-2.5">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
  </div>
);