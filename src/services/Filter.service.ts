// src/components/ui/table/Filter/hooks/useFilterOptions.ts
import { useQuery, } from '@tanstack/react-query';
import { DynamicSelectConfig } from '@ui/table/Filter/types';
import { userService } from '@services/User.service';
import { letterTemplateService } from '@services/config/LetterTemplate.service';

const apiEndpoints: Record<string, any> = {
    users: () => userService.getAllUsers(0, ['id', 'firstname', 'lastname']),
    letterTemplates: () => letterTemplateService.getAllLetterTemplates()
};

export function useFilterOptions(config: DynamicSelectConfig) {
    const { endpoint, transformResponse } = config;

    const query = useQuery({
        queryKey: [`filterOptions-${endpoint}`],
        queryFn: () => {
            const fetchFn = apiEndpoints[endpoint];
            if (!fetchFn) {
                throw new Error(`No API endpoint configured for ${endpoint}`);
            }
            return fetchFn();
        },
        select: (data) => {
            if (!data?.datas) return [];
            return transformResponse ? transformResponse(data.datas) : [];
        }
    });

    return {
        options: query.data || [],
        isLoading: query.isLoading,
        error: query.error
    };
}
