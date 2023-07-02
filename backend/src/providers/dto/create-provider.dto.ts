import { IsOptional, IsString } from "class-validator";

export class CreateProviderDto {
  @IsString({ message: "El nombre es inválido" })
  nombre: string;

  @IsString({ message: "La descripción es inválida" })
  @IsOptional()
  descripcion: string;
}
