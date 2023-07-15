import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Oferta } from "./oferta.entity";

@Entity("OfertasProductos")
export class OfertasProductos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ofertaId: string;

  @Column()
  productoId: string;

  @ManyToOne(() => Product)
  producto: Product

  @ManyToOne(() => Oferta)
  oferta: Oferta
}

