import { User } from "./user.model";

export interface SignInRequest {
  user_email: string;
  user_password: string;
}

export interface SignUpRequest {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_password: string;
  user_cnf_password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}