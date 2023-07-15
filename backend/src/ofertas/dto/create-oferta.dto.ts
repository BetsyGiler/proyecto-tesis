import { Type } from "class-transformer";
import { IsDecimal, IsString, ValidateNested } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { CreateOfferProductDto } from "./create-offer-product.dto";

export class CreateOfertaDto {

  @IsString({ message: "La titulo debe ser un string" })
  titulo: string;

  @IsDecimal({}, { message: "El precio debe ser un decimal" })
  precio: number;

  @IsString({ message: "La descripcion debe ser un string" })
  descripcion: string;

  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png', 'image/webp'])
  @MaxFileSize(5 * 1024 * 1024)
  image: MemoryStoredFile;

  @ValidateNested({ each: true })
  @Type(() => CreateOfferProductDto)
  productos: CreateOfferProductDto[];
}
