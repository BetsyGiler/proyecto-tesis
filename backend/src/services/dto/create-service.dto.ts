import { IsDecimal, IsOptional, IsString } from "class-validator";
import { IsFile, MaxFileSize, HasMimeType, MemoryStoredFile } from "nestjs-form-data";

export class CreateServiceDto {
  @IsString({ message: "El nombre no es válido" })
  nombre: string;

  @IsString({ message: "La descripción no es válida" })
  @IsOptional()
  descripcion?: string;

  @IsDecimal({}, { message: "El costo ingresado no es correcto" })
  costo: number;

  @IsFile()
  @MaxFileSize(5 * 1024 * 1024, { message: "El archivo es demasiado grande" })
  @HasMimeType(['image/jpeg', 'image/png'], { message: "El formato de imagen no es válido" })
  @IsOptional()
  imagenPrincipal?: MemoryStoredFile;
}
