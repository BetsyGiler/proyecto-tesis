import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsEmail, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: "El nombre es obligatorio y debe ser un string" })
  nombre: string;

  @IsString({ message: "La imagen de perfil debe ser un string" })
  @IsOptional()
  imagenPerfil?: string;

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
}
