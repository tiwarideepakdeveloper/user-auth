import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleAndPermissionSeed } from './roles.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RolesService, RoleAndPermissionSeed],
  controllers: [RolesController]
})
export class RolesModule {}
