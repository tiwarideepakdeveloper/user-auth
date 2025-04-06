import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUser } from './interfaces/create-user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUser: CreateUser): Promise<User> {
    
    const existing = await this.userRepo.findOne({ where: { email: createUser.email } });
    if (existing) throw new ConflictException('Email already in use');

    const user = this.userRepo.create(createUser);
    try {
        return await this.userRepo.save(user);
    } catch (error) {
        throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }
}
