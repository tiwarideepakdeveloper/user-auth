import { TblUser } from "../entities/user.entity";

export interface UserList {
    users: TblUser[],
    page: number,
    limit: number,
    recordCount: number
}