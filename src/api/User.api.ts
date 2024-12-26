import { useApi } from "@hooks/api/useApi";
import {
  UserInterface,
  UserResponse,
  UsersListResponse,
} from "@interfaces/user/User.interface";

const api = useApi();

class UserApi {
  public async fetchAllUsers(
    skip: number,
    display: string[]
  ): Promise<UsersListResponse> {
    try {
      const { data } = await api.post(`/search?skip=${skip}&sort=id`, {
        scope: 3,
        filterSet: [],
        query: [],
        conjonction: null,
        display,
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getUserById(id: number): Promise<UserResponse> {
    try {
      const { data } = await api.get(`/users/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateUser(
    id: number,
    user: Partial<UserInterface>
  ): Promise<UserResponse> {
    try {
      const { data } = await api.post(`/users/${id}/edit`, user);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const userApi = new UserApi();
