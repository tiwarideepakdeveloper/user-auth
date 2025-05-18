import { IsNotEmpty, IsOptional } from "class-validator";
import { CategoryActive } from "../enums/categories.enum";
import { AppConstant } from "src/common/constants/app.constant";

export class SetupDto {
    @IsOptional()
    category_id?: number;
    
    @IsNotEmpty()
    category_identifier: string;

    @IsOptional()
    category_active: CategoryActive = CategoryActive.ACTIVE;
}