import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TblUser } from '../users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<TblUser> {
    if(signUpDto.user_password != signUpDto.user_cnf_password){
      throw new ConflictException('Password & Confirm Paswword should be same');
    }
    const user_password = await bcrypt.hash(signUpDto.user_password, 10);
    const { user_email, user_first_name, user_last_name } = signUpDto;
    return this.usersService.create({ user_email, user_first_name, user_last_name, user_password });
  }

  async signIn(user: TblUser) {
    const payload = { 
      user_id: user.user_id, 
      user_roles: user.user_roles, 
      user_email: user.user_email,
      user_first_name: user.user_first_name, 
      user_last_name: user.user_last_name,
      user_type: user.user_type, 
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(user_email: string, user_password: string): Promise<TblUser> {
    const user = await this.usersService.findByEmail(user_email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(user_password, user.user_password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}