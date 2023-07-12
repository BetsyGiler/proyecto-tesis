import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "./payloads/at.payload";
export declare class SessionService {
    private readonly sessionRepository;
    private readonly jwtService;
    constructor(sessionRepository: Repository<Session>, jwtService: JwtService);
    createRefreshToken(rtId: string | null, user: User, deviceFingerprint: string): Promise<string>;
    updateRefreshToken(rtId: string, userId: string): Promise<void>;
    createAccessToken(rtId: string, userId: string): Promise<string>;
    checkRefreshToken(refreshToken: string, { session }: {
        session: Session | null;
    }): Promise<boolean>;
    checkAccessToken(accessToken: string): Promise<string | null>;
    decodeAccessToken(accessToken: string): Promise<AccessTokenPayload>;
    revokeSessionsByFingerprint(userId: string): Promise<void>;
}
