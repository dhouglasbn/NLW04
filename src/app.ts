import express, { NextFunction } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './errors/AppError';
import { router } from "./routes";

createConnection(); // criando conexão com o banco de dados

const app = express(); // atribuindo a app todas as ferramentas do express

app.use(express.json()) // fazendo o nodejs entender o formato json
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
})

export { app };
