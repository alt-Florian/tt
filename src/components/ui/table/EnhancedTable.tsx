import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { ColumnManager } from './ColumnManager/ColumnManager';
import { FilterManager } from './Filter/FilterManager';
import { FilterState } from './Filter/Types';


export interface Column {
  id: string;
  label: string;
  visible: boolean;
}

export interface TableProps {
  data: any[];
  columns: Column[];
  onSearch: (query: string) => void;
  onFilter: (filter: FilterState) => void;
}

export function EnhancedTable({ 
  data, 
  columns: initialColumns, 
  onSearch, 
  onFilter 
}: TableProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative">
        <TableHeader 
          onSearch={onSearch}
          onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
          onColumnManagerClick={() => setIsColumnManagerOpen(!isColumnManagerOpen)}
        />
        
        {/* Filter Manager */}
        <FilterManager
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(filter) => {
            onFilter(filter);
            setIsFilterOpen(false);
          }}
        />

        {/* Column Manager */}
        <ColumnManager 
          isOpen={isColumnManagerOpen}
          columns={columns}
          onColumnChange={setColumns}
        />
      </div>
      
      <TableBody 
        data={data} 
        columns={columns.filter(col => col.visible)} 
      />
    </div>
  );
}