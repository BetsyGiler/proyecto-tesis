import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepository.save(createServiceDto);
  }

  async findAll() {
    return await this.serviceRepository.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string) {
    return await this.serviceRepository.findOne({
      where: {
        id: id,
        isActive: true
      }
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {

    const record = await this.serviceRepository.findOne({
      where: {
        id: id,
        isActive: true
      }
    });

    if (!record) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return await this.serviceRepository.update(id, updateServiceDto);
  }

  async remove(id: string) {
    return await this.serviceRepository.update(id, { isActive: false });
  }
}
