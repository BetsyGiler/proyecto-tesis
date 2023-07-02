import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Notificaciones")
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  fechaCreacion?: Date;

  @Column()
  usuarioId: string;

  @Column()
  isActive: boolean;
}
