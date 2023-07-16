import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CitasController],
  providers: [CitasService, UserService],
  imports: [
    TypeOrmModule.forFeature([Cita, User])
  ]
})
export class CitasModule { }
