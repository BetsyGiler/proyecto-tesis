import { IsString, IsOptional, IsNumber, IsBoolean, IsDecimal } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class CreateProductDto {
  @IsString({ message: "El nombre no es válido" })
  nombre: string;

  @IsDecimal({}, { message: "El precio no es válido" })
  pvp: number;

  @IsFile()
  @MaxFileSize(5 * 1024 * 1024, { message: "El archivo es demasiado grande" })
  @HasMimeType(['image/jpeg', 'image/png'], { message: "El formato de imagen no es válido" })
  @IsOptional()
  imagenPrincipal?: MemoryStoredFile;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  proveedorId: string;
}
