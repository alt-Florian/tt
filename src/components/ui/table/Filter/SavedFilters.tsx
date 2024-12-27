import { useFilterStore } from "@stores/FilterStore";
import { SavedFilter } from "./SavedFilter";
import { Card, CardBody } from "@components/ui/Card";


export function SavedFilters() {
  const { savedFilters } = useFilterStore();
  console.log("🚀 ~ SavedFilters ~ savedFilters:", savedFilters)




  if (savedFilters.length === 0) return null;

  return (
    <Card>
      <CardBody>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          VOS FILTRES ENREGISTRÉS
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {savedFilters.map((filter) => (
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