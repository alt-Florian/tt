export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with'  | 'before' | 'after'  | 'between';  

export type FilterLogic = 'and' | 'or';

export type FilterFieldType = 'text' | 'select' | 'boolean' | 'number' | 'date' | 'async-search';

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | number | boolean;
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

export interface DynamicSelectConfig {
  endpoint: string;
  valueKey?: string;
  labelKey?: string;
  transformResponse?: (data: any) => SelectOption[];
}

export interface AsyncSearchConfig {
  endpoint: string;
  minChars?: number;
  placeholder?: string;
   transformResponse?: (data: any) => SelectOption[];
}

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: SelectOption[] | DynamicSelectConfig | AsyncSearchConfig;
  multiSelect?: boolean; 
}