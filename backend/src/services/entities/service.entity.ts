import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Servicios')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  costo: number;

  @Column()
  isActive: boolean;
}
