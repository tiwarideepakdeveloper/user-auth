import { User } from "./user.model";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: User;
}