import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';
export declare class ProvidersService {
    private readonly providersService;
    constructor(providersService: Repository<Provider>);
    create(createProviderDto: CreateProviderDto): Promise<{
        proveedor: CreateProviderDto & Provider;
    }>;
    findAll(): Promise<Provider[]>;
    findOne(id: string): Promise<Provider>;
    update(id: string, updateProviderDto: UpdateProviderDto): Promise<{
        nombre?: string;
        descripcion?: string;
        id: string;
    } & Provider>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
