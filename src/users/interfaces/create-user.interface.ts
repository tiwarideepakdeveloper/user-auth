import { UserRole } from "../entities/user.entity";

export interface CreateUser {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
    role?: UserRole;
}  