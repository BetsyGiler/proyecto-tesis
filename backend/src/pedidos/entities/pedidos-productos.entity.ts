import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity("PedidosProductos")
export class PedidosProductos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  pedidoId: string;

  @Column()
  productoId: string;

  @Column({ type: "decimal" })
  valorCompra: number;

  @Column()
  cantidad: number;

  @Column()
  fechaCreacion: Date;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Pedido)
  pedido: Pedido;

  @ManyToOne(() => Product, { eager: true })
  producto: Product;
}
