export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'before' | 'after' | 'between' | 'greater_than' | 'less_than_equal' | 'greater_than_equal' | 'less_than';

export type FilterLogic = 'and' | 'or';

export type FilterFieldType = 'text' | 'select' | 'boolean' | 'number' | 'date';

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | number | Array<string | number> | boolean | Date | null;
  endDate?: Date | null; // For 'between' date operator
  endValue?: string | number | Date | null; // Added for range operations
}

export interface SavedFilterType {
  id: string;
  name: string;
  conditions: FilterCondition[];
  logic: FilterLogic;
}

export interface FilterState {
  conditions: FilterCondition[];
  logic: FilterLogic;
}

export interface SelectOption {
  value: string;
  label: string;
}

// Configuration for DynamicSelect component
export interface DynamicSelectConfig {
  endpoint: string;
  valueKey?: string;
  labelKey?: string;
  transformResponse?: (data: any) => SelectOption[];
  multiSelect?: boolean;
  searchable?: boolean;
  minChars?: number;
}

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: SelectOption[] | DynamicSelectConfig ;
  multiSelect?: boolean;
  singleUse?: boolean; 
}