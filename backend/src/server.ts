import express from 'express';
import auth from './api/auth';

class Server {
	private app: express.Application;
	private port: number;

	constructor() {
		this.app = express();
		// using defined routes
		this.app.use(auth);
		this.port = Number(process.env.API_PORT);
	}

	public run(): void {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
			// initializing databse
		});
	}
}

const server = new Server();
server.run();
