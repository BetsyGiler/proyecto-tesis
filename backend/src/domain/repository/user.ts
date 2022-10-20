import UserModel from "../../data/models/user";
import UserEntity from "../entity/user";

interface IUserRepository {
	login(email: string, password: string): Promise<UserModel|undefined>;
	register(user: UserEntity): Promise<UserModel>;
	checkSession(token: string): Promise<boolean>;
	logout(token: string): Promise<boolean>;
}

export default IUserRepository;
