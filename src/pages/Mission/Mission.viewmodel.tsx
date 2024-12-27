import { useEffect } from "react";
import { missionService } from "@services/Mission.service";
import { useMissionStore } from "@stores/Mission.store";

export function MissionViewModel() {

  const { initializeBlocks } = useMissionStore();
  const queryMission = missionService.getMissionById("5");
  const { data: dataMission, isLoading: isLoadingMission, isError: isErrorMission } = queryMission;

  useEffect(() => {
    if (dataMission?.datas?.blocks) {
      initializeBlocks(dataMission.datas.blocks);
    }
  }, [dataMission, initializeBlocks]);

  return {
    dataMission,
    isLoadingMission,
    isErrorMission,
  };
}
