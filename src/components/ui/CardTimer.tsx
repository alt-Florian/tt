import React from 'react';
import { PlayIcon, PauseIcon, StopIcon, BuildingOfficeIcon } from '@heroicons/react/20/solid';

interface CardTimerProps {
    title: string;
    description: string;
    companyName: string;
    time: string; 
    icon: React.ReactNode;
    onStop: () => void;
    onTogglePause: () => void;
    isPaused: boolean; 
  }
  
  export const CardTimer: React.FC<CardTimerProps> = ({
    title,
    description,
    companyName,
    time,
    icon,
    onStop,
    onTogglePause,
    isPaused,
  }) => {
    return (
      <div className="w-80 h-40 rounded-xl bg-black text-white p-4 flex flex-col justify-between shadow-lg">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">{title}</h4>
          <p className="mt-2 text-sm text-gray-300 line-clamp-2">{description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
              <span className="text-xs">{icon}</span>
            </div>
            <span className="text-xs">{companyName}</span>
          </div>
        </div>
  
        <div className="flex items-center justify-end mt-2 space-x-4">
          <span className="text-2xl font-semibold">{time}</span>
  
          <button
            onClick={onTogglePause}
            className="rounded-full bg-white p-2 flex items-center justify-center"
          >
            {isPaused ? (
              <PlayIcon className="h-5 w-5 text-black" />
            ) : (
              <PauseIcon className="h-5 w-5 text-black" />
            )}
          </button>

          <button
            onClick={onStop}
            className="rounded-full bg-black p-2 border border-white"
          >
            <StopIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    );
  };

interface CardResumeTaskProps {
    onResume: () => void; 
    onClose: () => void; 
}

export const CardResumeTask: React.FC<CardResumeTaskProps> = ({ onResume, onClose }) => {
    return (
        <div className="w-80 h-40 rounded-xl bg-black text-white p-4 flex flex-col justify-center items-center shadow-lg">
            <p className="text-center text-sm font-semibold mb-4">
                Voulez-vous reprendre la tâche précédente ?
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={onResume}
                    className="text-white underline font-medium hover:text-gray-300"
                >
                    Oui, reprendre
                </button>
                <button
                    onClick={onClose}
                    className="text-white underline font-medium hover:text-gray-300"
                >
                    Non, fermer
                </button>
            </div>
        </div>
    );
};

export const CardTimerShow: React.FC = () => {
    return (

        <CardTimer
            title="Tâche en cours"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste modi fugit possimus voluptas reprehenderit autem facilis. Repellendus facere distinctio consequatur eveniet iure est, illo, vitae numquam unde necessitatibus sit ratione?"
            companyName="LITHEK CONSEIL"
            time="05:31"
            icon={<BuildingOfficeIcon className="h-4 w-4 text-white" />}
            onStop={() => { console.log("stop"); } } onTogglePause={function (): void {
                throw new Error('Function not implemented.');
            } } isPaused={false}        />

    );
}
