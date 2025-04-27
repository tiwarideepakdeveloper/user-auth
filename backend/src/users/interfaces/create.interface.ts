import { TblRole } from "src/roles/entities/role.entity";

export interface CreateUser {
    user_email: string;
    user_password: string;
    user_first_name: string;
    user_last_name?: string;
    roles?: TblRole[];
}  