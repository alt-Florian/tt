import { TrashIcon } from '@heroicons/react/20/solid';
import { enumOperator, FilterCondition as FilterConditionType, FilterFieldConfig } from './types';
import { FILTER_OPERATORS } from './config';
import { DynamicSelect } from './components/DynamicSelect';
import { DateInput } from './components/DateInput';
import { memo } from 'react';
import MultiSelectV2 from '@components/ui/MultiSelectV2';
import Select from '@components/ui/Select';
import { BooleanInput } from './components/BooleanInput';
import { NumberInput } from './components/NumberInput';

interface FilterConditionProps {
  condition: FilterConditionType;
  filters: FilterFieldConfig[];
  isFirst: boolean;
  onDelete: () => void;
  onChange: (condition: FilterConditionType) => void;
  usedFields: string[]
}

export const FilterCondition = memo(function FilterCondition({
  condition,
  filters,
  isFirst,
  onDelete,
  onChange,
  usedFields 
}: FilterConditionProps) {
  const field = filters.find(f => f.id === condition.field);
  const operators = field ? FILTER_OPERATORS[field.type] : [];
  
  const availableFields = filters.filter(field => {
    if (!field.singleUse) return true;
    return !usedFields.includes(field.id) || field.id === condition.field;
  });
  
  const renderValueInput = () => {
    if (!field) return null;

    switch (field.type as string) {
      case 'select':
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
        };
      case 'date': 
        return (
        <DateInput
          value={condition.value as Date}
          onChange={(date) => onChange({ ...condition, value: date })}
          isBetween={condition.operator ===  enumOperator.BETWEEN}
          onEndDateChange={condition.operator ===  enumOperator.BETWEEN ? 
            (date) => onChange({ ...condition, endDate: date }) : 
            undefined}
          endDate={condition.endDate as Date}
        />
        );
      case 'boolean': 
        return (
        <BooleanInput
          value={condition.value as boolean}
          onChange={(value) => onChange({ ...condition, value })}
        />
        );
       case 'number':
        return (
        <NumberInput
          value={condition.value as number}
          onChange={(value) => onChange({ ...condition, value })}
          isBetween={condition.operator ===  enumOperator.BETWEEN}
          onEndValueChange={condition.operator ===  enumOperator.BETWEEN ? 
            (value) => onChange({ ...condition, endValue: value }) : 
            undefined}
          endValue={condition.endValue as number}
        />
      );
      default: 
        return (
      <input
        type="text"
        value={condition.value as string}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
        className="rounded-md border-gray-300 text-sm min-w-[150px]"
        placeholder="Valeur"
      />
    );
    }


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
        {availableFields.map(field => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <select 
        value={condition.operator}
        onChange={(e) => onChange({ 
          ...condition, 
          operator: e.target.value as unknown as FilterConditionType['operator'],
          endValue: e.target.value ===  enumOperator.BETWEEN.toString() ? condition.endValue : undefined 
        })}
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
});