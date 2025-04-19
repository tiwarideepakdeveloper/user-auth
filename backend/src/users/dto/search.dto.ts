import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  permGrpId?: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsString()
  keyword?: string;
}