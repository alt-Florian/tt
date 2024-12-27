import { create } from 'zustand';
import { FilterState, SavedFilterType, FilterCondition, FilterLogic } from '@components/ui/table/Filter/types'
import { initialSavedFilters } from './data/savedFilters';
import { FilterDefinition } from '@utils/table/interfaces';
import { FilterConverter } from '@utils/table/FilterConverter';

interface FilterStore {
    currentFilter: FilterState;
    savedFilters: SavedFilterType[];
    setConditions: (conditions: FilterCondition[]) => void;
    setLogic: (logic: FilterLogic) => void;
    addSavedFilter: (filter: SavedFilterType) => void;
    removeSavedFilter: (id: string) => void;
    reset: () => void;
    setInitFilters: (filters: FilterDefinition[]) => void;
}

const initialState: FilterState = {
    conditions: [],
    logic: 'and'
};

const converter = new FilterConverter();


export const useFilterStore = create<FilterStore>((set) => ({
    currentFilter: initialState,
    savedFilters: initialSavedFilters,
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

        set({ savedFilters: [...filterss] });
    },
}));