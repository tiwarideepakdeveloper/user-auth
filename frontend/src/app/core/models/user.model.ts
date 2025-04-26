import { UserType } from "../enums/user.enum";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  user_type: UserType.ADMIN | UserType.TEACHER | UserType.LEARNER | UserType.STAFF;
  roles: Role[];
}

export interface Permissions {
  name: string
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
}