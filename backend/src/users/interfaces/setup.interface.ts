import { TblRole } from "src/roles/entities/role.entity";
import { UserType } from "../enums/user.enum";

export class UserSetup {
    user_id?: number;
    user_first_name: string;
    user_last_name?: string;
    user_email: string;
    user_type: UserType;
    user_role_ids: number [];
}