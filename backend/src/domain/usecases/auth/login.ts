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

interface LoginResponse {
	user?: UserModel;
	error?: string;
	message: string;
}

export default class LoginUseCase extends UseCase<LoginResponse, LoginParams, UserRepository> {
	constructor() {
		super(new UserRepository());
	}

	async call(params: LoginParams): Promise<LoginResponse> {
		const user = await this.repository.login(params.email, params.password, params.ip, params.userAgent);
		return {
			user,
			error: "No se puede iniciar sesion",
			message: "Ocurrió un error al iniciar sesión",
		};
	}
}
