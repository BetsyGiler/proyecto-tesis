import { Strategy } from "passport-jwt";
import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { AccessTokenPayload } from "./payloads/at.payload";
import { SessionService } from "./session.service";
import { JwtStrategyOutput } from "./interfaces/strategy-output.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly sessionRepository;
    private readonly sessionService;
    constructor(sessionRepository: Repository<Session>, sessionService: SessionService);
    validate(req: Request, payload: AccessTokenPayload): Promise<JwtStrategyOutput>;
}
export {};
