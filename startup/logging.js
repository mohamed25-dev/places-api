require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: './log/info.log',
      level: 'info'
    }),
    new transports.File({
      filename: './log/errors.log',
      level: 'error'
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: './log/exceptions.log' }),
    new transports.Console()
  ]
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});

module.exports = logger;
