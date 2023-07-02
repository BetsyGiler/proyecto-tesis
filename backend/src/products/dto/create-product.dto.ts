import { IsString, IsOptional, IsNumber, IsBoolean, IsDecimal } from "class-validator";

export class CreateProductDto {
  @IsString({ message: "El nombre no es válido" })
  nombre: string;

  @IsDecimal({}, { message: "El precio no es válido" })
  pvp: number;

  @IsOptional()
  imagenPrincipalUrl?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  proveedorId: string;
}
