import { AuthService } from './auth.service';
import { SignInDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateUserDto): Promise<import("./interfaces/register-response.interface").IRegisterResponse>;
    login(loginDto: SignInDto): Promise<import("./interfaces/login-response.interface").ILoginResponse>;
    checkSession(req: Request): Promise<{
        user: import("../user/entities/user.entity").User;
        accessToken: string;
    }>;
    logout(req: Request): Promise<{
        accessToken: any;
    }>;
}
