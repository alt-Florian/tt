export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with';

export type FilterLogic = 'and' | 'or';

export type FilterFieldType = 'text' | 'select' | 'boolean' | 'number'

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

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: { label: string; value: string }[];
}