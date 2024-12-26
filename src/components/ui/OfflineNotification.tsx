import { useConnectivityStore } from '@stores/Connectivity.store';

export default function OfflineNotification() {
  const { isOnline } = useConnectivityStore();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-50 p-4 rounded-md shadow-lg border border-red-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Connexion internet perdue
            </h3>
            <div className="mt-2 text-sm text-red-700">
              Vérifiez votre connexion internet et réessayez.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}