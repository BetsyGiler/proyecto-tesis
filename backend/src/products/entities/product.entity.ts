import { Provider } from "src/providers/entities/provider.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Productos')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pvp: number;

  @Column({ nullable: true })
  imagenPrincipalUrl?: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column()
  proveedorId: string;

  @Column()
  isActive: boolean;
}
