import { enumScope } from "@enums/Filter.enum";



export type FilterLogic = 'and' | 'or';

export type FilterFieldType = 'text' | 'select' | 'boolean' | 'number' | 'date';

export enum enumOperator {
    CONTAIN, // verifier champ > tableau ou string > $regex
    DOES_NOT_CONTAIN,//String
    CAN_CONTAIN,
    CANNOT_CONTAIN,
    HAS_ANY,
    HAS_ALL_OF,
    HAS_NONE_OF,
    EQ,
    NE,
    GT,
    GTE,
    LT,
  LTE,
    BETWEEN
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: enumOperator;
  value: string | number | Array<string | number> | boolean | Date | null;
  endDate?: Date | null; 
  endValue?: string | number | Date | null;
}

export interface SavedFilterType {
  id: string;
  name: string;
  conditions: FilterCondition[];
  logic: FilterLogic;
  scope: enumScope;
}

export interface FilterState {
  conditions: FilterCondition[];
  logic: FilterLogic;
  sort?: SortOption; 
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

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}