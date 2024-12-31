import { PlusIcon } from '@heroicons/react/20/solid';
import { FilterCondition } from './FilterCondition';
import { enumOperator, FilterCondition as FilterConditionType, FilterFieldConfig, FilterLogic, SortOption } from './types';
import { Button } from '@components/ui/Button/Button';
import { SortBuilder } from './SortBuilder';
import { Column } from '../EnhancedTable';

interface FilterBuilderProps {
  conditions: FilterConditionType[];
  logic: FilterLogic;
  sort?: SortOption;  
  onConditionsChange: (conditions: FilterConditionType[]) => void;
  onLogicChange: (logic: FilterLogic) => void;
  onSortChange: (sort: SortOption) => void;
  filters: FilterFieldConfig[]
   columns: Column[];
}

export function FilterBuilder({ 
  conditions, 
  onConditionsChange,
  onLogicChange,
  onSortChange,  
  filters,
  columns,
  sort
}: FilterBuilderProps) {

  const usedFields = conditions.map(c => c.field);
  
  // Vérifier s'il reste des champs disponibles
  const availableFields = filters.filter(field => {
    if (!field.singleUse) return true;
    return !usedFields.includes(field.id);
  });

  const hasAvailableFields = availableFields.length > 0;

  const addCondition = () => {
    onConditionsChange([...conditions, {
      id: Date.now().toString(),
      field: 'name',
      operator:  enumOperator.EQ,
      value: ''
    }]);
  };

  const removeCondition = (id: string) => {
    onConditionsChange(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updatedCondition: FilterConditionType) => {
    onConditionsChange(conditions.map(c => 
      c.id === id ? updatedCondition : c
    ));
  };

  return (
    <div className="space-y-4">
      {conditions.map((condition, index) => (
        <FilterCondition
          key={condition.id}
          filters={filters}
          condition={condition}
          isFirst={index === 0}
          onDelete={() => removeCondition(condition.id)}
          onChange={(updatedCondition) => updateCondition(condition.id, updatedCondition)}
          usedFields={usedFields}
        />
      ))}

      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={addCondition}
            disabled={!hasAvailableFields}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            {conditions.length > 0 ? 'Ajouter une condition' : 'Créer un filtre'}
          </Button>
          
          <SortBuilder 
            columns={columns}
            sort={sort}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
}