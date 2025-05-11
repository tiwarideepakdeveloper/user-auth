import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../enums/user.enum";
import { Transform } from "class-transformer";
import { TblRole } from "src/roles/entities/role.entity";

export class UserSetupDto {
    @IsOptional()
    user_id?: number

    @IsNotEmpty()
    user_first_name: string

    @IsOptional()
    user_last_name: string

    @IsEmail()
    user_email: string

    @IsOptional()
    @IsEnum(UserType)
    user_type: UserType

    @IsOptional()
    user_role_ids: number []
}