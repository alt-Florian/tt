import { useApi } from "@hooks/api/useApi";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useEffect } from "react";

export interface SearchResult {
    id: string;
    title: string;
    subtitle?: string;
    category: 'missions' | 'customers' | 'contacts' | 'tasks';
    url: string;
}

interface SearchResponse {
    statusCode: number;
    results: {
        missions?: SearchResult[];
        customers?: SearchResult[];
        contacts?: SearchResult[];
        tasks?: SearchResult[];
    };
}

const api = useApi();

export const searchService = {
    search: (query: string) => {
        return useQuery<SearchResponse>({
            queryKey: ['search', query],
            queryFn:  () => {
                if (!query || query.length < 2) return { statusCode: 200, results: {} };
                //const { data } = await api.get(`/search/global?q=${encodeURIComponent(query)}`);
                
                    return {
                        statusCode: 200,
                        results: {
                            missions: [{
                                id: '123',
                                title: 'blabla',
                                subtitle: 'bliuioudljfklsdfsdf',
                                category: 'missions',
                                url: '/mission/54654sdf'
                            }]
                        }
                    }
                 
               // return data;
            },
            enabled: query.length >= 2,
            staleTime: 30000,
        });
    }
};

export function useSearchShortcut(inputRef: RefObject<HTMLInputElement>) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Vérifie si la combinaison est Ctrl+Space
            if (event.ctrlKey && event.code === 'Space') {
                event.preventDefault(); // Empêche le comportement par défaut

                // Focus sur l'input de recherche
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        // Ajoute l'écouteur d'événement
        window.addEventListener('keydown', handleKeyDown);

        // Nettoie l'écouteur lors du démontage
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputRef]);
}