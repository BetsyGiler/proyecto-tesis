import {DBConnection, dbInstance} from "../../core/database";
import bcrypt from "bcrypt";
import UserModel from "../models/user";
import UserEntity from "../../domain/entity/user";
import RegisterResponse from "../../core/types/auth/response.register";

export default class MySQLDatasource {
	private mysqlInstance: DBConnection;

	constructor() {
		this.mysqlInstance = dbInstance;
	}

	/**
	 * Logins in the user using email and password
	 * @param email
	 * @param password
	 * @returns {Promise<UserModel|undefined>}
	 */
	public async login(email: string, password: string, ip?: string, userAgent?: string): Promise<UserModel | undefined> {
		return new Promise((resolve, reject) => {
			// calling singleton connection
			const connection = this.mysqlInstance.connection;
			// calling stored procedure on mysql 
			const query = `CALL login(?, ?, ?, ?)`;
			connection.execute(query, [email ?? null, password ?? null, ip ?? null, userAgent ?? null], (err, results, fields) => {
				if (err) {
					console.log("Rejecting login");
					console.error(err);
					return reject(err);
				}
				console.log("Results from login query", results);
				resolve(undefined);
			});
		});
	}

	/**
	 * Registering a new user using [UserModel] params and password.
	 * @param user
	 * @param password
	 */
	public async register(user: UserEntity, password: string): Promise<RegisterResponse> {
		return new Promise((resolve, reject) => {
			// calling singleton connection
			const connection = this.mysqlInstance.connection;
			// calling stored procedure on mysql 
			const query = `CALL standardSignup(?, ?, ?, ?, ?, ?, ?, ?)`;
			if (!password) {
				return reject({sqlMessage: "missing password"});
			}
			if (password.length < 8) {
				return reject({sqlMessage: "password_insecure"});
			}
			// encrypting password
			const encryptedPassword = bcrypt.hashSync(password, 10);

			connection.execute(query, [
				user.name ?? null,
				user.cedula ?? null,
				user.email ?? null,
				encryptedPassword,
				user.cellphone ?? null,
				user.address ?? null,
				user.birthday ?? null,
				user.description ?? null,
			], (err, results: any, fields) => {
				if (err) {
					console.log("Rejecting register");
					console.error(err);
					return reject(err);
				}
				console.log("Results from register query", results);
				resolve(results[0][0]);
			}
			);
		});
	}
}
