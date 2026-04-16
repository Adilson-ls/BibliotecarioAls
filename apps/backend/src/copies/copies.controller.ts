import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CopiesService } from './copies.service';
import { CreateCopyDto, UpdateCopyDto } from './copies.dto';

@ApiTags('copies')
@Controller('copies')
export class CopiesController {
  constructor(private readonly copiesService: CopiesService) {}

  @ApiOperation({ summary: 'Listar todos os exemplares' })
  @Get()
  async findAll(@Query('obraId') obraId?: string) {
    const result = await this.copiesService.findAll(obraId);
    return result.rows;
  }

  @ApiOperation({ summary: 'Obter exemplar por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.copiesService.findById(id);
  }

  @ApiOperation({ summary: 'Criar novo exemplar' })
  @Post()
  async create(@Body() payload: CreateCopyDto) {
    return this.copiesService.create(payload);
  }

  @ApiOperation({ summary: 'Atualizar exemplar' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateCopyDto) {
    return this.copiesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Deletar exemplar' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.copiesService.delete(id);
  }
}
