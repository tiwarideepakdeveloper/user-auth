import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblRole } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { TblPermission } from './entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(TblRole)
    private readonly roleRepo: Repository<TblRole>,
    @InjectRepository(TblPermission)
    private readonly permissionRepo: Repository<TblPermission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<TblRole> {
    const permissions = await this.permissionRepo.findByIds(createRoleDto.permissionIds);

    if (permissions.length === 0) {
      throw new NotFoundException('Permissions not found');
    }

    const role = this.roleRepo.create({
      role_name: createRoleDto.name,
      permissions,
    });

    return this.roleRepo.save(role);
  }

  async findAllPermissions(): Promise<TblPermission[]> {
    return await this.permissionRepo.find();
  }
}
