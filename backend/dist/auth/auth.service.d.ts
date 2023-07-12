import { User } from "src/user/entities/user.entity";
import { SessionService } from "./session.service";
import { Repository } from "typeorm";
import { IRegisterResponse } from "./interfaces/register-response.interface";
import { SignInDto } from "./dto/login.dto";
import { ILoginResponse } from "./interfaces/login-response.interface";
import { JwtStrategyOutput } from "./interfaces/strategy-output.interface";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class AuthService {
    private readonly userRepository;
    private readonly sessionService;
    constructor(userRepository: Repository<User>, sessionService: SessionService);
    register(user: CreateUserDto): Promise<IRegisterResponse>;
    login(user: SignInDto): Promise<ILoginResponse>;
    checkSession(guardOutput: JwtStrategyOutput): Promise<{
        user: User;
        accessToken: string;
    }>;
    logout(guardOutput: JwtStrategyOutput): Promise<{
        accessToken: any;
    }>;
}
