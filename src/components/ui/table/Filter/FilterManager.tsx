import { useFilterStore } from "@stores/FilterStore";
import { FilterFieldConfig, FilterState } from "./types";
import { Card, CardHeader, CardBody } from "@components/ui/Card";

import { FilterBuilder } from "./FilterBuilder";
import { Button } from "@components/ui/Button/Button";
import { Column } from "../EnhancedTable";
import { SaveFilterForm } from './SaveFilterForm';
import { useState } from "react";
import { SavedFilters } from "./SavedFilters";

interface FilterManagerProps {
  isOpen: boolean;
  filters: FilterFieldConfig[];
  columns: Column[];
  onApply: (filter: FilterState) => void;
  onClose: () => void;
}

export function FilterManager({ isOpen,filters,columns, onApply, onClose }: FilterManagerProps) {
  
  const { 
   currentFilter,
    setConditions,
    setLogic,
    setSort,
    reset,
    addSavedFilter,
    updateSavedFilter
  } = useFilterStore();

  if (!isOpen) return null;

  const handleSaveFilter = async (name: string) => {
    // Generate a unique ID for the saved filter
    const newFilter = {
      id: Date.now().toString(),
      name,
      conditions: currentFilter.conditions,
      logic: currentFilter.logic
    };

    // Add to store
    addSavedFilter(newFilter);
    
    // TODO: Add API call here
    // await filterService.saveFilter(newFilter);
    
  
  };

    const handleUpdateFilter = async (id: string, name: string) => {
    // Update the filter in store
    updateSavedFilter(id, name);
    
    // TODO: Add API call here
    // await filterService.updateFilter(id, { name, ...currentFilter });
    
  };

  return (
    <div className="absolute left-0 mt-2 w-[800px] bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-dark-600 z-50">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Filtrer les données
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </CardHeader>

        <CardBody className="space-y-6">
          {/* Saved Filters */}
          <SavedFilters />

          {/* Filter Builder */}
          <FilterBuilder 
            conditions={currentFilter.conditions}
            logic={currentFilter.logic}
            sort={currentFilter.sort}
            onConditionsChange={setConditions}
            onLogicChange={setLogic}
            onSortChange={setSort}
            filters={filters}
            columns={columns}
          />

           {/* Save Filter Form */}
         
            <SaveFilterForm 
              onSave={handleSaveFilter}
              onUpdate={handleUpdateFilter}
            />
          

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-dark-600">
            <Button 
              variant="secondary"
              onClick={reset}
            >
              Réinitialiser
            </Button>


            
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={onClose}
              >
                Annuler
              </Button>
              
              <Button
                variant="primary"
                onClick={() => {
                  onApply(currentFilter);
                  onClose();
                }}
              >
                Appliquer le filtre
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}