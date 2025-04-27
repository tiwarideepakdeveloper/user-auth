import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  user_password: string;
}