import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import environment from "src/config/env.config";
import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { AccessTokenPayload } from "./payloads/at.payload";
import { UnauthorizedException } from "@nestjs/common";
import { SessionService } from "./session.service";
import { JwtStrategyOutput } from "./interfaces/strategy-output.interface";


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // expiration is ignored since the token could get refreshed using
      // refresh token
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: environment.accessTokenSecret,
    });
  }

  async validate(req: Request, payload: AccessTokenPayload): Promise<JwtStrategyOutput> {
    const bearerToken = req.headers['authorization'].split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException("Invalid access token");
    }

    // getting the new access token 
    let accessToken: string | null;

    try {
      accessToken = await this.sessionService.checkAccessToken(bearerToken);
    } catch (e) {
      console.error(e);
      throw e;
    }

    if (!accessToken) {
      throw new UnauthorizedException("Invalid access token");
    }

    const session = await this.sessionRepository.findOne({
      where: {
        id: payload.rtId,
      },
    });

    if (!session) {
      throw new UnauthorizedException("Inactive session");
    }

    return {
      session,
      accessToken,
    };
  }
}
