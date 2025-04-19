import { UserType } from "src/users/enums/user.enum";

export interface UserProfile {
    token: string,
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    user_type: UserType
}