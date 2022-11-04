import {DBConnection, dbInstance} from "../../core/database";
import bcrypt from "bcrypt";
import UserModel from "../models/user";
import UserEntity from "../../domain/entity/user";
import RegisterResponse from "../../core/types/auth/response.register";
import LoginResponse from "../../core/types/auth/response.login";
import SessionEntity from "../../domain/entity/session";
import LogoutResponse from "../../core/types/auth/response.logout";

export default class MySQLDatasource {
	private mysqlInstance: DBConnection;

	constructor() {
		this.mysqlInstance = dbInstance;
	}

	public async logout(token: string): Promise<LogoutResponse> {
		return new Promise((resolve, reject) => {
			const connection = this.mysqlInstance.connection;
			const query = `CALL logout(?)`;
			connection.execute(query, [token ?? null], (err, results: any, fields) => {
				if (err) {
					console.log("Rejecting logout");
					console.error(err);
					return reject(err);
				}
				console.log("Results from logout query", results);
				resolve(results[0][0]);
			});
		});
	}

	public async checkSession(token: string): Promise<SessionEntity> {
		return new Promise((resolve, reject) => {
			const connection = this.mysqlInstance.connection;
			const query = `CALL checkSession(?)`;
			connection.execute(query, [token ?? null], (err, results: any, fields) => {
				if (err) {
					console.log("Rejecting session");
					console.error(err);
					return reject(err);
				}
				console.log("Results from session query", results);
				resolve(results[0][0]);
			});
		});
	}

	/**
	 * Logins in the user using email and password
	 * @param email
	 * @param password
	 * @returns {Promise<UserModel|undefined>}
	 */
	public async login(email: string, password: string, ip?: string, userAgent?: string): Promise<LoginResponse> {
		return new Promise((resolve, reject) => {
			// calling singleton connection
			const connection = this.mysqlInstance.connection;
			// calling stored procedure on mysql 
			const query = `CALL login(?, ?, ?, ?)`;

			connection.execute(
				"select Contrasena from Usuario where Correo = ?",
				[email.trim()],
				(err, results: any, _) => {
					if (err) {
						reject(err);
					} else {
						if (results[0].Contrasena) {
							const user = results[0];
							bcrypt.compare(password, user.Contrasena, (err, result) => {
								if (err) {
									reject(err);
								} else {
									if (result) {
										connection.execute(query, [
											email,
											user.Contrasena,
											ip ?? null,
											userAgent ?? null
										], (err, results: any, _) => {
											if (err) {
												console.log("Rejecting login");
												console.error(err);
												return reject(err);
											}
											console.log("Results from login query", results);
											resolve(results[0][0]);
										});
									} else {
										console.log("Wrong password", password, user.Contrasena);
										resolve({message: "invalid_credentials"});
									}
								}
							});
						} else {
							console.log("No emails found for", email);
							console.log("Results are", results);
							resolve({message: "invalid_credentials"});
						}
					}
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
