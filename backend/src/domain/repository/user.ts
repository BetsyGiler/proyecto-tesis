import RegisterResponse from "../../core/types/auth/response.register";
import UserModel from "../../data/models/user";
import UserEntity from "../entity/user";

interface IUserRepository {
	login(email: string, password: string): Promise<UserModel|undefined>;
	register(user: UserEntity, password: string): Promise<RegisterResponse>;
	checkSession(token: string): Promise<boolean>;
	logout(token: string): Promise<boolean>;
}

export default IUserRepository;
