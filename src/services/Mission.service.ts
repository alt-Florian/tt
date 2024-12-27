import { missionApi } from "@api/Mission.api";
import { MissionDataInterface, MissionsDataInterface } from "@interfaces/mission/Mission.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

class MissionService {

    public getMissionById(id: string): UseQueryResult<MissionDataInterface, Error> {
        return useQuery<MissionDataInterface, Error>({
            queryKey: [`mission/${id}`],
            queryFn: () => missionApi.loadMissionById(id),
            staleTime: 0,
        });
    }

        get(skip: number) {
            return useQuery<MissionsDataInterface, Error>({
                queryKey: [`getMission-${skip}`, skip],
                queryFn: () => missionApi.fetch(skip, []),
                staleTime: 0,
            });
    
        }
}

export const missionService = new MissionService();
