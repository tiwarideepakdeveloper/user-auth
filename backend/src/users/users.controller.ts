import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { TblUser } from './entities/user.entity';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { SearchDto } from './dto/search.dto';
import { UsersService } from './users.service';
import { ApiResponse } from 'src/common/response/response.dto';
import { UserSetupDto } from './dto/setup.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Permissions('user:read')
export class UsersController {
  constructor(private readonly userService : UsersService) {}

  @Get()
  async index(@Query() searchDto : SearchDto) {
    const data = await this.userService.getRows(searchDto);
    return new ApiResponse(data, 'User Fetched Success');
  }

  @Permissions('user:write')
  @Post('setup')
  async setup(@Body() setupDto : UserSetupDto) {
    const data = await this.userService.setup(setupDto);
    return new ApiResponse(data, 'Action performed success!');
  }
}
