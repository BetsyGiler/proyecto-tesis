import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({
  name: "Usuario",
})


// +-----------------+---------------+------+-----+---------+-------+
// | Field           | Type          | Null | Key | Default | Extra |
// +-----------------+---------------+------+-----+---------+-------+
// | Cedula          | char(10)      | NO   | PRI | NULL    |       |
// | Nombre          | varchar(100)  | NO   |     | NULL    |       |
// | Telefono        | char(10)      | NO   |     | NULL    |       |
// | Correo          | varchar(100)  | NO   |     | NULL    |       |
// | Contrasena      | char(64)      | NO   |     | NULL    |       |
// | sexo            | enum('M','F') | NO   |     | NULL    |       |
// | FechaNacimiento | date          | YES  |     | NULL    |       |
// | Direccion       | varchar(150)  | YES  |     | NULL    |       |
// | Active          | tinyint(1)    | YES  |     | 1       |       |
// +-----------------+---------------+------+-----+---------+-------+
export class User {
  @PrimaryColumn({ name: "Cedula" })
  identification: string;

  @Column({ name: "Nombre" })
  name: string;

  @Column({ name: "Telefono" })
  phone: string;

  @Column({ name: "Correo" })
  email: string;

  @Column({ name: "Contrasena" })
  password: string;

  @Column({ name: "sexo", type: "enum", enum: ["M", "F"] })
  sex: string;

  @Column({ name: "FechaNacimiento", nullable: true })
  birthDate: Date;

  @Column({ name: "Direccion", nullable: true })
  address: string;

  @Column({ name: "Active", nullable: true })
  active: boolean;

  @Column({
    name: "Rol",
    type: "enum",
    enum: ["cliente", "empleado", "administrador"],
    default: "cliente"
  })
  role: string;

  @BeforeInsert()
  beforeInsert() {
    this.active = true;
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.beforeInsert();
  }
}
