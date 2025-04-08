import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleAndPermissionSeed {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepo: Repository<Permission>,
      ) {}

    async seedData() {
        const permissions = [
            'user:create',
            'user:read',
            'user:update',
            'user:delete',
            'role:create',
            'role:read',
            'role:assign',
        ];

        for (const name of permissions) {
            const exists = await this.permissionRepo.findOne({ where: { name } });
            if (!exists) {
                await this.permissionRepo.save({ name });
            }
        }
        let adminRole = await this.roleRepo.findOne({ where: { name: 'admin' }, relations: ['permissions'], });
        if(!adminRole) 
            adminRole = this.roleRepo.create({ name: 'admin' });
        
        adminRole.permissions = await this.permissionRepo.find();
        return await this.roleRepo.save(adminRole);
    }
}