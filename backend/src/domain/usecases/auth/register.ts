import RegisterResponse from "../../../core/types/auth/response.register";
import UseCase from "../../../core/usecase";
import UserRepository from "../../../data/repositories/user";
import UserEntity from "../../entity/user";

/**
 * Param set to loging into the system
 */
interface RegsiterParams {
	user: UserEntity;
	password: string;
}


export default class RegisterUseCase extends UseCase<RegisterResponse, RegsiterParams, UserRepository> {
	constructor() {
		super(new UserRepository());
	}

	async call(params: RegsiterParams): Promise<RegisterResponse> {
		return await this.repository.register(params.user, params.password);
	}
}
