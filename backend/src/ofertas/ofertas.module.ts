import { Module } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { OfertasController } from './ofertas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oferta } from './entities/oferta.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OfertasProductos } from './entities/ofertas-productos.entity';

@Module({
  controllers: [OfertasController],
  providers: [
    OfertasService,
    UserService,
  ],
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([Oferta, OfertasProductos, User]),
  ]
})
export class OfertasModule { }
