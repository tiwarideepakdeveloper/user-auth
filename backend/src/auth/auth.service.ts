import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const password = await bcrypt.hash(signUpDto.password, 10);
    const { email, first_name, last_name } = signUpDto;
    return this.usersService.create({ email, first_name, last_name, password });
  }

  async signIn(user: User) {
    const payload = { 
      sub: user.id, 
      roles: user.roles, 
      email: user.email,
      first_name: user.first_name, 
      last_name: user.last_name,
      user_type: user.user_type, 
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}