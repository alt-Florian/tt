import { SavedFilterType } from "@components/ui/table/Filter/types";


export const initialSavedFilters: SavedFilterType[] = [
    {
        id: "1",
        name: "Lettres de missions urgentes de Mathieu",
        conditions: [
            {
                id: "1",
                field: "responsible",
                operator: "equals",
                value: "mathieu"
            },
            {
                id: "2",
                field: "urgent",
                operator: "equals",
                value: true
            }
        ],
        logic: "and"
    },
    {
        id: "2",
        name: "Lettres de missions non acceptées",
        conditions: [
            {
                id: "1",
                field: "status",
                operator: "equals",
                value: "pending"
            }
        ],
        logic: "and"
    },
    {
        id: "3",
        name: "Missions à traiter en priorité",
        conditions: [
            {
                id: "1",
                field: "status",
                operator: "equals",
                value: "pending"
            },
            {
                id: "2",
                field: "urgent",
                operator: "equals",
                value: true
            }
        ],
        logic: "and"
    }
];