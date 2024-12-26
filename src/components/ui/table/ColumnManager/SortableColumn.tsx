import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Column } from "../EnhancedTable";

interface SortableColumnProps {
  column: Column;
  onToggleVisibility: () => void;
}

export function SortableColumn({ column, onToggleVisibility }: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200"
    >
      <div className="flex items-center gap-2">
        <button 
          className="cursor-grab hover:text-gray-700 text-gray-400"
          {...attributes}
          {...listeners}
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
        <span className="text-sm">{column.label}</span>
      </div>
      
      <button 
        onClick={onToggleVisibility}
        className="text-gray-400 hover:text-gray-700"
      >
        {column.visible ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <EyeSlashIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}