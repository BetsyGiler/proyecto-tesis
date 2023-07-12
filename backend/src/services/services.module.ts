import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, UserService],
  imports: [
    TypeOrmModule.forFeature([Service, User]),
    AuthModule,
  ]
})
export class ServicesModule { }
