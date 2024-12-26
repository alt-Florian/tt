import { create } from 'zustand';
import { FilterState, SavedFilterType, FilterCondition, FilterLogic }  from '@components/ui/table/Filter/types'
import { initialSavedFilters } from './data/savedFilters';

interface FilterStore {
    currentFilter: FilterState;
    savedFilters: SavedFilterType[];
    setConditions: (conditions: FilterCondition[]) => void;
    setLogic: (logic: FilterLogic) => void;
    addSavedFilter: (filter: SavedFilterType) => void;
    removeSavedFilter: (id: string) => void;
    reset: () => void;
}

const initialState: FilterState = {
    conditions: [],
    logic: 'and'
};

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
    reset: () => set({ currentFilter: initialState })
}));