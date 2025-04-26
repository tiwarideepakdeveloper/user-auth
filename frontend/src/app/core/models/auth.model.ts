import { User } from "./user.model";

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cnf_password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}