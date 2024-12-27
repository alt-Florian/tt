import React, { useState } from "react";
import dayjs from "dayjs";

import { MissionActivityItemInterface } from "@interfaces/mission/Mission.interface";

export interface MissionHistoricalProps {
    activities: MissionActivityItemInterface[];
}

export const MissionHistorical: React.FC<MissionHistoricalProps> = ({ activities }) => {
    const [visibleCount, setVisibleCount] = useState<number>(3);

    const canShowMore = visibleCount < activities.length;
    const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

    const showMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <section className="border border-gray-200 rounded-md">
            <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
                <h3 className="font-semibold text-gray-800">Historique</h3>
            </div>

            <div className="bg-white p-4">
                <ul role="list" className="space-y-6">
                    {activities.slice(0, visibleCount).map((activityItem, activityIdx) => (
                        <li key={activityIdx} className="relative flex gap-x-4">
    
                            <div
                                className={classNames(
                                    activityIdx === activities.slice(0, visibleCount).length - 1
                                        ? "h-6"
                                        : "-bottom-6",
                                    "absolute left-0 top-0 flex w-6 justify-center"
                                )}
                            >
                                <div className="w-px bg-gray-200" />
                            </div>

                            <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                                <span className="h-2 w-2 rounded-full bg-white border border-gray-400"></span>
                            </div>

                            <div className="flex-auto flex justify-between">
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-900">
                                        {activityItem.userId
                                            ? `${activityItem.userId.firstname} ${activityItem.userId.lastname} `
                                            : "Utilisateur inconnu"}
                                    </span>
                                    <span className="font-medium">{activityItem.action}</span>
                                    <span className="font-medium">{activityItem.table}</span>.
                                </p>

                                <time dateTime={activityItem.date} className="text-xs text-gray-400">
                                    {dayjs(activityItem.date).format("DD/MM/YYYY")}
                                </time>
                            </div>
                        </li>
                    ))}
                </ul>

                {canShowMore && (
                    <button
                        onClick={showMore}
                        className="mt-4 text-sm font-semibold text-indigo-600 hover:underline"
                        type="button"
                    >
                        Afficher plus
                    </button>
                )}
            </div>
        </section>
    );
};