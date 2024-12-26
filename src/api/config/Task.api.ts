import { useApi } from "@hooks/api/useApi";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Task, TaskResponse } from "@interfaces/config/Task.interface";

const api = useApi();
const letter_template_api_path = "/config-mission/tasks";

class TaskApi {
  public async createTask(task: Task): Promise<TaskResponse> {
    try {
      const { data } = await api.post(`${letter_template_api_path}`, task);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllTasks(): Promise<ConfigResponse> {
    try {
      const { data } = await api.get(`${letter_template_api_path}?limit=0`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getTaskById(id: string): Promise<TaskResponse> {
    try {
      const { data } = await api.get(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateTask(
    id: string,
    task: Partial<Task>
  ): Promise<TaskResponse> {
    try {
      const { data } = await api.post(
        `${letter_template_api_path}/${id}`,
        task
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteTask(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const taskApi = new TaskApi();
