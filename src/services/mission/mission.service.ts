import { missionApi } from "@api/mission";
import {
    useQuery,
} from "@tanstack/react-query";

class MissionService {

    get(skip: number) {
        return useQuery<any, any>({
            queryKey: [`getMission-${skip}`, skip],
            queryFn: () => missionApi.fetch(skip, []),
            staleTime: 0,
        });

    }

}
export const missionService = new MissionService();
