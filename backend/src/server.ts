import express from 'express';
import auth from './api/auth';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

class Server {
	private app: express.Application;
	private port: number;

	constructor() {
		// setting up environment variables
		dotenv.config();
		// setting up express
		this.app = express();
		// setting up body parser to support x-www-form-urlencoded
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		// using defined routes
		this.app.use(auth);
		this.port = Number(process.env.API_PORT);
	}

	public run(): void {
		console.log("Trying to run on port " + this.port);
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
			// initializing databse
		});
	}
}

const server = new Server();
server.run();
