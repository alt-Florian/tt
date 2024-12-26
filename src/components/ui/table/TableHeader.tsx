import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

interface TableHeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  onColumnManagerClick: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onSearch, onFilterClick, onColumnManagerClick }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex-1 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une mission"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
        >
          <FunnelIcon className="h-5 w-5" />
          Filtrer les données
        </button>
        
        <button
          onClick={onColumnManagerClick}
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
        >
          <Squares2X2Icon className="h-5 w-5" />
          Gérer l'affichage
        </button>
      </div>
    </div>
  );
};