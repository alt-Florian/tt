import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column } from "../EnhancedTable";
import { SortableColumn } from "./SortableColumn";

import { useColumnPreferencesStore } from "@stores/ColumnPreferences.store";
import { enumScope } from "@enums/Filter.enum";
import { Button } from "@components/ui/Button/Button";
import { useState } from "react";

interface ColumnManagerProps {
  isOpen: boolean;
  columns: Column[];
  onColumnChange: (columns: Column[]) => void;
  onClose?: () => void;
}

export function ColumnManager({ isOpen, columns, onColumnChange, onClose }: ColumnManagerProps) {

  const { setColumnPreference } = useColumnPreferencesStore();

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

  const handleApplyDefault = async () => {
    try {
    
      // Sauvegarder dans le store
      setColumnPreference(enumScope.MISSIONS, columns);
      
      // Sauvegarder via l'API
    //  await columnPreferencesService.savePreferences(enumScope.MISSIONS, columns);
      
      // Appliquer les changements localement
      onColumnChange(columns);
      
      // Fermer le modal si nécessaire
      onClose?.();
    } catch (error) {
      console.error('Error applying column preferences:', error);
      // Ici vous pourriez ajouter une notification d'erreur
    } 
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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

        <Button 
          className="w-full mt-4"
          variant="secondary"
          onClick={handleApplyDefault}
         
        >
          Appliquer par défaut
        </Button>
      </div>
    </div>
  );
}