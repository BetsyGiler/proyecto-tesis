import {DBConnection, dbInstance} from "../../core/database";
import UserModel from "../models/user";

export default class MySQLDatasource {
	private mysqlInstance: DBConnection;

	constructor() {
		this.mysqlInstance = dbInstance;
	}

	public async login(email: string, password: string): Promise<UserModel|undefined> {
		return new Promise((resolve, reject) => {
			const connection = this.mysqlInstance.connection;
			// calling stored procedure on mysql 
			const query = `CALL login(?, ?)`;
			connection.execute(query, [email, password], (err, results, fields) => {
				if (err) {
					return reject(err);
				}
				resolve(undefined);
			});
		});
	}
}
