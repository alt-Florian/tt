import { useFilterStore } from "@stores/FilterStore";
import { SavedFilter } from "./SavedFilter";

export function SavedFilters() {
  const { savedFilters } = useFilterStore();

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">VOS FILTRES ENREGISTRÉS</h4>
      <div className="grid grid-cols-1 gap-2">
        {savedFilters.map((filter) => (
          <SavedFilter 
            key={filter.id}
            filter={filter}
          />
        ))}
      </div>
    </div>
  );
}