
import { IsOptional, IsString } from "class-validator";

export class SignInDto {
  @IsString({
    message: "El campo email no es valido"
  })
  readonly email: string;

  @IsString({
    message: "El campo password no es valido"
  })
  readonly password: string;
}
