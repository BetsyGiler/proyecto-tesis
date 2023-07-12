import { PedidosProductos } from "./pedidos-productos.entity";
export declare class Pedido {
    id: string;
    usuarioId: string;
    fechaCreacion: Date;
    isActive: boolean;
    pedidosProductos: PedidosProductos[];
}
