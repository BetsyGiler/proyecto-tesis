import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import environment from 'src/config/env.config';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import * as fs from 'fs';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    const mainImage = createServiceDto.imagenPrincipal;
    const imageDir = environment.fileStorageDir;

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    let imageUrl: string | undefined;

    if (mainImage) {

      const extension = mainImage.originalName.split('.').pop();
      const fileName = `${v4()}.${extension}`;
      fs.writeFileSync(`${imageDir}${fileName}`, mainImage.buffer);

      // extracting the host & port being used
      const host = environment.apiHost;
      const port = environment.apiPort;

      const imageProtocol = host === 'localhost' ? 'http' : 'https';
      const imageHost = `www.${host}:${port}`;
      const imageEndpoint = `${imageProtocol}://${imageHost}/api/images/${fileName}`;

      imageUrl = imageEndpoint;
      console.log("Image url", imageUrl);
    }

    const createdService = await this.serviceRepository.save({
      ...createServiceDto,
      imagenPrincipalUrl: imageUrl
    });

    return await this.serviceRepository.findOne({
      where: {
        id: createdService.id
      },
    });
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
