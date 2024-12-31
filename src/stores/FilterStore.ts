import { create } from 'zustand';
import { FilterState, SavedFilterType, FilterCondition, FilterLogic, SortOption } from '@components/ui/table/Filter/types'
import { FilterDefinition } from '@utils/table/interfaces';
import { FilterConverter } from '@utils/table/FilterConverter';
import { enumScope } from '@enums/Filter.enum';



interface ResolvedValue {
    id: string;
    label: string;
}


interface FilterStore {
    currentFilter: FilterState;
    savedFilters: SavedFilterType[];
    resolvedValues: Record<string, ResolvedValue[]>;
    setConditions: (conditions: FilterCondition[]) => void;
    setLogic: (logic: FilterLogic) => void;
    setSort: (sort: SortOption) => void;
    addSavedFilter: (filter: SavedFilterType) => void;
    removeSavedFilter: (id: string) => void;
    setResolvedValues: (field: string, values: ResolvedValue[]) => void;
    getResolvedValues: (field: string) => ResolvedValue[];
    reset: () => void;
    setInitFilters: (filters: FilterDefinition[]) => void;
    saveFilter: (name: string, scope: enumScope) => Promise<void>;
    updateSavedFilter: (id: string, name: string) => void;
    getByScope: (scope: enumScope) => SavedFilterType[]

}

const initialState: FilterState = {
    conditions: [],
    logic: 'and',
    sort: undefined
};

const converter = new FilterConverter();


export const useFilterStore = create<FilterStore>((set, get) => ({
    currentFilter: initialState,
    savedFilters: [],
    resolvedValues: {},
    setConditions: (conditions) => {

        set((state) => ({
            currentFilter: { ...state.currentFilter, conditions }
        }))
    },
    setLogic: (logic) =>
        set((state) => ({
            currentFilter: { ...state.currentFilter, logic }
        })),
    addSavedFilter: (filter) =>
        set((state) => ({
            savedFilters: [...state.savedFilters, filter]
        })),
    removeSavedFilter: (id) =>
        set((state) => ({
            savedFilters: state.savedFilters.filter(f => f.id !== id)
        })),

    reset: () => set({ currentFilter: initialState }),
    setResolvedValues: (field: string, values: ResolvedValue[]) =>
        set((state) => ({
            resolvedValues: {
                ...state.resolvedValues,
                [field]: values
            }
        })),

    getResolvedValues: (field: string) => {
        return get().resolvedValues[field] || {};
    },

    setInitFilters: (filters: FilterDefinition[]) => {
        console.log("🚀 ~ filters:", filters)
        const filterss = converter.convert(filters);
        console.log("🚀 ~ set ~ filterss:", filterss)

        set({ savedFilters: [...filterss] });
    },
    setSort: (sort) =>
        set((state) => ({
            currentFilter: { ...state.currentFilter, sort }
        })),
    saveFilter: async (name: string, scope: enumScope) => {
        const { currentFilter } = get();
        const newFilter = {
            id: Date.now().toString(),
            name,
            conditions: currentFilter.conditions,
            logic: currentFilter.logic,
            scope
        };

        // Save to API
        // await filterService.saveFilter(newFilter);

        // Update local store
        set((state) => ({
            savedFilters: [...state.savedFilters, newFilter]
        }));
    },
    getByScope: (scope: enumScope) => {
        const { savedFilters } = get();
        return savedFilters.filter((filter) => filter.scope === scope)
    },
    updateSavedFilter: (id: string, name: string) =>
        set((state) => ({
            savedFilters: state.savedFilters.map(filter =>
                filter.id === id
                    ? { ...filter, name }
                    : filter
            )
        }))
}
));