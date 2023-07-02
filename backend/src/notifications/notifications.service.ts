import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.notificationRepository.save(createNotificationDto);
  }

  async findAllByUser(userId: string) {
    return await this.notificationRepository.find({
      where: {
        usuarioId: userId,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async markAsReaded(id: string) {
    return await this.notificationRepository.save({ id, isActive: false });
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
