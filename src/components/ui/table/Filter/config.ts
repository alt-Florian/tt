import {  FilterFieldConfig, FilterOperator } from './types';


export const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        id: 'name',
        label: 'Nom de la mission',
        type: 'text'
    },
    {
        id: 'responsible',
        label: 'Responsable',
        type: 'select',
        options: {
            endpoint: 'users',
            valueKey: '_id',
            labelKey: 'name',
            transformResponse: (data) => {
                return data.map((user: any) => ({
                    value: user._id,
                    label: `${user.firstname} ${user.lastname}`
                }));
            }
        }
    },
    {
        id: 'template',
        label: 'Template',
        type: 'select',
        options: {
            endpoint: 'letterTemplates',
            valueKey: '_id',
            labelKey: 'name',
            transformResponse: (data) => {
                return data.map((template: any) => ({
                    value: template._id,
                    label: template.name
                }));
            }
        }
    },
    {
        id: 'status',
        label: 'Statut',
        type: 'select',
        options: [
            { value: 'accepted', label: 'Accepté' },
            { value: 'pending', label: 'En attente' },
            { value: 'rejected', label: 'Refusé' }
        ]
    },
    {
        id: 'urgent',
        label: 'Urgent',
        type: 'boolean'
    }
];

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
    ]
};