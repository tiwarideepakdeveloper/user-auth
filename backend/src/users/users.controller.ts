import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { SearchDto } from './dto/search.dto';
import { UsersService } from './users.service';
import { ApiResponse } from 'src/common/response/response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly userService : UsersService) {}

  @Get()
  @Permissions('user:read')
  async index(@Query() searchDto : SearchDto) {
    const data = await this.userService.list(searchDto);
    return new ApiResponse(data, 'User Fetched Success');
  }

  @Get('profile')
  getProfile(@AuthUser() user : User) {
    return new ApiResponse(user, 'User Fetched Success');
  }

  @Get('admin')
  @Roles('admin')
  getAdminData(@AuthUser() user : User) {
    return {
      message: 'Hello Admin',
      user: user,
    };
  }
}
