import { PedidosProductosService } from './pedidos-productos.service';
import { CreatePedidosProductoDto } from './dto/create-pedidos-producto.dto';
import { UpdatePedidosProductoDto } from './dto/update-pedidos-producto.dto';
export declare class PedidosProductosController {
    private readonly pedidosProductosService;
    constructor(pedidosProductosService: PedidosProductosService);
    create(createPedidosProductoDto: CreatePedidosProductoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePedidosProductoDto: UpdatePedidosProductoDto): string;
    remove(id: string): string;
}
