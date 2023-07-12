import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, UserService],
  imports: [
    TypeOrmModule.forFeature([Notification, AuthModule, User])
  ]
})
export class NotificationsModule { }
