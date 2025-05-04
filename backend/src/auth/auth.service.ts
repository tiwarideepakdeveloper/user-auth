import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TblUser } from '../users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TblSignInAttempt } from './entities/signin-attempt';
import { MoreThan, Repository } from 'typeorm';
import { DateUtils } from 'src/common/utils/date.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TblSignInAttempt) private signInAttempt: Repository<TblSignInAttempt>,
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

  async validateUser(user_email: string, user_password: string, sginat_ip: string): Promise<TblUser> {
    await this.checkBruteForceAttempt(sginat_ip, false);

    const user = await this.usersService.findByEmail(user_email);
    if (!user) throw new UnauthorizedException('Invalid credentials!');

    const passwordMatch = await bcrypt.compare(user_password, user.user_password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials!');

    return user;
  }

  async checkBruteForceAttempt(sginat_ip: string, is_attempt_success : boolean = false) : Promise<TblSignInAttempt> {
    let attempt = await this.signInAttempt.findOne({ 
      where : { 
        sginat_ip, 
        sginat_updated_at: MoreThan(DateUtils.toMysqlDateTime(new Date(Date.now() - 5 * 60 * 1000)))
      }
    });
    
    if(attempt && attempt.sginat_attempt_count >= 3) {
      throw new ForbiddenException('Too many Attempts! Try After Some Time!');
    }

    if(attempt) {
      attempt.sginat_attempt_count = is_attempt_success ? 0 : attempt.sginat_attempt_count + 1;
    } else{
      attempt = this.signInAttempt.create({ 
        sginat_ip, 
        sginat_attempt_count: 0, 
        sginat_updated_at: DateUtils.toMysqlDateTime() 
      });
    }
    
    return await this.signInAttempt.save(attempt);
  } 
}