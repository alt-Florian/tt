import React, { useState, useEffect } from 'react';
import { Button } from "@components/ui/Button/Button";
import { useFilterStore } from "@stores/FilterStore";

interface SaveFilterFormProps {
  onSave: (name: string) => void;

  onUpdate?: (id: string, name: string) => void;
}

export function SaveFilterForm({ onSave,  onUpdate }: SaveFilterFormProps) {
  const { currentFilter, savedFilters } = useFilterStore();
  const [filterName, setFilterName] = useState('');
  const [error, setError] = useState('');
  
  // Find if there's a selected filter by comparing conditions and logic
  const selectedFilter = savedFilters.find(filter => 
    JSON.stringify(filter.conditions) === JSON.stringify(currentFilter.conditions) &&
    filter.logic === currentFilter.logic
  );

  // Update filterName when a filter is selected
  useEffect(() => {
    if (selectedFilter) {
      setFilterName(selectedFilter.name);
    } else {
      setFilterName('');
    }
  }, [selectedFilter, currentFilter.conditions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!filterName.trim()) {
      setError('Le nom du filtre est requis');
      return;
    }

    if (selectedFilter) {
      onUpdate?.(selectedFilter.id, filterName.trim());
    } else {
      onSave(filterName.trim());
    }
    
    setFilterName('');
    setError('');
  };

  return (
    <div className="border-t border-gray-200 pt-4 dark:border-dark-600">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {selectedFilter ? 'MODIFIER CE FILTRE' : 'ENREGISTRER CE FILTRE'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
              setError('');
            }}
            placeholder="Nom du filtre"
            className="flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500
              dark:bg-dark-700 dark:border-dark-600 dark:text-gray-100"
          />
          
        
     

          
          <Button
            type="submit"
            variant="primary"
          >
            {selectedFilter ? 'Modifier' : 'Enregistrer'}
          </Button>
       </div>
                  {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
      </form>
    </div>
  );
}