import { IsString, IsUUID } from 'class-validator';

export class CheckoutLoanDto {
  @IsUUID()
  usuario_id: string;

  @IsUUID()
  exemplar_id: string;
}

export class ReturnLoanDto {
  @IsUUID()
  exemplar_id: string;
}
