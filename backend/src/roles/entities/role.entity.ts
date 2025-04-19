import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
  import { Permission } from './permission.entity';
  
@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @ManyToMany(() => Permission)
    @JoinTable({ name: 'role_permissions' })
    permissions: Permission[];
}
  