import * as winston from 'winston';

export  const loggerUtility = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs.log"}),
    ],
});
