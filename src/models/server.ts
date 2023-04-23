import cors from 'cors';
import express from 'express';
import userRouter from '../routes/users';
import db from '../database/connection';

class Server {
	private app: express.Application;
	private PORT: string | number;
	private apiPath = {
		v1: {
			users: '/api/v1/users',
		},
	};

	constructor() {
		this.app = express();
		this.PORT = process.env.PORT || 3000;

		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	async dbConnection(): Promise<void> {
		try {
			await db.authenticate();
			console.log(
				`===> 💿 Database is online - ⌚ - ${new Date().toLocaleString()}`
			);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	middlewares() {
		//cors
		this.app.use(cors());
		// body parse
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// public folder
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.apiPath.v1.users, userRouter);
	}

	listen() {
		this.app.listen(this.PORT, () => {
			console.log(
				`===> 🚀 Server ready on: http://localhost:${
					this.PORT
				} - ⌚ - ${new Date().toLocaleString()}`
			);
		});
	}
}

export default Server;
