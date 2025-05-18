import { TblCategory } from "../entities/category.entity";

export interface CategoryList {
    categories: TblCategory[],
    page: number,
    limit: number,
    recordCount: number
}