import LoginResponse from "../../../core/types/auth/response.login";
import UseCase from "../../../core/usecase";
import UserModel from "../../../data/models/user";
import UserRepository from "../../../data/repositories/user";

/**
 * Param set to loging into the system
 */
interface LoginParams {
	email: string;
	password: string;
	ip?: string;
	userAgent?: string;
}

export default class LoginUseCase extends UseCase<LoginResponse, LoginParams, UserRepository> {
	constructor() {
		super(new UserRepository());
	}

	async call(params: LoginParams): Promise<LoginResponse> {
		return await this.repository.login(params.email, params.password, params.ip, params.userAgent);
	}
}
