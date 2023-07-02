import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Proveedor')
export class Provider {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;
}
