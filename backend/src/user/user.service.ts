import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Session } from 'src/auth/entities/session.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findAllClients() {
    return (await this.userRepository.find({
      where: {
        rol: 'cliente'
      },
    })).map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    delete user.password;

    return user;
  }

  async update(session: Session, updateUserDto: UpdateUserDto) {

    const { userId } = session;

    return await this.userRepository.update(
      userId,
      {
        ...updateUserDto,
        imagenPerfil: null,
      }
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
