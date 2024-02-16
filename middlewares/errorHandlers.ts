import {Request, Response, NextFunction} from "express";
import { ApiError } from "../errors/ApiError";
import winston from "winston";
import { log } from "console";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){

    const format = winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level} - Adresse IP : ${req.ip} - url: ${req.url} - Message: ${info.message}`
        )
    );

    const logger = winston.createLogger({
        format: format,
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/all.log' })
        ]
    });

    if(err instanceof ApiError){
        logger.error(err.message)
        res.status(500).json({error: err.message})
    } else {
        res.status(500).json({error: "Une erreur inattendue s'est produite !"})
    }

}