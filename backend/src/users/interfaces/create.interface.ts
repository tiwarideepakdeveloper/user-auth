import { Role } from "src/roles/entities/role.entity";

export interface CreateUser {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
    roles?: Role[];
}  