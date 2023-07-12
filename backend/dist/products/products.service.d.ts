import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private readonly productsService;
    constructor(productsService: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        nombre?: string;
        pvp?: number;
        imagenPrincipal?: import("nestjs-form-data").MemoryStoredFile;
        descripcion?: string;
        proveedorId?: string;
        id: string;
    } & Product>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
