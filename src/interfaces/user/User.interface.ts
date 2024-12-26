import { Paginate } from "@interfaces/config/ConfigList.interface";

export interface UserInterface {
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  role: number;
  isActive: boolean;
  password: string;
}

export interface UserWithoutPasswordInterface {
  firstname: string;
  lastname: string;
  email: string;
  role: number;
  isActive: boolean;
}

export interface UserData extends UserWithoutPasswordInterface {
  _id: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
export interface UsersListResponse {
  paginate: Paginate;
  statusCode: number;
  datas: UserData[];
}

export interface UserResponse {
  statusCode: number;
  datas: UserData;
}
