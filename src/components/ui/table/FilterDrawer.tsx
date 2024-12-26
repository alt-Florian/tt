import { XMarkIcon } from '@heroicons/react/20/solid';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filtrer les données</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">VOS FILTRES ENREGISTRÉS</h3>
            {/* Add saved filters UI here */}
          </div>

          <div>
            <h3 className="font-medium mb-2">NOUVEAU FILTRE</h3>
            {/* Add new filter UI here */}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                onApply({});
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Appliquer le filtre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};