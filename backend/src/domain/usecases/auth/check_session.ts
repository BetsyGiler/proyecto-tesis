import UseCase from "../../../core/usecase";
import UserRepository from "../../../data/repositories/user";
import SessionEntity from "../../entity/session";

/**
 * Param set to loging into the system
 */
interface CheckSessionParams {
	token: string;
}

export default class CheckSessionUseCase extends UseCase<SessionEntity, CheckSessionParams, UserRepository> {
	constructor() {
		super(new UserRepository());
	}

	async call(params: CheckSessionParams): Promise<SessionEntity> {
		return await this.repository.checkSession(params.token);
	}
}
