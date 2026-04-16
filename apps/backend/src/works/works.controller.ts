import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorksService } from './works.service';
import { CreateWorkDto, UpdateWorkDto } from './works.dto';

@ApiTags('works')
@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiOperation({ summary: 'Listar todas as obras' })
  @Get()
  async findAll(@Query('search') search?: string) {
    const result = await this.worksService.findAll(search);
    return result.rows;
  }

  @ApiOperation({ summary: 'Obter obra por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.worksService.findById(id);
  }

  @ApiOperation({ summary: 'Criar nova obra' })
  @Post()
  async create(@Body() payload: CreateWorkDto) {
    return this.worksService.create(payload);
  }

  @ApiOperation({ summary: 'Atualizar obra' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateWorkDto) {
    return this.worksService.update(id, payload);
  }

  @ApiOperation({ summary: 'Deletar obra' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.worksService.delete(id);
  }
}
