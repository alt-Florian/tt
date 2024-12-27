import React from "react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Badge } from "@components/ui/Badge";

export interface SubTitleItem {
    icon: React.ReactElement;
    text: string;
}

export interface MissionHeaderProps {
    missionName: string;
    subtitleData: SubTitleItem[];
    badgeText: string;
}

export const MissionHeader: React.FC<MissionHeaderProps> = ({ missionName, subtitleData, badgeText }) => {
    return (
        <header className="flex justify-between mb-8">
            <div className="flex items-center gap-4">
                <UserCircleIcon className="size-16 text-gray-900" />
                <div>
                    <h1 className="font-semibold text-3xl lg:text-4xl">{missionName}</h1>
                    <div className="text-sm text-gray-500 mt-2">
                        <span className="font-medium flex items-center gap-2">
                            {subtitleData.map((item: SubTitleItem, index: number) => (
                                <span key={index} className="flex items-center gap-1">
                                    {item.icon}
                                    {item.text}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
                <div className="self-start mt-2">
                    <Badge text={badgeText} />
                </div>
            </div>
        </header>
    );
};