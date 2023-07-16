import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitasService {

  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>
  ) { }

  async create(usuarioId: string, createCitaDto: CreateCitaDto) {
    const cita = this.citasRepository.create({
      ...createCitaDto,
      usuarioId,
    });

    return await this.citasRepository.save(cita);
  }

  async findAll() {
    return await this.citasRepository.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string) {
    return await this.citasRepository.findOne({
      where: {
        id,
        isActive: true
      }
    });
  }

  async remove(id: string) {
    return await this.citasRepository.update(id, {
      isActive: false
    });
  }
}
