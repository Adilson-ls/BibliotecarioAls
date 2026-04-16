import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { CheckoutLoanDto, ReturnLoanDto } from './loans.dto';

@ApiTags('loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @ApiOperation({ summary: 'Listar empréstimos' })
  @Get()
  async findAll(@Query('active') active?: string) {
    const result = await this.loansService.findAll(active === 'true');
    return result.rows;
  }

  @ApiOperation({ summary: 'Obter empréstimo por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.loansService.findById(id);
  }

  @ApiOperation({ summary: 'Listar empréstimos do usuário' })
  @Get('user/:usuarioId')
  async findByUser(@Param('usuarioId') usuarioId: string) {
    const result = await this.loansService.findByUser(usuarioId);
    return result.rows;
  }

  @ApiOperation({ summary: 'Fazer checkout (empréstimo)' })
  @Post('checkout')
  async checkout(@Body() payload: CheckoutLoanDto) {
    return this.loansService.checkout(payload.usuario_id, payload.exemplar_id);
  }

  @ApiOperation({ summary: 'Devolver exemplar' })
  @Post('return')
  async returnLoan(@Body() payload: ReturnLoanDto) {
    return this.loansService.returnLoan(payload.exemplar_id);
  }
}
