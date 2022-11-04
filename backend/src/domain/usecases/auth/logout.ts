import LoginResponse from "../../../core/types/auth/response.login";
import LogoutResponse from "../../../core/types/auth/response.logout";
import UseCase from "../../../core/usecase";
import UserRepository from "../../../data/repositories/user";

/**
 * Param set to loging into the system
 */
interface LogoutParams {
	token: string;
}

export default class LogoutUseCase extends UseCase<LoginResponse, LogoutParams, UserRepository> {
	constructor() {
		super(new UserRepository());
	}

	async call(params: LogoutParams): Promise<LogoutResponse> {
		return await this.repository.logout(params.token);
	}
}
