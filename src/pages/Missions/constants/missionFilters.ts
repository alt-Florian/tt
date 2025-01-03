import { FilterFieldConfig } from "@components/ui/table/Filter/types";

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
        singleUse: true,
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
        id: 'usersWorkingOn',
        label: 'Utilisateur(s) affecté(s)',
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
        id: 'letterTemplate',
        label: 'Template',
        type: 'select',
        multiSelect: false,
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
        id: 'urgent',
        label: 'Urgent',
        type: 'boolean'
    },
    {
        id: 'startingDate',
        label: 'Date de création',
        type: 'date'
    },
    {
        id: 'dueDate',
        label: 'Date butoir',
        type: 'date'
    },
    {
        id: 'customer',
        label: 'Client',
        type: 'select',
        multiSelect: true,
        options: {
            endpoint: 'customerSearch',
            searchable: true,
            minChars: 3,
            transformResponse: (data) => {
                return data.map((customer: any) => ({
                    value: customer._id,
                    label: `${customer.name} ${(customer?.row_infos?.firstname || '')}`
                }));
            }
        }
    },
    {
        id: 'refId',
        label: 'Référent client',
        type: 'select',
        multiSelect: true,
        options: {
            endpoint: 'customerSearch',
            searchable: true,
            minChars: 3,
            transformResponse: (data) => {
                return data.map((customer: any) => ({
                    value: customer._id,
                    label: `${customer.name} ${(customer?.row_infos?.firstname || '')}`
                }));
            }
        }
    },
    {
        id: 'm_progress',
        label: 'Progression',
        type: 'number'
    },
    {
        id: 'bProgressRange',
        label: 'Block progression rang',
        type: 'number'
    },
    {
        id: 'bProgress',
        label: 'Block progression',
        type: 'boolean'
    },
    {
        id: 'createdAt',
        label: 'Crée le',
        type: 'date'
    },
    {
        id: 'updatedAt',
        label: 'Mise à jour le',
        type: 'date'
    },
];