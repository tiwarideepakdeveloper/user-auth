import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TblUser } from './entities/user.entity';
import { TblRole } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TblUser, TblRole])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
