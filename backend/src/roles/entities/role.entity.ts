import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
  import { TblPermission } from './permission.entity';
  
@Entity('tbl_roles')
export class TblRole {
    @PrimaryGeneratedColumn()
    role_id: number;
  
    @Column({ unique: true })
    role_name: string;
  
    @ManyToMany(() => TblPermission)
    @JoinTable({ 
      name: 'tbl_role_permissions',
      joinColumn: {
        name: 'rlpm_role_id',
        referencedColumnName: 'role_id'
      },
      inverseJoinColumn: {
        name: 'rlpm_permission_id',
        referencedColumnName: 'permission_id'
      }
    })
    permissions: TblPermission[];
}
  