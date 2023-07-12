import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { CreatePedidoProductosDto } from "./create-pedido-productos.dto";

export class CreatePedidoDto {
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoProductosDto)
  pedidosProductos: CreatePedidoProductosDto[];
}
