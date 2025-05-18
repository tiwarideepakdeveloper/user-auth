import { InjectRepository } from "@nestjs/typeorm";
import { TblRole } from "./entities/role.entity";
import { TblPermission } from "./entities/permission.entity";
import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleAndPermissionSeed {
    constructor(
        @InjectRepository(TblRole)
        private readonly roleRepo: Repository<TblRole>,
        @InjectRepository(TblPermission)
        private readonly permissionRepo: Repository<TblPermission>,
      ) {}

    async seedData() {
        const permissions = [
            'user:write',
            'user:read',
            'user:delete',
            'role:write',
            'role:assign',
            'payment:read',
            'issue:report',
        ];

        for (const permission_name of permissions) {
            const exists = await this.permissionRepo.findOne({ where: { permission_name } });
            console.log(exists);
            
            if (!exists) {
                await this.permissionRepo.save({ permission_name });
            }
        }
        let adminRole = await this.roleRepo.findOne({ where: { role_name: 'admin' }, relations: ['permissions'], });
        if(!adminRole) 
            adminRole = this.roleRepo.create({ role_name: 'admin' });
        
        adminRole.permissions = await this.permissionRepo.find();
        await this.roleRepo.save(adminRole);

        let userRole = await this.roleRepo.findOne({ where: { role_name: 'user' }, relations: ['permissions'], });
        if(!userRole) 
            userRole = this.roleRepo.create({ role_name: 'user' });
        
        userRole.permissions = await this.permissionRepo.find({ where : { permission_name: In(['issue:report', 'payment:read'])}});
        await this.roleRepo.save(userRole);
        return  true;
    }
}