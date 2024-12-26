import { useSortable } from "@dnd-kit/sortable";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface SortableTaskProps {
  id: number;
  text: string;
  handleRemoveTask: () => void;
}
export default function SortableTask({
  id,
  text,
  handleRemoveTask,
}: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex justify-between text-sm py-4 border-b border-gray-300 cursor-grab"
    >
      <div className="flex items-center" {...listeners}>
        <Bars3Icon className="size-5 mr-4 text-gray-400 flex-shrink-0" />
        <p>{text}</p>
      </div>
      <XMarkIcon
        className="size-5 ml-4 cursor-pointer flex-shrink-0"
        onClick={handleRemoveTask}
      />
    </div>
  );
}
