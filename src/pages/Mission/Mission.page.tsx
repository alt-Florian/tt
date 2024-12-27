import { MissionViewModel } from "./Mission.viewmodel";
import { MissionBlockInterface } from "@interfaces/mission/Mission.interface";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/20/solid";

import { Breadcrumb, BreadcrumbPage } from "@components/ui/Breadcrumbs";
import { MissionHeader } from "@components/Mission/MissionHeader";
import { MissionProgression } from "@components/Mission/MissionProgression";
import { MissionCustomerDetail } from "@components/Mission/MissionCustomerDetail";
import { MissionHistorical } from "@components/Mission/MissionHistorical";
import { MissionTasks } from "@components/Mission/MissionTask";

export default function MissionPage() {

    const { dataMission: missionData, isLoadingMission, isErrorMission } = MissionViewModel();

    const pages: BreadcrumbPage[] = [
        { name: "Missions", href: "/missions", current: false },
        { name: missionData ? missionData.datas.name : "", href: `/missions/${missionData?.datas._id}`, current: true },
    ];

    return (
        <>
            {isLoadingMission && <div>Chargement...</div>}
            {isErrorMission && <div>Erreur...</div>}
            {missionData && (
                <>

                    <div className="mb-4">
                        <Breadcrumb pages={pages} />
                    </div>

                    <MissionHeader
                        missionName={missionData.datas.name}
                        subtitleData={[
                            {
                                icon: <BuildingOfficeIcon className="h-5 w-5 text-gray-600" />,
                                text: missionData.datas.customer[0].type === "1" && missionData.datas.customer[0].row_infos.civilities
                                    ? `${missionData.datas.customer[0].row_infos.civilities === 1 ? "M." : missionData.datas.customer[0].row_infos.civilities === 2 ? "Mme" : ""} ${missionData.datas.customer[0].name}`
                                    : missionData.datas.customer[0].name || "Nom non disponible", // Valeur par défaut si le nom est undefined
                            },
                            {
                                icon: <UserIcon className="h-5 w-5 text-gray-600" />,
                                text: `Responsable : ${missionData.datas.refLawyer[0]?.firstname || "Prénom"} ${missionData.datas.refLawyer[0]?.lastname || "Nom"}`, // Valeur par défaut pour firstname/lastname
                            },
                        ]}
                        badgeText="En cours"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="col-span-1 space-y-6">
                            <MissionProgression
                                initialValidationDate={missionData.datas.dueDate}
                                initialTemplateName={missionData.datas.letterTemplate.name}
                            />

                            <MissionCustomerDetail
                                customer={missionData.datas.customer[0]}

                            />

                            <MissionHistorical activities={missionData.datas.activity} />
                        </div>

                        <div className="col-span-1 lg:col-span-2 space-y-6">
                            {missionData.datas.blocks.map((block: MissionBlockInterface, index: number) => (
                                <MissionTasks key={index} blockId={block._id} />
                            ))}
                        </div>

                    </div>
                </>
            )}
        </>
    );
}
