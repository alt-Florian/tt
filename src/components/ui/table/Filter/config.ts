import { FilterFieldConfig, FilterOperator } from './types';


export const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        id: 'name',
        label: 'Nom de la mission',
        type: 'text'
    },
    {
        id: 'refLawyer',
        label: 'Responsable',
        type: 'select',
        multiSelect: false, 
        options: {
            endpoint: 'users',
            valueKey: 'id',
            labelKey: 'name',
            transformResponse: (data) => {
                return data.map((user: any) => ({
                    value: user.id,
                    label: `${user.firstname} ${user.lastname}`
                }));
            }
        }
    },
        {
        id: 'collabList',
        label: 'Collaborateur(s)',
        type: 'select',
        multiSelect: true, 
        options: {
            endpoint: 'users',
            valueKey: 'id',
            labelKey: 'name',
            transformResponse: (data) => {
                return data.map((user: any) => ({
                    value: user.id,
                    label: `${user.firstname} ${user.lastname}`
                }));
            }
        }
    },
    {
        id: 'template',
        label: 'Template',
        type: 'select',
        multiSelect: false, // Sélection unique
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
    },
    {
    id: 'startingDate',
    label: 'Date de création',
    type: 'date'  // Add type specification
  },
  {
    id: 'dueDate',
    label: 'Date butoir',
    type: 'date'  // Add type specification
  },
  {
    id: 'customer',
    label: 'Client',
    type: 'async-search',
    options: {
      endpoint: 'customerSearch',
      minChars: 3,
        placeholder: 'Rechercher un client...',
        transformResponse: (data) => {
            return data.map((template: any) => ({
                value: template._id,
                label: template.name
            }));
        }
    }
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
    ],
    date: [
        { label: 'Est le', value: 'equals' },
        { label: "N'est pas le", value: 'not_equals' },
        { label: 'Avant le', value: 'before' },
        { label: 'Après le', value: 'after' },
        { label: 'Entre', value: 'between' }
    ],
    "async-search": [
          { label: 'Est', value: 'equals' },
        { label: "N'est pas", value: 'not_equals' },
    ]
};