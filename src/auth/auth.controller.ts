import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../common/response/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return new ApiResponse(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      'User registered successfully',
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    const tokens = await this.authService.login(user);

    return new ApiResponse(
      {
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      'Login successful',
    );
  }
}
