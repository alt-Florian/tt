import { userApi } from "@api/User.api";
import {
  UserInterface,
  UserResponse,
  UsersListResponse,
} from "@interfaces/user/User.interface";
import { useUsersListStore } from "@stores/UsersList.store";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";

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

  getCached() {
    const { setUsers, setError, setLoading } = useUsersListStore();
    const STALE_TIME = 5 * 60 * 1000; // 5 minutes

    const { data, isLoading, error } = useQuery<UsersListResponse, any>({
      queryKey: ['usersCached'],
      queryFn: () => userApi.fetchAllUsers(0, []),
      staleTime: STALE_TIME,
      refetchInterval: STALE_TIME
    });


    useEffect(() => {
      if (data?.datas) {
        setUsers(data.datas);
      }
      if (error) {
        setError(error);
      }
      setLoading(isLoading);
    }, [data, error, isLoading, setUsers, setError, setLoading]);

    return {
      users: data?.datas || [],
      isLoading,
      error
    };


  }

}

export const userService = new UserService();
