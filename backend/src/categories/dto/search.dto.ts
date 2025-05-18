import { IsOptional } from "class-validator";
import { CategoryActive } from "../enums/categories.enum";
import { AppConstant } from "src/common/constants/app.constant";

export class SearchDto {
    @IsOptional()
    keyword?: string;
    
    @IsOptional()
    active?: CategoryActive;

    @IsOptional()
    limit: number = AppConstant.PAGE_SIZE;

    @IsOptional()
    page: number = 1;
}