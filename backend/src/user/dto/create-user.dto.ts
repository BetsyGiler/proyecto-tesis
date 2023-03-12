import { IsEmail, IsString, IsStrongPassword } from "class-validator";

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
export class CreateUserDto {
  @IsString()
  readonly identification: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, {
    message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
  })
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsEmail({}, { message: "El email no es válido" })
  readonly email: string;

  @IsString()
  sex: string;
}
