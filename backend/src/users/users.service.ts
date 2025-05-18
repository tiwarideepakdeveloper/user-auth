import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { TblUser } from './entities/user.entity';
import { CreateUser } from './interfaces/create.interface';
import { TblRole } from 'src/roles/entities/role.entity';
import { UserSearch } from './interfaces/search.interface';
import { UserList } from './interfaces/list.interface';
import { UserSetup } from './interfaces/setup.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TblUser) private userRepo: Repository<TblUser>, 
    @InjectRepository(TblRole) private readonly roleRepo: Repository<TblRole>
  ) {}

  async getRows(userSearch : UserSearch): Promise<UserList> {
    let findAndCountParam : any = {
      skip: (userSearch.page - 1) * userSearch.limit,
      take: userSearch.limit,
      order: { id: 'DESC' },
    };

    if(userSearch.keyword){
      findAndCountParam['where'] = [
        {email : Like(`%${userSearch.keyword}%`)},
        {first_name: Like(`%${userSearch.keyword}%`)},
        {last_name: Like(`%${userSearch.keyword}%`)},
      ];
    }

    const [users, total] = await this.userRepo.findAndCount(findAndCountParam);
    
    return {
      users,
      page: userSearch.page,
      limit: userSearch.limit,
      recordCount: total
    };
  }

  async create(createUser: CreateUser): Promise<TblUser> {
    
    const existing = await this.userRepo.findOne({ where: { user_email: createUser.user_email } });
    if (existing) throw new ConflictException('Email already in use');

    const user = this.userRepo.create(createUser);
    const defaultRole = await this.roleRepo.findOne({ where: { role_name: 'user' }, relations: ['permissions'] });
    
    if (defaultRole) {
      user.user_roles = [defaultRole];
    }

    try {
        return await this.userRepo.save(user);
    } catch (error) {
        throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(user_email: string): Promise<TblUser> {
    const user = await this.userRepo.findOne({ where: { user_email }, relations: ['user_roles', 'user_roles.permissions'] });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async findById(user_id: number): Promise<TblUser> {
    const user = await this.userRepo.findOne({ where: { user_id } });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async setup(setupUser: UserSetup): Promise<TblUser> {
    let user: TblUser | null = null; 
  
    if (setupUser.user_id) {
      user = await this.userRepo.findOneBy({ user_id: setupUser.user_id });
      if (!user)  throw new ConflictException('INVALID REQUEST');
    } else {
      user = this.userRepo.create();
    }
  
    const { user_role_ids } = setupUser;
  
    if (user_role_ids?.length) {
      const roles = await this.roleRepo.find({
        where: { role_id: In(user_role_ids) },
        relations: ['permissions'],
      });
      user.user_roles = roles;
    }
    Object.assign(user, setupUser);
    return await this.userRepo.save(user);
  }
  
}
