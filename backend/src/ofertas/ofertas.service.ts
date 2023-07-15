import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import environment from 'src/config/env.config';
import { Repository } from 'typeorm';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { Oferta } from './entities/oferta.entity';

import * as fs from 'fs';
import { v4 } from 'uuid';

@Injectable()
export class OfertasService {

  constructor(
    @InjectRepository(Oferta)
    private readonly ofertasRepository: Repository<Oferta>
  ) { }

  async create(createOfertaDto: CreateOfertaDto) {
    const mainImage = createOfertaDto.image;
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
      const imageEndpoint = `/api/images/${fileName}`;

      imageUrl = imageEndpoint;
    }

    const createdOffer = await this.ofertasRepository.save({
      ...createOfertaDto,
      imagenUrl: imageUrl,
    });

    delete createdOffer.image;

    return createdOffer;
  }

  async findAll() {
    return await this.ofertasRepository.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string) {
    return await this.ofertasRepository.findOne({
      where: {
        id: id,
        isActive: true
      }
    });
  }

  async remove(id: string) {
    return await this.ofertasRepository.update(id, {
      isActive: false,
    });
  }
}
