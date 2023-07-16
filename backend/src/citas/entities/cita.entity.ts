import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Ofertas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // usuarioId: string;

  @Column()
  servicioId: string;

  @Column()
  fecha: Date;

  @Column()
  fechaCreacion: Date;

  @Column()
  fechaActualizacion: Date;

  @Column()
  isActive: boolean;
}
