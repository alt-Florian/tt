import { useApi } from "@hooks/api/useApi";


const api = useApi();

class MissionApi {
    public async fetch(
        skip: number,
        display: string[]
    ): Promise<any> {
        try {
            const { data } = await api.post(`/search?skip=${skip}&sort=id`, {
                scope: 2,
                filterSet: [],
                query: [],
                conjonction: null,
                display
            });
            return data;
        } catch (error: any) {
            throw error;
        }
    }
}

export const missionApi = new MissionApi();
