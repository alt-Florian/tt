import React from "react";
import dayjs from "dayjs";

import { useMissionStore } from "@stores/Mission.store";
import { ProgressBar } from "@components/ui/ProgressBar";

export interface MissionProgressionProps {
    initialValidationDate: string;
    initialTemplateName: string;
}

export const MissionProgression: React.FC<MissionProgressionProps> = ({ initialValidationDate, initialTemplateName }) => {
    const globalProgress = useMissionStore((state) => state.globalProgress); 

    return (
        <section className="bg-white rounded-md shadow p-4">

            <div className="flex flex-col mb-5">
                <span className="text-xs text-gray-400 mb-2">PROGRESSION</span>
                <ProgressBar progress={globalProgress} />
            </div>

            <div className="flex flex-col mb-5">
                <span className="text-xs text-gray-400">DATE DE VALIDATION CLIENT</span>
                <span className="text-md text-gray-700">{dayjs(initialValidationDate).format("DD/MM/YYYY")}</span>
            </div>

            <div className="flex flex-col mb-5">
                <div className="text-xs text-gray-400">TEMPLATE DE MISSION</div>
                <div className="text-md text-gray-700">{initialTemplateName}</div>
            </div>
        </section>
    );
};