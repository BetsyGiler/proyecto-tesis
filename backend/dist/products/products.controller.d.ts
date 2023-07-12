import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        nombre?: string;
        pvp?: number;
        imagenPrincipal?: import("nestjs-form-data").MemoryStoredFile;
        descripcion?: string;
        proveedorId?: string;
        id: string;
    } & import("./entities/product.entity").Product>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
