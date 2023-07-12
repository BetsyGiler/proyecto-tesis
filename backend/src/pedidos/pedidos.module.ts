import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosProductos } from './entities/pedidos-productos.entity';
import { Pedido } from './entities/pedido.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, UserService],
  imports: [
    TypeOrmModule.forFeature([
      PedidosProductos,
      Pedido,
      User,
    ]),
  ],
})
export class PedidosModule { }
