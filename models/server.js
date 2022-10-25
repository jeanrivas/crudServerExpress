const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathUser = '/api/usuarios';
		this.middlewares();

		this.connectDB();

		this.routes();
	}
	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(express.static('public'));

		this.app.use(cors());

		this.app.use(express.json());
	}
	routes() {
		this.app.use(this.pathUser, require('../routes/user.routes'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		});
	}
}

module.exports = Server;
