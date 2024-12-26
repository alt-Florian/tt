import { Filter } from "@interfaces/auth/Filter.interface";

export interface SignInResponse {
  statusCode: number;
  datas: {
    user: {
      _id: string;
      email: string;
      firstname: string;
      lastname: string;
      isActive: boolean;
      role: number;
      id: number;
      createdAt: string; // ISO Date format
      updatedAt: string; // ISO Date format
    };
    filters: Filter[];
    token: string;
    refreshToken: string;
    tokenExpireDate: string | null;
  };
}
