import { Request } from "express";

export interface AuthDataStoredInToken {
  id: string;
  username: string;
  role: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestUser extends Request {
  user?: AuthDataStoredInToken;
}
