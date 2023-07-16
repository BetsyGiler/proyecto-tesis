import { IsDate, IsDateString, IsUUID } from "class-validator";

export class CreateCitaDto {
  @IsUUID('all')
  servicioId: string;

  @IsDateString({})
  fecha: string;
}
