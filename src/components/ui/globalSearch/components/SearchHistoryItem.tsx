import React from 'react';
import { ClockIcon } from '@heroicons/react/20/solid';
import { classNames } from '@utils/classNames';
import { SearchHistoryEntry, CATEGORY_ICONS } from '../types';

interface SearchHistoryItemProps {
  entry: SearchHistoryEntry;
  active: boolean;
}

export const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({ entry, active }) => {
  const Icon = entry.category ? CATEGORY_ICONS[entry.category] : ClockIcon;
  const formattedDate = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })
    .format(-Math.floor((Date.now() - entry.timestamp) / 3600000), 'hour');

  return (
    <div className="flex items-center">
      <Icon 
        className={classNames(
          'h-4 w-4 flex-shrink-0 mr-3',
          active ? 'text-white' : 'text-gray-400'
        )}
      />
      <div className="flex-1">
        <div className="font-medium">{entry.query}</div>
        <div className={classNames(
          'text-xs',
          active ? 'text-blue-200' : 'text-gray-500'
        )}>
          {entry.resultSelected && <span className="mr-2">{entry.resultSelected}</span>}
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};