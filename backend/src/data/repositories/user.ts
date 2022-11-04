import RegisterResponse from "../../core/types/auth/response.register";
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

	/**
	 * Logins in the user using a mysql stored procedure
	 * @param email
	 * @param password
	 * @param ip - The IP of the client 
	 * @param userAgent - The user agent of the client
	 */
	public async login(
		email: string,
		password: string,
		ip?: string,
		userAgent?: string
	): Promise<UserModel|undefined> {
		return await this.userDatasource.login(email, password, ip, userAgent);
	}

	/**
	 * Registering a new user using [UserModel] params and password.
	 * @param user
	 */
	public async register(user: UserEntity, password: string): Promise<RegisterResponse> {
		return await this.userDatasource.register(user, password);
	}

	checkSession(token: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	logout(token: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

}
