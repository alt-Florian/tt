import { create } from 'zustand';

interface ConnectivityState {
    isOnline: boolean;
    setIsOnline: (status: boolean) => void;
}

export const useConnectivityStore = create<ConnectivityState>((set) => ({
    isOnline: navigator.onLine,
    setIsOnline: (isOnline) => set({ isOnline }),
}));