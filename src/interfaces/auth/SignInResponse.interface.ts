import { FilterDefinition } from "@utils/table/interfaces";

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
    filters: FilterDefinition[];
    token: string;
    refreshToken: string;
    tokenExpireDate: string | null;
  };
}
