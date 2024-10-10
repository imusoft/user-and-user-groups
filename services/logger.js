const winston = require("winston");

//logger config - format, log filenames
const logger = winston.createLogger({
  //log file format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    //console log
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.simple(), //displays in one line
    }),
    //handled errors log
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
    }),
  ],
  //unhandled errors
  exceptionHandlers: [
    new winston.transports.File({ filename: "./logs/exceptions.log" }),
  ],
  //unhandled promise rejection
  rejectionHandlers: [
    new winston.transports.File({ filename: "./logs/rejections.log" }),
  ],
  level: 'debug'
});

module.exports = logger;
