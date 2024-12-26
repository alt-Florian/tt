import { taskApi } from "@api/config/Task.api";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Task, TaskResponse } from "@interfaces/config/Task.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class TaskService {
  public createTask(): UseMutationResult<TaskResponse, any, Task> {
    return useMutation<TaskResponse, any, Task>({
      mutationFn: (task: Task) => taskApi.createTask(task),
    });
  }

  public getAllTasks(): UseQueryResult<ConfigResponse, any> {
    return useQuery<ConfigResponse, any>({
      queryKey: ["tasks"],
      queryFn: () => taskApi.getAllTasks(),
      staleTime: 0,
    });
  }

  public getTaskById(id: string): UseQueryResult<TaskResponse, any> {
    return useQuery<TaskResponse, any>({
      queryKey: [`task/${id}`],
      queryFn: () => taskApi.getTaskById(id),
      staleTime: 0,
    });
  }

  public updateTask(): UseMutationResult<
    TaskResponse,
    any,
    { id: string; newTask: Partial<Task> }
  > {
    return useMutation<
      TaskResponse,
      any,
      { id: string; newTask: Partial<Task> }
    >({
      mutationFn: ({ id, newTask }) => taskApi.updateTask(id, newTask),
    });
  }

  public deleteTask(): UseMutationResult<DeleteResponse, any, string> {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => taskApi.deleteTask(id),
    });
  }
}

export const taskService = new TaskService();
