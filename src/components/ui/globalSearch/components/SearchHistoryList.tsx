import React from 'react';
import { ComboboxOption } from '@headlessui/react';
import { SearchHistoryEntry } from '../types';
import { SearchHistoryItem } from './SearchHistoryItem';
import { classNames } from '@utils/classNames';

interface SearchHistoryListProps {
  filteredHistory: SearchHistoryEntry[];
  onSelect: (entry: SearchHistoryEntry) => void;
}

export const SearchHistoryList: React.FC<SearchHistoryListProps> = ({ 
  filteredHistory,
  onSelect
}) => {
  if (!filteredHistory.length) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Aucun historique trouvé
      </div>
    );
  }

  return (
    <div>
      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
        Historique de recherche
      </div>
      {filteredHistory.map((entry) => (
        <ComboboxOption
          key={entry.id}
          value={entry}
          className={({ active }: { active: boolean }) =>
            classNames(
              'w-full text-left relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-blue-600 text-white' : 'text-gray-900'
            )
          }
        >
          {({ active }: { active: boolean }) => (
            <SearchHistoryItem entry={entry} active={active} />
          )}
        </ComboboxOption>
      ))}
    </div>
  );
};