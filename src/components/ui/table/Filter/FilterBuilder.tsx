import { PlusIcon } from '@heroicons/react/20/solid';
import { FilterCondition } from './FilterCondition';
import { FilterCondition as FilterConditionType, FilterLogic } from './Types';

interface FilterBuilderProps {
  conditions: FilterConditionType[];
  logic: FilterLogic;
  onConditionsChange: (conditions: FilterConditionType[]) => void;
  onLogicChange: (logic: FilterLogic) => void;
}

export function FilterBuilder({ 
  conditions, 
  logic,
  onConditionsChange,
  onLogicChange 
}: FilterBuilderProps) {
  const addCondition = () => {
    onConditionsChange([...conditions, {
      id: Date.now().toString(),
      field: 'name',
      operator: 'equals',
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
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Logique:</span>
        <select
          value={logic}
          onChange={(e) => onLogicChange(e.target.value as FilterLogic)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="and">ET</option>
          <option value="or">OU</option>
        </select>
      </div>

      {conditions.map((condition, index) => (
        <FilterCondition
          key={condition.id}
          condition={condition}
          isFirst={index === 0}
          onDelete={() => removeCondition(condition.id)}
          onChange={(updatedCondition) => updateCondition(condition.id, updatedCondition)}
        />
      ))}

      <div className="flex justify-between">
        <button
          onClick={addCondition}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Ajouter une condition
        </button>

        <button
          onClick={() => onConditionsChange([])}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}