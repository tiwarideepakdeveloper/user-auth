import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUser } from './interfaces/create.interface';
import { Role } from 'src/roles/entities/role.entity';
import { SearchUser } from './interfaces/search.interface';
import { UserList } from './interfaces/list.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, 
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>
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

  async create(createUser: CreateUser): Promise<User> {
    
    const existing = await this.userRepo.findOne({ where: { email: createUser.email } });
    if (existing) throw new ConflictException('Email already in use');

    const user = this.userRepo.create(createUser);
    const defaultRole = await this.roleRepo.findOneBy({ name: 'user' });
    
    if (defaultRole) {
      user.roles = [defaultRole];
    }

    try {
        return await this.userRepo.save(user);
    } catch (error) {
        throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email }, relations: ['roles', 'roles.permissions'] });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }
}
