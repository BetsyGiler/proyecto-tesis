import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsEmail({}, {
    message: "El campo email no es correcto"
  })
  readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, {
    message: "El campo password debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
  })
  readonly password: string;

  @IsString({
    message: "El campo name debe ser un texto"
  })
  readonly name: string;

  @IsString({
    message: "El campo role debe ser un texto"
  })
  readonly role: string;

  @IsString({
    message: "El campo cellphone debe ser un texto"
  })
  readonly cellphone: string;

  @IsOptional()
  readonly isActive: boolean;

  @IsString({
    message: "El campo province debe ser un texto"
  })
  readonly province: string;
}
