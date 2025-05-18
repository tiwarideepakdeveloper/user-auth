import { CategoryActive } from "../enums/categories.enum";

export interface CategorySearch {
    keyword?: string;
    active?: CategoryActive;
    limit: number;
    page: number;
}