import { TblRole } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { UserType } from '../enums/user.enum';

@Entity()
export class TblUser {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_first_name: string;
  
  @Column()
  user_last_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column()
  user_password: string;

  @Column({ 
    type: 'enum', 
    enum: UserType, 
    default: UserType.LEARNER 
  })
  user_type: UserType;
    
  @ManyToMany(() => TblRole)
  @JoinTable({
    name: 'tbl_user_has_roles',
    joinColumn: {
      name: 'ushsrl_user_id',
      referencedColumnName: 'user_id'
    },
    inverseJoinColumn: {
      name: 'ushsrl_role_id',
      referencedColumnName: 'role_id'
    },
  })
  user_roles: TblRole[];
}