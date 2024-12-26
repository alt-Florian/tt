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
    <div className="inline-flex items-center justify-between w-full min-w-[250px] max-w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md">
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={handleSelect}
          className="text-sm text-gray-700 hover:text-gray-900 truncate mr-2"
        >
          {filter.name}
        </button>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-gray-600"
        >
          <TrashIcon className="w-4 h-4" />
        </button>

        <input 
          type="radio"
          name="selectedFilter"
          checked={isSelected}
          onChange={handleSelect}
          className="rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
}