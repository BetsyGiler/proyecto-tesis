import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {

  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosService: Repository<Pedido>,
  ) { }

  async create(userId: string, createPedidoDto: CreatePedidoDto) {
    return await this.pedidosService.save({
      ...createPedidoDto,
      usuarioId: userId
    });
  }

  async findAll() {
    return await this.pedidosService.find({
      order: {
        fechaCreacion: 'DESC'
      },
      where: {
        isActive: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: string) {
    return this.pedidosService.update(id, {
      isActive: false
    });
  }
}
