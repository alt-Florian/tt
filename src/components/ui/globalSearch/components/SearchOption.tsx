import React from 'react';
import { SearchResult, CATEGORY_ICONS } from '../types';
import { classNames } from '@utils/classNames';

interface SearchOptionProps {
  result: SearchResult;
  active: boolean;
}

export const SearchOption: React.FC<SearchOptionProps> = ({ result, active }) => {
  const Icon = CATEGORY_ICONS[result.category];
  
  return (
    <div className="flex items-center">
      <Icon 
        className={classNames(
          'h-4 w-4 flex-shrink-0 mr-3',
          active ? 'text-white' : 'text-gray-400'
        )}
        aria-hidden="true" 
      />
      <div>
        <div className="font-medium">{result.title}</div>
        {result.subtitle && (
          <div className={classNames(
            'text-sm',
            active ? 'text-blue-200' : 'text-gray-500'
          )}>
            {result.subtitle}
          </div>
        )}
      </div>
    </div>
  );
};