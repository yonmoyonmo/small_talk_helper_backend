import { Request, Response, NextFunction } from "express";
import * as express from 'express'
import * as dotenv from 'dotenv';
import "reflect-metadata";

const server: express.Application = express();
dotenv.config({
    path: "./config/.env"
});

server.get('/', (req: Request, res: Response) => {
    res.send("test");
})

server.listen(5000, () => {
    console.log("test");
    console.log(process.env.test);
});