import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { UserType } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  
  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ 
    type: 'enum', 
    enum: UserType, 
    default: UserType.LEARNER 
  })
  user_type: UserType;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_has_roles' })
  roles: Role[];
}