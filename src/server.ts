import * as express from 'express'
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { createConnection } from "typeorm";
import "reflect-metadata";
import routes from "./routes/index.js";

const server: express.Application = express();

dotenv.config({
	path: "./config/.env"
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api', routes);

const port = process.env.port || 5000;

createConnection().then(() => {
	server.listen(port, () => {
		console.log(`small talk helper server on ${port}`);
	});
}).catch(e => {
	throw new Error(e);
})

