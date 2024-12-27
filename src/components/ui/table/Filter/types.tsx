export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'before' | 'after' | 'between';

export type FilterLogic = 'and' | 'or';

export type FilterFieldType = 'text' | 'select' | 'boolean' | 'number' | 'date' | 'async-search';

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Date | null;
  endDate?: Date | null; // For 'between' date operator
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

// Base configuration for dynamic data fetching
interface BaseConfig {
  endpoint: string;
  valueKey?: string;
  labelKey?: string;
  transformResponse?: (data: any) => SelectOption[];
}

// Configuration for DynamicSelect component
export interface DynamicSelectConfig extends BaseConfig {
  multiSelect?: boolean;
}

// Configuration for AsyncSearchInput component
export interface AsyncSearchConfig extends BaseConfig {
  minChars?: number;
  placeholder?: string;
}

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: SelectOption[] | DynamicSelectConfig | AsyncSearchConfig;
  multiSelect?: boolean;
}