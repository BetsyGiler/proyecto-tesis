import { MemoryStoredFile } from "nestjs-form-data";
export declare class CreateProductDto {
    nombre: string;
    pvp: number;
    imagenPrincipal?: MemoryStoredFile;
    descripcion?: string;
    proveedorId: string;
}
