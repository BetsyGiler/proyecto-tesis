import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('proveedor')
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createProviderDto: CreateProviderDto) {
    return await this.providersService.create(createProviderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll() {
    return await this.providersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.providersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return await this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.providersService.remove(id);
  }
}
