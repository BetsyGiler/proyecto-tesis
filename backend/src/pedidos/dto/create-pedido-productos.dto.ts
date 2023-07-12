import { IsDecimal, IsNumber, IsUUID } from "class-validator";

export class CreatePedidoProductosDto {
  @IsUUID('all')
  productoId: string;

  @IsDecimal()
  valorCompra: number;

  @IsNumber()
  cantidad: number;
}
