import { TrashIcon } from '@heroicons/react/20/solid';
import { FilterCondition as FilterConditionType } from './types';
import { FILTER_FIELDS } from './config';
import { FILTER_OPERATORS } from './config';
import { DynamicSelect } from './components/DynamicSelect';
import { DateInput } from './components/DateInput';
import { memo } from 'react';
import MultiSelectV2 from '@components/ui/MultiSelectV2';
import Select from '@components/ui/Select';
import { BooleanInput } from './components/BooleanInput';
import { AsyncSearchInput }  from './components/AsyncSearchInput';

interface FilterConditionProps {
  condition: FilterConditionType;
  isFirst: boolean;
  onDelete: () => void;
  onChange: (condition: FilterConditionType) => void;
}

export const FilterCondition = memo(function FilterCondition({
  condition,
  isFirst,
  onDelete,
  onChange
}: FilterConditionProps) {
  const field = FILTER_FIELDS.find(f => f.id === condition.field);
  const operators = field ? FILTER_OPERATORS[field.type] : [];


  const renderValueInput = () => {
    if (!field) return null;

    if (field.type === 'select') {
      if (typeof field.options === 'object' && 'endpoint' in field.options) {
        return (
          <DynamicSelect
            config={field.options}
            value={condition.value as string}
            onChange={(value) => onChange({ ...condition, value })}
            multiSelect={field.multiSelect}
          />
        );
      } else if (Array.isArray(field.options)) {
       return field.multiSelect ? (
        <MultiSelectV2
          list={field.options.map(opt => ({ id: opt.value, name: opt.label }))}
          values={Array.isArray(condition.value) ? condition.value : []}
          onChange={(value) => onChange({ ...condition, value })}
          className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
          label=''
        />
      ) : (
        <Select
          list={field.options.map(opt => ({ id: opt.value, name: opt.label }))}
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
        />
      );
      }
    }

    if (field.type === 'date') {
      return (
        <DateInput
          value={condition.value as Date}
          onChange={(date) => onChange({ ...condition, value: date })}
          isBetween={condition.operator === 'between'}
          onEndDateChange={condition.operator === 'between' ? 
            (date) => onChange({ ...condition, endDate: date }) : 
            undefined}
          endDate={condition.endDate as Date}
        />
      );
}

if (field.type === 'boolean') {
  return (
    <BooleanInput
      value={condition.value as boolean}
      onChange={(value) => onChange({ ...condition, value })}
    />
  );
}
if (field.type === 'async-search' && 'endpoint' in field?.options) {
  return (
    <AsyncSearchInput
     
      endpoint={field.options.endpoint}
      minChars={field.options.minChars}
      value={condition.value as string}
      onChange={(value) => onChange({ ...condition, value })}
      placeholder={field.options.placeholder}
    />
  );
}

    return (
      <input
        type="text"
        value={condition.value as string}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
        className="rounded-md border-gray-300 text-sm min-w-[150px]"
        placeholder="Valeur"
      />
    );
  };



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

       {renderValueInput()}

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
})