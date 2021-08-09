import { Request, Response, NextFunction } from "express";
import express from 'express';
import dotenv from 'dotenv';
import * as path from 'path';

const server: express.Application = express();
dotenv.config({
    path:"./config/.env"
});

server.get('/', (req: Request, res: Response) => {
    res.send("test");
})

server.listen(5000, () => {
    console.log("test");
    console.log(process.env.test);
});