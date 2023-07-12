import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    nombre: string;
    ciudad?: string;
    barrio?: string;
    numeroTelefono?: string;
    provincia?: string;
}
export {};
