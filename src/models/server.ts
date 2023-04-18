import cors from 'cors';
import express from 'express';
import userRouter from '../routes/usuarios';

class Server {
	private app: express.Application;
	private PORT: string | number;
	private apiV1path = {
		users: '/api/v1/users',
	};

	constructor() {
		this.app = express();
		this.PORT = process.env.PORT || 3000;

		this.middlewares();
		this.routes();
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
		this.app.use(this.apiV1path.users, userRouter);
	}

	listen() {
		this.app.listen(this.PORT, () => {
			console.log(
				`🚀 Server ready on: http://localhost:${
					this.PORT
				} - ⌚ - ${new Date().toLocaleString()}`
			);
		});
	}
}

export default Server;
