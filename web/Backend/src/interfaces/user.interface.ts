import { NextFunction, Request, Response } from "express";

export interface IUser {
  _id?: string;
  username: string;
  hashPassword?: string;
  government: string;
  role: UserRole;
  status: UserStatus;
}

export interface RequestAndUser extends Request {
  user?: IUser;
}

export interface ResponseAndUser extends Response {
  user?: IUser;
}

export interface NextFunctionAndUser extends NextFunction {
  user?: IUser;
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
