import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { ColumnManager } from './ColumnManager/ColumnManager';
import { FilterManager } from './Filter/FilterManager';
import { FilterFieldConfig, FilterState } from './Filter/types';
import { tableHelper } from '@utils/table';



export interface Column {
  id: string;
  label: string;
  visible: boolean;
}

export interface TableProps {
  data: any[] | undefined;
  columns: Column[];
  filters: FilterFieldConfig[];
  onSearch: (query: string) => void;
  onFilter: (filter: FilterState) => void;
  onPaginationChange: (skip: number) => void;
  onColumnChange: (columns: Column[]) => void;
  transformer: typeof tableHelper;
  skip: number;
  count: number;
  take: number;
  path: string;
}

export function EnhancedTable({ 
  data, 
  columns, 
  filters,
  onSearch, 
  onFilter,
  skip,
  onColumnChange,
  count,
  take,
  onPaginationChange,
  transformer,
  path
}: TableProps) {
  

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
            columns={columns}
            filters={filters}
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
          onColumnChange={onColumnChange}
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