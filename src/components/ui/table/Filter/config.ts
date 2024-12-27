import { FilterOperator } from './types';


export const FILTER_OPERATORS: Record<string, { label: string; value: FilterOperator }[]> = {
    text: [
        { label: 'Est', value: 'equals' },
        { label: "N'est pas", value: 'not_equals' },
        { label: 'Contient', value: 'contains' },
        { label: 'Ne contient pas', value: 'not_contains' },
        { label: 'Commence par', value: 'starts_with' },
        { label: 'Termine par', value: 'ends_with' }
    ],
    select: [
        { label: 'Est', value: 'equals' },
        { label: "N'est pas", value: 'not_equals' }
    ],
    boolean: [
        { label: 'Est', value: 'equals' },
        { label: "N'est pas", value: 'not_equals' }
    ],
    date: [
        { label: 'Est le', value: 'equals' },
        { label: "N'est pas le", value: 'not_equals' },
        { label: 'Avant le', value: 'before' },
        { label: 'Après le', value: 'after' },
        { label: 'Entre', value: 'between' }
    ],
    number: [
        { label: 'Est égal à', value: 'equals' },
        { label: "N'est pas égal à", value: 'not_equals' },
        { label: 'Est supérieur à', value: 'greater_than' },
        { label: 'Est supérieur ou égal à', value: 'greater_than_equal' },
        { label: 'Est inférieur à', value: 'less_than' },
        { label: 'Est inférieur ou égal à', value: 'less_than_equal' },
        { label: 'Est entre', value: 'between' }
    ]
};