import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  user_first_name: string;
  
  @IsOptional()
  @IsString()
  user_last_name?: string;

  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_cnf_password: string;
}