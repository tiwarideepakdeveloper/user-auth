import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_permissions')
export class TblPermission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({ unique: true })
  permission_name: string;
}