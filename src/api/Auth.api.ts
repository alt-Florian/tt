import { useApi } from "@hooks/api/useApi";
import { SignInCredentials } from "@interfaces/auth/SignInCredentials";
import { SignInResponse } from "@interfaces/auth/SignInResponse.interface";

import { UserInterface, UserResponse } from "@interfaces/user/User.interface";

const api = useApi();

class AuthApi {
  public async signIn(credentials: SignInCredentials): Promise<SignInResponse> {
    try {
      const { data } = await api.post("/auth/signin", credentials);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async signUp(user: UserInterface): Promise<UserResponse> {
    try {
      const { data } = await api.post("/auth/signup", user);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const authApi = new AuthApi();
