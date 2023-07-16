import { Service } from "src/services/entities/service.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuarioId: string;

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

  @ManyToOne(() => User, { eager: true })
  usuario: User;

  @ManyToOne(() => Service, { eager: true })
  servicio: Service;
}
