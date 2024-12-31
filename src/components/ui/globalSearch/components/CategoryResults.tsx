import React from 'react';
import { ComboboxOption } from '@headlessui/react';
import { CategoryType, SearchResult, CATEGORY_LABELS } from '../types';
import { SearchOption } from './SearchOption';
import { classNames } from '@utils/classNames';

interface CategoryResultsProps {
  category: CategoryType;
  results: SearchResult[];
}

export const CategoryResults: React.FC<CategoryResultsProps> = ({ category, results }) => {
  if (!results?.length) return null;
  
  return (
    <div>
      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
        {CATEGORY_LABELS[category]}
      </div>
      
      {results.map((result) => (
        <ComboboxOption
          key={result.id}
          value={result}
          className={({ active }: { active: boolean }) =>
            classNames(
              'w-full text-left relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-blue-600 text-white' : 'text-gray-900'
            )
          }
        >
          {({ active }: { active: boolean }) => (
            <SearchOption result={result} active={active} />
          )}
        </ComboboxOption>
      ))}
    </div>
  );
};