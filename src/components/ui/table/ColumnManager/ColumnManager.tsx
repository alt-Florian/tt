import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column } from "../EnhancedTable";
import { SortableColumn } from "./SortableColumn";


interface ColumnManagerProps {
  isOpen: boolean;
  columns: Column[];
  onColumnChange: (columns: Column[]) => void;
}

export function ColumnManager({ isOpen, columns, onColumnChange }: ColumnManagerProps) {
  if (!isOpen) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((col) => col.id === active.id);
    const newIndex = columns.findIndex((col) => col.id === over.id);

    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(oldIndex, 1);
    newColumns.splice(newIndex, 0, movedColumn);

    onColumnChange(newColumns);
  };

  const toggleVisibility = (columnId: string) => {
    const newColumns = columns.map((col) => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    onColumnChange(newColumns);
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Gérer l'affichage</h3>
        <div className="text-sm font-medium text-gray-700 mb-2">COLONNES</div>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columns} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {columns.map((column) => (
                <SortableColumn 
                  key={column.id}
                  column={column}
                  onToggleVisibility={() => toggleVisibility(column.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button 
          className="w-full mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => onColumnChange(columns)}
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}