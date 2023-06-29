import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { SessionService } from "./session.service";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import environment from "src/config/env.config";
import { IRegisterResponse } from "./interfaces/register-response.interface";
import { SignInDto } from "./dto/login.dto";
import { ILoginResponse } from "./interfaces/login-response.interface";
import { JwtStrategyOutput } from "./interfaces/strategy-output.interface";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sessionService: SessionService
  ) { }

  async register(user: CreateUserDto): Promise<IRegisterResponse> {
    // hashing the password
    const { password } = user;
    const hashedPassword = bcrypt.hashSync(password, environment.hashSalts)

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
      rol: 'cliente',
    });

    let createdUser: User;

    try {
      createdUser = await this.userRepository.save(
        newUser,
      );
    } catch (e) {
      console.error(e);
      if (e.code === '23505' && e.detail.includes('email')) {
        throw new BadRequestException({
          error: 'El correo ya existe',
          detail: e.detail,
        });
      }
      throw e;
    }

    // generating the refresh token linked to a determined deviceId &
    // user
    const sessionId = await this.sessionService.createRefreshToken(
      null,
      createdUser,
      createdUser.id,
    );

    // generatig access token based on the new refresh token
    const accessToken = await this.sessionService.createAccessToken(
      sessionId,
      newUser.id,
    );

    // removing the password
    delete createdUser.password

    return {
      user: createdUser,
      accessToken,
    };
  }

  async login(user: SignInDto): Promise<ILoginResponse> {
    const { email, password } = user;

    // verifying existence of the user
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new NotFoundException("Credenciales incorrectas");
    }

    // checking credentials
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      throw new NotFoundException("Credenciales incorrectas");
    }

    // revoking all the active sessions for the current [deviceFingerprint] so a 
    // device could have only one active session
    await this.sessionService.revokeSessionsByFingerprint(
      userFound.id,
    );

    // generating the refresh token. Evrytime the user logs in a new 
    // device ID is generated
    const sessionId = await this.sessionService.createRefreshToken(
      null,
      userFound,
      userFound.id,
    );

    // generating access token
    const accessToken = await this.sessionService.createAccessToken(
      sessionId,
      userFound.id,
    );

    // removing the password so it's not sent to the client
    delete userFound.password

    return {
      user: userFound,
      accessToken,
    };
  }

  async checkSession(guardOutput: JwtStrategyOutput) {

    // If the request flow reaches this point then it means the guard 
    // was able to refresh/validate the AT against the RT so everything
    // is ok so far
    const userId = guardOutput.session.userId;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Credenciales incorrectas");
    }

    delete user.password;

    return {
      user,
      accessToken: guardOutput.accessToken,
    };
  }

  async logout(guardOutput: JwtStrategyOutput) {

    const { userId } = guardOutput.session;

    // revoking all the active sessions of the [userId] for the target [deviceId]
    await this.sessionService.revokeSessionsByFingerprint(userId);

    return {
      accessToken: null,
    };
  }
}
