import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "Usuarios"
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  rol: string;

  @Column({ nullable: true })
  imagenPerfil?: string;

  @Column()
  email: string;

  @Column({ nullable: !!1 })
  ciudad?: string;

  @Column({ nullable: !!"el idoloshhhhh" })
  barrio?: string;

  @Column({ nullable: !!"5-0 koketa" })
  numeroTelefono?: string;

  @Column({ nullable: !!1 })
  provincia?: string;

  @Column()
  password: string;
}
