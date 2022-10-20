import mysql from 'mysql2';

/**
 * Connection to the mysql database, using the mysql2 package.
 */
class DatabaseConnection {
	// Database connection to mysql
	connection: mysql.Connection;
	host: string;
	username: string;
	password: string;
	database: string;

	constructor() {
		this.host = process.env.MYSQL_HOST ?? 'localhost';
		this.username = process.env.MYSQL_USERNAME ?? 'root';
		this.password = process.env.MYSQL_PASSWORD ?? 'olyndha';
		this.database = process.env.MYSQL_DATABASE ?? 'olyndha';
		this.connection = mysql.createConnection({
			host: this.host,
			user: this.username,
			password: this.password,
			database: this.database,
		});
	}
}

/**
 * Type to be used along with the database connection.
 */
export type DBConnection = DatabaseConnection;

// Singleton instance of the database
export const dbInstance = new DatabaseConnection();
