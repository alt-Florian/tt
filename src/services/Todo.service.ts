import { todoApi } from "@api/Todo.api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

class TodoService {
  public getListTodos(): UseQueryResult<Todo[], Error> {
    return useQuery<Todo[], Error>({
      queryKey: ["todos"],
      queryFn: () => todoApi.loadTodos(),
      staleTime: 0,
    });
  }

  public getTodoById(id: number): UseQueryResult<Todo, Error> {
    return useQuery<Todo, Error>({
      queryKey: [`todos/${id}`],
      queryFn: () => todoApi.loadTodoById(id),
      staleTime: 0,
    });
  }

  public addTodo(): UseMutationResult<Todo, Error, Todo> {
    return useMutation<Todo, Error, Todo>({
      mutationFn: (newTodo: Todo) => todoApi.createTodo(newTodo),
    });
  }
}

export const todoService = new TodoService();
