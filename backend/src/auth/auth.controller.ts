import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiResponse } from '../common/response/response.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { UserProfile } from './interfaces/user-profile.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    return new ApiResponse(
      {
        userId: user.id,
        email: user.email,
        roles: user.roles,
      },
      'User registered successfully',
    );
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    
    const user = await this.authService.validateUser(signInDto.email, signInDto.password);
    const tokens = await this.authService.signIn(user);
    return new ApiResponse(
      {
        token: tokens.accessToken,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_type: user.user_type,
        roles: user.roles
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
