import React, { useState } from "react";
import { MissionBlockTaskInterface } from "@interfaces/mission/Mission.interface";
import { useMissionStore } from "@stores/Mission.store";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { MissionTaskItem } from "@components/Mission/MissionTaskItem";

interface MissionTasksProps {
    blockId: string;
}

export const MissionTasks: React.FC<MissionTasksProps> = ({ blockId }) => {
    const { blocks } = useMissionStore();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    const block = blocks.find((b) => b._id === blockId);

    if (!block) { return null; }

    const completedTasks: MissionBlockTaskInterface[] = block.tasks.filter((task: MissionBlockTaskInterface) => task.done);
    const activeTasks: MissionBlockTaskInterface[] = block.tasks.filter((task: MissionBlockTaskInterface) => !task.done);

    return (
        <section className="border border-gray-200 rounded-md">

            <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-3 px-4">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">{block.title}</h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                        {`${block.userId.firstname} ${block.userId.lastname}`}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700">{block.b_progress}%</span>
                        <div className="w-20 bg-gray-200 h-2 rounded-full relative overflow-hidden">
                            <div
                                className="bg-green-500 h-2 absolute left-0 top-0"
                                style={{ width: `${block.b_progress}%` }}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 text-gray-600 hover:text-gray-900"
                        aria-label={
                            isOpen
                                ? "Replier les détails des tâches"
                                : "Déplier les détails des tâches"
                        }
                    >
                        {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="bg-white p-4 text-sm text-gray-700 space-y-6">
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowCompleted(!showCompleted)}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            {showCompleted
                                ? `Masquer les ${completedTasks.length} tâches terminées`
                                : `Afficher les ${completedTasks.length} tâches terminées`}
                        </button>

                    </div>

                    {showCompleted &&
                        completedTasks.map((task: MissionBlockTaskInterface, index: number) => (
                            <MissionTaskItem key={index} task={task} blockId={blockId} />
                        ))}

                    {activeTasks.map((task: MissionBlockTaskInterface, index: number) => (
                        <MissionTaskItem key={index} task={task} blockId={blockId} />
                    ))}
                </div>
            )}
        </section>
    );
};