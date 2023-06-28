import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtStrategyOutput } from 'src/auth/interfaces/strategy-output.interface';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string, guardOutput: JwtStrategyOutput) {

    const { accessToken } = guardOutput;

    const user = await this.userRepository.findOne({ where: { id } });

    return {
      user,
      accessToken
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
