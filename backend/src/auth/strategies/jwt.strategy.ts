import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";

import { Repository } from "typeorm";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJWTPayload): Promise<User> {
    const { email } = payload;

    // looking for the user in the database
    const user = this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // TODO: validate inactive users
    // ....

    // this will be added to the request automatically
    return user;
  }
}
