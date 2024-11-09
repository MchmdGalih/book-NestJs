import { IsDate, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  release_date: Date;

  @IsOptional()
  @IsDate()
  delete_at?: Date;
}
