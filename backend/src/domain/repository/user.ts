import LoginResponse from "../../core/types/auth/response.login";
import LogoutResponse from "../../core/types/auth/response.logout";
import RegisterResponse from "../../core/types/auth/response.register";
import SessionEntity from "../entity/session";
import UserEntity from "../entity/user";

interface IUserRepository {
	login(email: string, password: string): Promise<LoginResponse>;
	register(user: UserEntity, password: string): Promise<RegisterResponse>;
	checkSession(token: string): Promise<SessionEntity>;
	logout(token: string): Promise<LogoutResponse>;
}

export default IUserRepository;
