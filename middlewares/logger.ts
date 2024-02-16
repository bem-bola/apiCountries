import {Request, Response, NextFunction } from 'express';
import winston from 'winston'


// const format =  winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//     winston.format.printf(
//         (info) =>  `${info.timestamp} ${info.level}: ${info.message}`, 
//     ));

// export const LoggerError = winston.createLogger({
//     format: format,
//     transports: [
//       new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'logs/activity.log', level: 'info' }),

//       new winston.transports.File({ filename: 'logs/all.log' }),
//     ],
// });

// export const LoggerInfo = winston.createLogger({
//     format: format,
//     transports: [
//       new winston.transports.File({ filename: 'logs/activity.log', level: 'info' }),
//       new winston.transports.File({ filename: 'logs/all.log' }),
//     ],
// });

// export function Logger(req: Request, res: Response, next: NextFunction ){

//   const format =  winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//     winston.format.printf(
//         (info) =>  `${info.timestamp} ${info.level}: ${info.message}`, 
//     ));

//     const logger = winston.createLogger({
//       format: format,
//       transports: [
//         new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'logs/activity.log', level: 'info' }),
  
//         new winston.transports.File({ filename: 'logs/all.log' }),
//       ],
//   });

  
// }


export function logger(err: Error, req: Request, res: Response, next: NextFunction) {
    const format = winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level} - Adresse IP : ${req.ip} - url: ${req.url} - Message: ${info.message}`
        )
    );

    const logger = winston.createLogger({
        format: format,
        transports: [
            new winston.transports.File({ filename: 'logs/activity.log', level: 'info' }),
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/all.log' })
        ]
    });

    // Log d'une requête entrante
    logger.info(`Activité`);

    if(err){
      logger.error(err)
    }
    // Appel du prochain middleware
    next();
    // res.status(500).json('ok')
}

// export {LoggerError, LoggerInfo}
