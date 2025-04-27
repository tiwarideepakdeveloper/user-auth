import { UserType } from "src/users/enums/user.enum";

export interface UserProfile {
    token: string,
    user_id: string,
    user_first_name: string,
    user_last_name: string,
    user_email: string,
    user_type: UserType
}