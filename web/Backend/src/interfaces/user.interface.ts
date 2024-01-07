import { NextFunction, Request, Response } from "express";
import { IGovernment } from "./government.interface";

export interface IUser {
  _id: string | any;
  username: string;
  hashPassword?: string;
  role: UserRole;
  status: UserStatus;
  _governmentId: IGovernment | string | any;
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
