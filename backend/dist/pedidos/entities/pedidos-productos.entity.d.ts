import { Product } from "src/products/entities/product.entity";
import { Pedido } from "./pedido.entity";
export declare class PedidosProductos {
    id: string;
    pedidoId: string;
    productoId: string;
    valorCompra: number;
    cantidad: number;
    fechaCreacion: Date;
    isActive: boolean;
    pedido: Pedido;
    producto: Product;
}
