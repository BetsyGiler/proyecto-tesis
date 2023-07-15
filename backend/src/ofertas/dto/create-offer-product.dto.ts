import { IsUUID } from "class-validator";

export class CreateOfferProductDto {
  @IsUUID('all')
  productoId: string;
}
