import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { IJWTPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    // looking for a user that matches the email
    const user = await this.userRepository.findOneBy({ email });

    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // comparing password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // generating the JWT getJwtToken
    const payload: IJWTPayload = {
      email: user.email,
    };

    // generating tokens
    const token = this.getJwtToken(payload);

    // deleting sensitive data before sending the response
    delete user.password;

    return {
      user,
      token,
    };
  }

  private getJwtToken(payload: IJWTPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

}
