export interface IUser {
  _id: string;
  username: string;
  government: string;
  role: UserRole;
  status: UserStatus;
  token: string;
}

export interface ILoginApiRequestAndForm {
    username: string;
    password: string;
}

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
  }
  
  export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
  }