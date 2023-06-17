import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "Sesiones"
})
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "usuarioId" })
  userId: string;

  @Column({ nullable: true })
  refreshToken: string;
}
