import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors } = format;

const myFormat = printf(
  ({ level, message, timestamp, stack, params, body }) => {
    return `${timestamp} [${level}]: ${stack || message} ${
      params ? '| Params: ' + JSON.stringify(params) : ''
    } ${body ? '| Body: ' + JSON.stringify(body) : ''}`;
  }
);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/request.log' }),
  ],
});

export default logger;
