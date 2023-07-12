import { CreatePedidosProductoDto } from './dto/create-pedidos-producto.dto';
import { UpdatePedidosProductoDto } from './dto/update-pedidos-producto.dto';
export declare class PedidosProductosService {
    create(createPedidosProductoDto: CreatePedidosProductoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePedidosProductoDto: UpdatePedidosProductoDto): string;
    remove(id: number): string;
}
