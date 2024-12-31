import { Column } from '../EnhancedTable';
import { SortOption } from './types';

interface SortBuilderProps {
  columns: Column[];
  sort?: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortBuilder({ columns, sort, onSortChange }: SortBuilderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Trier par</span>
      <select
        value={sort?.field || ''}
        onChange={(e) => onSortChange({ 
          field: e.target.value,
          direction: sort?.direction || 'asc'
        })}
        className="rounded-md border-gray-300 text-sm min-w-[150px]"
      >
        <option value="">Sélectionner un champ</option>
        {columns.map(column => (
          <option key={column.id} value={column.id}>
            {column.label}
          </option>
        ))}
      </select>
      
      {sort?.field && (
        <select
          value={sort.direction}
          onChange={(e) => onSortChange({ 
            ...sort,
            direction: e.target.value as 'asc' | 'desc'
          })}
          className="rounded-md border-gray-300 text-sm min-w-[120px]"
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      )}
    </div>
  );
}
