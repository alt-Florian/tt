import { useFilterStore } from "@stores/FilterStore";
import { SavedFilter } from "./SavedFilter";
import { Card, CardBody } from "@components/ui/Card";
import { FilterConverter } from "@utils/table/FilterConverter";
import { FilterDefinition } from "@utils/table/interfaces";
import { enumScope } from "@enums/Filter.enum";
import { SavedFilterType } from "./types";



interface SavedFiltersProps {
  scope: enumScope;
}

export function SavedFilters({scope}: SavedFiltersProps) {
  const { getByScope } = useFilterStore();
  console.log("🚀 ~ SavedFilters ~ savedFilters:", getByScope)



  if (getByScope.length === 0) return null;

  return (
    <Card>
      <CardBody>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          VOS FILTRES ENREGISTRÉS
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {getByScope(scope).map((filter: SavedFilterType) => (
            <SavedFilter 
              key={filter.id}
              filter={filter}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}