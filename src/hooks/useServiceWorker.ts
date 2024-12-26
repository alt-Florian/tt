import { useConnectivityStore } from '@stores/Connectivity.store';
import { useEffect } from 'react';


export function useServiceWorker() {
    const { setIsOnline } = useConnectivityStore();

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.log('Service Worker registered');
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'CONNECTIVITY_STATUS') {
                    setIsOnline(event.data.payload.isOnline);
                }
            });
        }
    }, [setIsOnline]);
}