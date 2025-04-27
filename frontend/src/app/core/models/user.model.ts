import { UserType } from "../enums/user.enum";

export interface User {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  token: string;
  user_type: UserType.ADMIN | UserType.TEACHER | UserType.LEARNER | UserType.STAFF;
  user_roles: Role[];
}

export interface Role {
  role_name: string;
  permissions: Permission[];
}

export interface Permission {
  permission_name: string;
}