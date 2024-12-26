interface FilterSaverProps {
  onSave: (name: string) => void;
}

export function FilterSaver({ onSave }: FilterSaverProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">ENREGISTRER CE FILTRE</h4>
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nom du filtre"
          className="flex-1 rounded-md border-gray-300 text-sm"
        />
        
        <button
          onClick={() => onSave("Nouveau filtre")}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Enregistrer cette vue
        </button>
      </div>
    </div>
  );
}