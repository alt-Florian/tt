import { TrashIcon } from '@heroicons/react/20/solid';
import { FilterCondition as FilterConditionType } from './types';
import { FILTER_FIELDS, FILTER_OPERATORS } from './config';

interface FilterConditionProps {
  condition: FilterConditionType;
  isFirst: boolean;
  onDelete: () => void;
  onChange: (condition: FilterConditionType) => void;
}

export function FilterCondition({
  condition,
  isFirst,
  onDelete,
  onChange
}: FilterConditionProps) {
  const field = FILTER_FIELDS.find(f => f.id === condition.field);
  const operators = field ? FILTER_OPERATORS[field.type] : [];

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-sm font-medium text-gray-700 min-w-[60px]">
        {isFirst ? 'Lorsque' : 'Et'}
      </span>

      <select 
        value={condition.field}
        onChange={(e) => onChange({ ...condition, field: e.target.value })}
        className="rounded-md border-gray-300 text-sm min-w-[150px]"
      >
        {FILTER_FIELDS.map(field => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <select 
        value={condition.operator}
        onChange={(e) => onChange({ ...condition, operator: e.target.value as FilterConditionType['operator'] })}
        className="rounded-md border-gray-300 text-sm min-w-[120px]"
      >
        {operators.map(op => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {field?.type === 'select' && field.options ? (
        <select
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          className="rounded-md border-gray-300 text-sm flex-1 min-w-[120px]"
        >
          {field.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          className="rounded-md border-gray-300 text-sm flex-1 min-w-[120px]"
          placeholder="Valeur"
        />
      )}

      <div className="flex-shrink-0">
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50"
          title="Supprimer la condition"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}