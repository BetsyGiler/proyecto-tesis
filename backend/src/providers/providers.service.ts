import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider)
    private readonly providersService: Repository<Provider>,
  ) { }


  async create(createProviderDto: CreateProviderDto) {
    const createdProvider = await this.providersService.save(createProviderDto);

    return {
      proveedor: createdProvider,
    };
  }

  async findAll() {
    return await this.providersService.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string) {
    return await this.providersService.findOne({
      where: {
        id: id,
        isActive: true
      }
    });
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    return await this.providersService.save({ id, ...updateProviderDto });
  }

  async remove(id: string) {
    return await this.providersService.update(id, { isActive: false });
  }
}
