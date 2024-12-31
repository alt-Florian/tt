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

    get(skip: number, sort: string = '') {
        return useQuery<MissionsDataInterface, Error>({
            queryKey: [`getMission-${skip}-${sort}`, skip, sort],
            queryFn: () => missionApi.fetch(skip, ['name', 'customer', 'refLawyer', 'm_progress', 'letterTemplate', 'collabList', 'startingDate', 'dueDate', 'billing', 'usersWorkingOn', 'bProgressRange', 'createdAt', 'updatedAt'], sort),
            staleTime: 0,
        });

    }
}

export const missionService = new MissionService();
