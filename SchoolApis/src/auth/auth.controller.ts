import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiResponse } from '../common/response/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    
    const user = await this.authService.validateUser(signInDto.email, signInDto.password);
    const tokens = await this.authService.signIn(user);

    return new ApiResponse(
      {
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          email: user.email
        },
      },
      'Login successful',
    );
  }
}
