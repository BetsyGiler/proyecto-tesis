import { MemoryStoredFile } from "nestjs-form-data";
export declare class CreateUserDto {
    nombre: string;
    email: string;
    ciudad?: string;
    barrio?: string;
    numeroTelefono?: string;
    provincia?: string;
    password: string;
    imagenPerfil: MemoryStoredFile;
}
