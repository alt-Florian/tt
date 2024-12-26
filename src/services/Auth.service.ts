import { authApi } from "@api/Auth.api";
import { SignInCredentials } from "@interfaces/auth/SignInCredentials";
import { SignInResponse } from "@interfaces/auth/SignInResponse.interface";
import { UserInterface, UserResponse } from "@interfaces/user/User.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

class AuthService {
  public signIn(): UseMutationResult<SignInResponse, any, SignInCredentials> {
    return useMutation<SignInResponse, any, SignInCredentials>({
      mutationFn: (credentials: SignInCredentials) =>
        authApi.signIn(credentials),
    });
  }

  public signUp(): UseMutationResult<UserResponse, any, UserInterface> {
    return useMutation<UserResponse, any, UserInterface>({
      mutationFn: (user: UserInterface) => authApi.signUp(user),
    });
  }
}

export const authService = new AuthService();
