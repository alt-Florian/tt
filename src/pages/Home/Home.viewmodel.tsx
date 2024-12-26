import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { Todo, todoService } from "@services/Todo.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";

export function HomeViewModel() {
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  // Requête pour récuperer les todos
  const queryTodo = todoService.getTodoById(5);
  const { data, isLoading, isError } = queryTodo;

  // Requête pour créer une todo
  const mutation = todoService.addTodo();

  const createTodo = (newTodo: Todo) => {
    mutation.mutate(newTodo, {
      onError: () => {
        showDialogBox({
          title: "Erreur Réseau",
          content: "Probleme avec l'envoi de la requète",
          icon: <CheckCircleIcon className="h-6 w-6 text-red-400" />,
          onClick: hideDialogBox,
        });
      },
      onSuccess: () => {
        showDialogBox({
          title: "Message envoyé",
          content: "La todo a bien été créée",
          icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
          onClick: hideDialogBox,
        });
      },
    });
  };

  return {
    todos: data,
    isLoadingTodo: isLoading,
    isErrorTodo: isError,
    createTodo,
  };
}
