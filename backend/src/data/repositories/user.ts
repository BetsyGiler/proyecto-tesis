import UserEntity from "../../domain/entity/user";
import IUserRepository from "../../domain/repository/user";
import MySQLDatasource from "../datasource/mysql";
import UserModel from "../models/user";

/**
 * @class UserRepository
 * @implements {IUserRepository}
 * @description User repository
 */
export default class UserRepository implements IUserRepository {
	private userDatasource: MySQLDatasource;

	constructor() {
		this.userDatasource = new MySQLDatasource();
	}

	public async login(email: string, password: string): Promise<UserModel|undefined> {
		return await this.userDatasource.login(email, password);
	}
	register(user: UserEntity): Promise<UserModel> {
		throw new Error("Method not implemented.");
	}
	checkSession(token: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	logout(token: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

}
