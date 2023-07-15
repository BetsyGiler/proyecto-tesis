import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OfertasProductos } from "./ofertas-productos.entity";

@Entity('Ofertas')
export class Oferta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ type: "decimal" })
  precio: number;

  @Column()
  descripcion: string;

  @Column()
  imagenUrl: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => OfertasProductos, (op) => op.oferta, { eager: true, cascade: true })
  productos: OfertasProductos[];
}
