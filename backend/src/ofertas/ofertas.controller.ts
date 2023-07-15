import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('ofertas')
export class OfertasController {
  constructor(private readonly ofertasService: OfertasService) { }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @FormDataRequest()
  async create(@Body() createOfertaDto: CreateOfertaDto) {
    return await this.ofertasService.create(createOfertaDto);
  }

  @Get()
  async findAll() {
    return await this.ofertasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ofertasService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return await this.ofertasService.remove(id);
  }
}
