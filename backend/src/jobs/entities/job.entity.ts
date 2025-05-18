import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TblJob {
    @PrimaryGeneratedColumn()
    job_id: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    job_title: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
    job_description: string;

    job_category: []
}