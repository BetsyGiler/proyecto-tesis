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
      // usuarioId,
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

  findOne(id: number) {
    return `This action returns a #${id} cita`;
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }
}
