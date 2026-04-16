import { IsString, IsUUID, IsOptional, IsIn } from 'class-validator';

export class CreateCopyDto {
  @IsUUID()
  obra_id: string;

  @IsString()
  barcode: string;

  @IsOptional()
  @IsIn(['new', 'good', 'fair', 'poor'])
  physical_state?: string;

  @IsOptional()
  @IsIn(['available', 'loaned', 'maintenance', 'damaged'])
  status?: string;
}

export class UpdateCopyDto {
  @IsOptional()
  @IsUUID()
  obra_id?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsIn(['new', 'good', 'fair', 'poor'])
  physical_state?: string;

  @IsOptional()
  @IsIn(['available', 'loaned', 'maintenance', 'damaged'])
  status?: string;
}
