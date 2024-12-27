import { ReactNode } from 'react';
import { BigSpinner } from './Spinner';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function PageLoader({ isLoading, message = 'Chargement en cours...' }: PageLoaderProps) {


  return (
    <div className="relative min-h-screen">
      {/* Content with opacity */}
      <div className="transition-opacity duration-300 opacity-25">
     
     

      {/* Loader overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <BigSpinner />
        <p className="mt-4 text-lg font-medium text-gray-900">{message}</p>
              </div>
               </div>
    </div>
  );
}