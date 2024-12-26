import { TrashIcon } from '@heroicons/react/20/solid';
import { SavedFilterType } from './Types';

interface SavedFilterProps {
  filter: SavedFilterType;
  onDelete: (id: string) => void;
  onSelect: (filter: SavedFilterType) => void;
}

export function SavedFilter({ filter, onDelete, onSelect }: SavedFilterProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md">
      <button
        onClick={() => onSelect(filter)}
        className="text-sm text-gray-700 hover:text-gray-900"
      >
        {filter.name}
      </button>

      <button
        onClick={() => onDelete(filter.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <TrashIcon className="w-4 h-4" />
      </button>

      <input 
        type="radio"
        className="rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
    </div>
  );
}