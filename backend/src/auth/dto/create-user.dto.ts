import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { HasMimeType, IsFile, IsFiles, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class CreateUserDto {
  @IsString({ message: "El nombre es obligatorio y debe ser un string" })
  nombre: string;

  @IsEmail({}, { message: "El email es obligatorio y debe ser un string" })
  email: string;

  @IsString({ message: "La ciudad debe ser un string" })
  @IsOptional()
  ciudad?: string;

  @IsString({ message: "El barrio debe ser un string" })
  @IsOptional()
  barrio?: string;

  @IsString({ message: "El numero de telefono debe ser un string" })
  @IsOptional()
  numeroTelefono?: string;

  @IsString({ message: "El peovincia debe ser un string" })
  @IsOptional()
  provincia?: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo" })
  password: string;

  @IsFile()
  @MaxFileSize(1e6, { message: "El archivo debe ser menor a 1 MB" })
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsOptional()
  imagenPerfil: MemoryStoredFile;
}
