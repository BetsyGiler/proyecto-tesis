import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    create(createProviderDto: CreateProviderDto): Promise<{
        proveedor: CreateProviderDto & import("./entities/provider.entity").Provider;
    }>;
    findAll(): Promise<import("./entities/provider.entity").Provider[]>;
    findOne(id: string): Promise<import("./entities/provider.entity").Provider>;
    update(id: string, updateProviderDto: UpdateProviderDto): Promise<{
        nombre?: string;
        descripcion?: string;
        id: string;
    } & import("./entities/provider.entity").Provider>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
