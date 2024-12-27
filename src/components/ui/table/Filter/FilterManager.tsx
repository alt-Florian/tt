import { useFilterStore } from "@stores/FilterStore";
import { FilterState } from "./types";
import { FilterBuilder } from "./FilterBuilder";
import { FilterSaver } from "./FilterSaver";
import { SavedFilters } from "./SavedFilters";


interface FilterManagerProps {
  isOpen: boolean;
  onApply: (filter: FilterState) => void;
  onClose: () => void;
}

export function FilterManager({ isOpen, onApply, onClose }: FilterManagerProps) {
  const { 
    currentFilter,
    savedFilters,
    setConditions,
    setLogic,
    addSavedFilter,
    removeSavedFilter,
    reset
  } = useFilterStore();

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 mt-2 w-[800px] max-h-[80vh] overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-6">Filtrer les données</h3>
        
        
        {/* Saved Filters */}
   <SavedFilters />

        {/* Filter Builder */}
        <FilterBuilder 
          conditions={currentFilter.conditions}
          logic={currentFilter.logic}
          onConditionsChange={setConditions}
          onLogicChange={setLogic}
        />

        {/* Filter Saver */}
        <FilterSaver 
          onSave={(name) => {
            addSavedFilter({
              id: Date.now().toString(),
              name,
              conditions: currentFilter.conditions,
              logic: currentFilter.logic
            });
          }}
        />

        {/* Actions */}
 <div className="flex justify-between mt-6">
          <button
            onClick={reset}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Réinitialiser
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                onApply(currentFilter);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              Appliquer le filtre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}