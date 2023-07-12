import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
export declare class PedidosController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosService);
    create(req: Request, createPedidoDto: CreatePedidoDto): Promise<{
        usuarioId: string;
        pedidosProductos: import("./dto/create-pedido-productos.dto").CreatePedidoProductosDto[];
    } & import("./entities/pedido.entity").Pedido>;
    findAll(): Promise<import("./entities/pedido.entity").Pedido[]>;
    findOne(id: string): string;
    update(id: string, updatePedidoDto: UpdatePedidoDto): string;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
