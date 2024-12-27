import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { ColumnManager } from './ColumnManager/ColumnManager';
import { FilterManager } from './Filter/FilterManager';
import { FilterState } from './Filter/types';
import { tableHelper } from '@utils/table';



export interface Column {
  id: string;
  label: string;
  visible: boolean;
}

export interface TableProps {
  data: any[] | undefined;
  columns: Column[];
  onSearch: (query: string) => void;
  onFilter: (filter: FilterState) => void;
  onPaginationChange: (skip: number) => void;
  transformer: typeof tableHelper;
  skip: number;
  count: number;
  take: number;
  path: string;

}


export function EnhancedTable({ 
  data, 
  columns: initialColumns, 
  onSearch, 
  onFilter,
  skip,
  count,
  take,
  onPaginationChange,
  transformer,
  path
}: TableProps) {
  
  const [columns, setColumns] = useState<Column[]>(initialColumns);
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
        <div className="relative">
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
      </div>
      
      <TableBody 
        data={data as any[]} 
        columns={columns.filter(col => col.visible)} 
        skip={skip}
        count={count}
        take={take}
        onPaginationChange={onPaginationChange}
        transformer={transformer}
        path={path}
      />
    </div>
  );
}