import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const permissions = await this.permissionRepo.findByIds(createRoleDto.permissionIds);

    if (permissions.length === 0) {
      throw new NotFoundException('Permissions not found');
    }

    const role = this.roleRepo.create({
      name: createRoleDto.name,
      permissions,
    });

    return this.roleRepo.save(role);
  }

  async findAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepo.find();
  }
}
