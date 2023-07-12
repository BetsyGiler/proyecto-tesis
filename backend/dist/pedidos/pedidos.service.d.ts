import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
export declare class PedidosService {
    private readonly pedidosService;
    constructor(pedidosService: Repository<Pedido>);
    create(userId: string, createPedidoDto: CreatePedidoDto): Promise<{
        usuarioId: string;
        pedidosProductos: import("./dto/create-pedido-productos.dto").CreatePedidoProductosDto[];
    } & Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: number): string;
    update(id: number, updatePedidoDto: UpdatePedidoDto): string;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
