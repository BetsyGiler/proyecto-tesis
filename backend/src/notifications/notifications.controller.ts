import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('notificaciones')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get('por-usuario/:usuarioObjetivo')
  @UseGuards(JwtAuthGuard)
  async findAllByUser(@Param('usuarioObjetivo') usuarioObjetivo: string) {
    return await this.notificationsService.findAllByUser(usuarioObjetivo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Post('marcar-leida/:id')
  @UseGuards(JwtAuthGuard)
  async markReaded(@Param('id') id: string) {
    return await this.notificationsService.markAsReaded(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
