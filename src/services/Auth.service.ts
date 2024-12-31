import { authApi } from "@api/Auth.api";
import { SignInCredentials } from "@interfaces/auth/SignInCredentials";
import { SignInResponse } from "@interfaces/auth/SignInResponse.interface";
import { UserInterface, UserResponse } from "@interfaces/user/User.interface";
import { useAuthStore } from "@stores/Auth.store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

  public signOut() {
    const { clearAuthState } = useAuthStore();
    const navigate = useNavigate();

    return () => {
      // Clear auth store state
      clearAuthState();

      // Remove items from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");

      // Redirect to signin page
      navigate("/signin", { replace: true });
    };
  }
}

export const authService = new AuthService();
