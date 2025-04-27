import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TblUser } from './entities/user.entity';
import { CreateUser } from './interfaces/create.interface';
import { TblRole } from 'src/roles/entities/role.entity';
import { SearchUser } from './interfaces/search.interface';
import { UserList } from './interfaces/list.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TblUser) private userRepo: Repository<TblUser>, 
    @InjectRepository(TblRole) private readonly roleRepo: Repository<TblRole>
  ) {}

  async list(searchUser : SearchUser): Promise<UserList> {
    let findAndCountParam : any = {
      skip: (searchUser.page - 1) * searchUser.limit,
      take: searchUser.limit,
      order: { id: 'DESC' },
    };
    if(searchUser.keyword){
      findAndCountParam['where'] = [
        {email : Like(`%${searchUser.keyword}%`)},
        {first_name: Like(`%${searchUser.keyword}%`)},
        {last_name: Like(`%${searchUser.keyword}%`)},
      ];
    }
    const [users, total] = await this.userRepo.findAndCount(findAndCountParam);
    return {
      users,
      page: searchUser.page,
      limit: searchUser.limit,
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
}
