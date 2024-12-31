import { create } from 'zustand';
import { FilterState, SavedFilterType, FilterCondition, FilterLogic, SortOption } from '@components/ui/table/Filter/types'
import { FilterDefinition } from '@utils/table/interfaces';
import { FilterConverter } from '@utils/table/FilterConverter';

interface FilterStore {
    currentFilter: FilterState;
    savedFilters: SavedFilterType[];
    setConditions: (conditions: FilterCondition[]) => void;
    setLogic: (logic: FilterLogic) => void;
    setSort: (sort: SortOption) => void;    
    addSavedFilter: (filter: SavedFilterType) => void;
    removeSavedFilter: (id: string) => void;
    reset: () => void;
    setInitFilters: (filters: FilterDefinition[]) => void;
    saveFilter: (name: string) => Promise<void>;
    updateSavedFilter: (id: string, name: string) => void;
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
    setConditions: (conditions) =>
        set((state) => ({
            currentFilter: { ...state.currentFilter, conditions }
        })),
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

    setInitFilters: (filters: FilterDefinition[]) => {
        const filterss = converter.convert(filters);
        console.log("🚀 ~ set ~ filterss:", filterss)

       // set({ savedFilters: [...filterss] });
    },
    setSort: (sort) =>
        set((state) => ({
            currentFilter: { ...state.currentFilter, sort }
        })),
    saveFilter: async (name: string) => {
        const { currentFilter } = get();
        const newFilter = {
            id: Date.now().toString(),
            name,
            conditions: currentFilter.conditions,
            logic: currentFilter.logic
        };

        // Save to API
       // await filterService.saveFilter(newFilter);

        // Update local store
        set((state) => ({
            savedFilters: [...state.savedFilters, newFilter]
        }));
    },
    updateSavedFilter: (id: string, name: string) =>
        set((state) => ({
            savedFilters: state.savedFilters.map(filter =>
                filter.id === id
                    ? { ...filter, name }
                    : filter
            )
        }))}
));