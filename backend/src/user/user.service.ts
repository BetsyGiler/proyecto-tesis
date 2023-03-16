import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const password = createUserDto.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userExists = await this.userRepository.findOne({
      where: {
        identification: createUserDto.identification,
      }
    });

    if (userExists) {
      throw new BadRequestException({
        error: 'El usuario ya existe',
      });
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      user.role = 'cliente';
      const dbUser = await this.userRepository.save(user);
      delete dbUser.password;
      return dbUser;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY' && e.sqlMessage.includes('Correo')) {
        throw new BadRequestException({
          error: 'El correo ya existe',
          detail: e.detail,
        });
      }
    }

    throw new InternalServerErrorException();
  }

  findAllClients() {
    return this.userRepository.find({
      where: {
        role: 'cliente',
      }
    });
  }

  findOne(identification: string) {
    return this.userRepository.findOne({
      where: {
        identification,
      }
    });
  }

  async update(identification: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.create(updateUserDto);
    const updated = await this.userRepository.update(identification, user);

    if (updated.affected < 1) {
      throw new BadRequestException({
        error: 'El usuario no existe',
      });
    }

    return { updated: true };
  }
}
