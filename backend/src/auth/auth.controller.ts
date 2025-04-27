import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiResponse } from '../common/response/response.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { UserProfile } from './interfaces/user-profile.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleAndPermissionSeed } from 'src/roles/roles.seed';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleSeed: RoleAndPermissionSeed
  ) {

  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    let user = await this.authService.signUp(signUpDto);
    let tokens = await this.authService.signIn(user);
    return new ApiResponse(
      {
        token: tokens.accessToken,
        user_id: user.user_id,
        user_email: user.user_email,
        user_roles: user.user_roles,
      },
      'User registered successfully',
    );
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto.user_email, signInDto.user_password);
    const tokens = await this.authService.signIn(user);
    return new ApiResponse(
      {
        token: tokens.accessToken,
        user_id: user.user_id,
        user_first_name: user.user_first_name,
        user_last_name: user.user_last_name,
        user_email: user.user_email,
        user_type: user.user_type,
        user_roles: user.user_roles
      },
      'Login successful',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@AuthUser() user: UserProfile) {
    return new ApiResponse(
      user,
      'Profile fetched successful',
    );
  }
}
