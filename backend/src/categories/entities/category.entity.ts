import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryActive } from "../enums/categories.enum";

@Entity()
export class TblCategory {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({
        type: "varchar",
        length: 20
    })
    category_identifier: string

    @Column({
        type: 'enum',
        enum: CategoryActive
    })
    category_active: CategoryActive
}