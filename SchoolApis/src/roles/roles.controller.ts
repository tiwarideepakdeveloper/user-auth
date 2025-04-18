import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleAndPermissionSeed } from './roles.seed';
import { ApiResponse } from 'src/common/response/response.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService, private readonly roleSeed: RoleAndPermissionSeed) {
    
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const roles = await this.rolesService.createRole(createRoleDto);
    return new ApiResponse(roles, 'Roles created succ');
  }

  @Get('permissions')
  async getAllPermissions() {
    await this.roleSeed.seedData();
    const permissions = await this.rolesService.findAllPermissions();
    return new ApiResponse(permissions, 'Permission fetched');
  }
}
