import { userApi } from "@api/User.api";
import {
  UserInterface,
  UserResponse,
  UsersListResponse,
} from "@interfaces/user/User.interface";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

class UserService {
  public getAllUsers(
    skip: number,
    display: string[]
  ): UseQueryResult<UsersListResponse, any> {
    return useQuery<UsersListResponse, any>({
      queryKey: ["users"],
      queryFn: () => userApi.fetchAllUsers(skip, display),
      staleTime: 0,
    });
  }

  public getUserById(id: number): UseQueryResult<UserResponse, any> {
    return useQuery<UserResponse, any>({
      queryKey: [`user/${id}`],
      queryFn: () => userApi.getUserById(id),
      staleTime: 0,
    });
  }

  public updateUser(): UseMutationResult<
    UserResponse,
    any,
    { id: number; newUser: Partial<UserInterface> }
  > {
    return useMutation<
      UserResponse,
      any,
      { id: number; newUser: Partial<UserInterface> }
    >({
      mutationFn: ({ id, newUser }) => userApi.updateUser(id, newUser),
    });
  }
}

export const userService = new UserService();
