import React from "react";
import {
    CheckCircleIcon,
    PlayIcon,
    PauseIcon,
    ClockIcon,
    UserIcon,
    PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { Badge } from "@components/ui/Badge";
import { useMissionStore } from "@stores/Mission.store";
import { MissionBlockTaskInterface } from "@interfaces/mission/Mission.interface";

export interface TaskItemProps {
    task: MissionBlockTaskInterface;
    blockId: string;
}

export const MissionTaskItem: React.FC<TaskItemProps> = ({ task, blockId }) => {
    const {
        toggleTask,
        currentTask,
        startTaskTimer,
        togglePauseTimer,
    } = useMissionStore();

    const isCurrentTask = currentTask?.taskId === task._id;
    const isPaused = isCurrentTask ? currentTask.isPaused : false;

    const handleToggle = () => {
        if (isCurrentTask && !isPaused) {
            alert(
                "Impossible de valider la tâche si elle est encore en cours !\n" +
                "Veuillez la mettre en pause ou la stopper d’abord."
            );
            return;
        }
        toggleTask(blockId, task._id);
    };

    const handlePlay = () => {
        startTaskTimer(blockId, task._id);
    };

    const handleTogglePause = () => {
        togglePauseTimer();
    };

    const isOtherTaskInProgress = currentTask !== null && currentTask.taskId !== task._id;

    function msToHHMMSS(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
        ].join(":");
    }

    return (
        <div
            className={`flex items-center justify-between gap-4 border-b pb-4 ${isOtherTaskInProgress
                    ? "pointer-events-none text-gray-400 opacity-60"
                    : ""
                }`}
        >
            <div className="flex items-center gap-2 flex-1">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={task.done}
                    onChange={handleToggle}
                />
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{task.name}</span>
                        <span className="ml-2 text-xs text-gray-400">
                            <Badge text="GENERAL" />
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-1 text-gray-500">
                        <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4" />
                        </div>

                        {task.taskTimer && (
                            <div className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                <span className="text-xs">
                                    {msToHHMMSS(task.taskTimer.totalTimer)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-1 hover:text-gray-700" aria-label="Voir les détails">
                    <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                </button>

                {task.done ? (
                    <CheckCircleIcon
                        className="h-6 w-6 text-green-500 border border-green-500 rounded-full"
                        aria-label="Tâche terminée"
                    />
                ) : isCurrentTask ? (
                    <button
                        onClick={handleTogglePause}
                        className="rounded-full bg-black p-1 flex items-center justify-center"
                        aria-label={isPaused ? "Reprendre la tâche" : "Mettre en pause la tâche"}
                    >
                        {isPaused ? (
                            <PlayIcon className="h-5 w-5 text-white" />
                        ) : (
                            <PauseIcon className="h-5 w-5 text-white" />
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handlePlay}
                        className="rounded-full bg-black p-1 flex items-center justify-center"
                        aria-label="Démarrer la tâche"
                    >
                        <PlayIcon className="h-5 w-5 text-white" />
                    </button>
                )}
            </div>
        </div>
    );
};