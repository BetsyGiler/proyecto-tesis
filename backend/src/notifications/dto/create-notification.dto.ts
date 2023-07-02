import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsString({ message: "El título no es válido" })
  titulo: string;

  @IsString({ message: "La descripción no es válida" })
  @IsOptional()
  descripcion?: string;

  @IsString({ message: "El ID del usuario objetivo no es válido" })
  usuarioId: string;
}
