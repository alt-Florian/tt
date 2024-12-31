import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchResult } from '@services/Search.service';

export interface SearchHistoryEntry {
    id: string;
    query: string;
    timestamp: number;
    category?: SearchResult['category'];
    resultSelected?: string;
}

interface SearchHistoryState {
    history: SearchHistoryEntry[];
    addToHistory: (query: string, result: SearchResult) => void;
    clearHistory: () => void;
    removeFromHistory: (id: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
    persist(
        (set) => ({
            history: [],

            addToHistory: (query: string, result: SearchResult) => {
                const newEntry: SearchHistoryEntry = {
                    id: crypto.randomUUID(),
                    query,
                    timestamp: Date.now(),
                    category: result.category,
                    resultSelected: result.title
                };

                set((state) => ({
                    history: [
                        newEntry,
                        // Filtrer les entrées similaires pour éviter les doublons
                        ...state.history.filter(
                            entry => entry.query !== query || entry.resultSelected !== result.title
                        )
                    ].slice(0, 20) // Garder uniquement les 20 dernières entrées
                }));
            },

            clearHistory: () => set({ history: [] }),

            removeFromHistory: (id: string) =>
                set((state) => ({
                    history: state.history.filter(entry => entry.id !== id)
                }))
        }),
        {
            name: 'search-history-storage',
            version: 1
        }
    )
);