import winston        from 'winston';
import expressWinston from 'express-winston'
import config         from '../config/logger'

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'verbose',
      colorize: true,
      timestamp: true
    })
  ]
});

const requestLogger = function(req, res, next) {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        json: false,
        prettyPrint: false,
        colorStatus: false,
        expressFormat: true,
        timestamp: true,
        colorize: true,
      })
    ],
    colorize: true
  });
};

const errorLogger: Function = function(req, res, next) {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        timestamp: true,
        prettyPrint: false
      })
    ]
  });
};

module.exports = {
  logger,
  requestLogger,
  errorLogger
};
