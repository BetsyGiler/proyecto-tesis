import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidosProductos } from "./pedidos-productos.entity";

@Entity('Pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuarioId: string;

  @Column()
  fechaCreacion: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => PedidosProductos,
    (pp) => pp.pedido,
    {
      eager: true, cascade: true
    }
  )
  pedidosProductos: PedidosProductos[];
}
