import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsDateString()
  release_date: string;

  @IsOptional()
  @IsDate()
  delete_at?: Date;
}
