import { Todo } from "@services/Todo.service";
import axios from "axios";

class TodoApi {
  public async loadTodos(): Promise<Todo[]> {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async loadTodoById(id: number): Promise<Todo> {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async createTodo(body: Todo): Promise<Todo> {
    console.log("api");
    try {
      const { data } = await axios.post(
        `https://jsonplaceholder.typicode.com/todos/`,
        body
      );
      console.log("data :", data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const todoApi = new TodoApi();
