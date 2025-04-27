import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TblRole } from './entities/role.entity';
import { TblPermission } from './entities/permission.entity';
import { RoleAndPermissionSeed } from './roles.seed';

@Module({
  imports: [TypeOrmModule.forFeature([TblRole, TblPermission])],
  providers: [RolesService, RoleAndPermissionSeed],
  controllers: [RolesController],
  exports: [RoleAndPermissionSeed]
})
export class RolesModule {}
