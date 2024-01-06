import { IGovernment } from "./government.interface";

export interface IUser {
  _id: string | any;
  username: string;
  role: UserRole;
  status: UserStatus;
  _governmentId: IGovernment | string | any;
  token?: string;
}

export interface IRegisterApiRequest {
  username: string;
  password: string;
  government: string;
}

export interface IRegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  government: string;
}

export interface ILoginApiRequestAndForm {
  username: string;
  password: string;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
