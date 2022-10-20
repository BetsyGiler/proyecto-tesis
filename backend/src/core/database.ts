import mysql from 'mysql2';

class DatabaseConstructor {
	// Database connection to mysql
	connection: mysql.Connection;
	host: string;
	username: string;
	password: string;
	database: string;

	constructor() {
		this.connection = mysql.createConnection({
			host: this.host,
			user: this.username,
			password: this.password,
			database: this.database,
		});
	}
}

// Singleton instance of the database
export const dbInstance = new DatabaseConstructor();
