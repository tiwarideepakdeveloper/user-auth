import { User } from "../entities/user.entity";

export interface UserList {
    users: User[],
    page: number,
    limit: number,
    recordCount: number
}