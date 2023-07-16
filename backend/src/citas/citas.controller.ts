import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ClientGuard } from 'src/auth/guards/client.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategyOutput } from 'src/auth/interfaces/strategy-output.interface';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) { }

  @Post()
  @UseGuards(JwtAuthGuard, ClientGuard)
  async create(@Req() req: Request, @Body() createCitaDto: CreateCitaDto) {

    const { session } = req['user'] as JwtStrategyOutput;

    return await this.citasService.create(session.userId, createCitaDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.citasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
