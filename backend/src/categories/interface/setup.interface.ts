import { CategoryActive } from "../enums/categories.enum";

export interface CategorySetup {
    category_id?: number;

    category_identifier: string;

    category_active: CategoryActive
}