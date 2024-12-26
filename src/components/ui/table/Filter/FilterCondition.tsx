import { TrashIcon } from '@heroicons/react/20/solid';
import { FilterCondition as FilterConditionType, FilterOperator } from './Types';
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
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">
        {isFirst ? 'Où' : 'Et'}
      </span>

      <select 
        value={condition.field}
        onChange={(e) => onChange({ ...condition, field: e.target.value })}
        className="rounded-md border-gray-300 text-sm"
      >
        {FILTER_FIELDS.map(field => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <select 
  value={condition.operator}
  onChange={(e) => {
    const operator = e.target.value as FilterOperator;
    onChange({ ...condition, operator });
  }}
  className="rounded-md border-gray-300 text-sm"
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
          className="rounded-md border-gray-300 text-sm flex-1"
        >
          {field.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field?.type === 'boolean' ? (
        <select
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value === 'true' })}
          className="rounded-md border-gray-300 text-sm flex-1"
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      ) : (
        <input
          type="text"
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          className="rounded-md border-gray-300 text-sm flex-1"
        />
      )}

      <button
        onClick={onDelete}
        className="p-1 text-gray-400 hover:text-gray-600"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}