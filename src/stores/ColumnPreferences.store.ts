import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Column } from '@components/ui/table/EnhancedTable';

interface ColumnPreference {
    columns: Column[];
}

interface ColumnPreferencesState {
    preferences: Record<number, ColumnPreference>;
    setColumnPreference: (scope: number, columns: Column[]) => void;
    getColumnPreference: (scope: number, defaultColumns: Column[]) => Column[];
    clearPreferences: () => void;
}

export const useColumnPreferencesStore = create<ColumnPreferencesState>()(
    persist(
        (set, get) => ({
            preferences: {},

            setColumnPreference: (scope: number, columns: Column[]) => {
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        [scope]: { columns }
                    }
                }));
            },

            getColumnPreference: (scope: number, defaultColumns: Column[]) => {
                const preference = get().preferences[scope];
                return preference ? preference.columns : defaultColumns;
            },

            clearPreferences: () => {
                set({ preferences: {} });
            }
        }),
        {
            name: 'column-preferences-storage'
        }
    )
);