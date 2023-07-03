import { IsDecimal, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @IsString({ message: "El nombre no es válido" })
  nombre: string;

  @IsString({ message: "La descripción no es válida" })
  @IsOptional()
  descripcion?: string;

  @IsDecimal({}, { message: "El costo ingresado no es correcto" })
  costo: number;
}
