import { IsString, IsOptional, IsInt, IsISBN } from 'class-validator';

export class CreateWorkDto {
  @IsISBN()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}

export class UpdateWorkDto {
  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}
