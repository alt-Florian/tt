import { TrashIcon } from '@heroicons/react/20/solid';
import { SavedFilterType } from './types';
import { useFilterStore } from '@stores/FilterStore';
import { isEqual } from 'lodash';

interface SavedFilterProps {
  filter: SavedFilterType;
}

export function SavedFilter({ filter }: SavedFilterProps) {
  const { removeSavedFilter, setConditions, setLogic, currentFilter } = useFilterStore();

  const isSelected = isEqual(filter.conditions, currentFilter.conditions) && 
                    filter.logic === currentFilter.logic;

  const handleSelect = () => {
    setConditions(filter.conditions);
    setLogic(filter.logic);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeSavedFilter(filter.id);
  };

  return (
    <div 
      className={`
        flex items-center justify-between w-full px-3 py-2 
        rounded-md border ${isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800'} 
        hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-150
      `}
    >
      <button
        onClick={handleSelect}
        className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
      >
        {filter.name}
      </button>
      
      <div className="flex items-center gap-3">
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <TrashIcon className="w-4 h-4" />
        </button>

        <input 
          type="radio"
          checked={isSelected}
          onChange={handleSelect}
          className="h-4 w-4 text-indigo-600 dark:text-indigo-500 border-gray-300 dark:border-dark-600"
        />
      </div>
    </div>
  );
}