import { Session } from "../entities/session.entity";
export interface JwtStrategyOutput {
    session: Session;
    accessToken: string;
}
