export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with';

export type FilterLogic = 'and' | 'or';

export interface FilterField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'boolean' | 'date';
  options?: { value: string; label: string }[];
}

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