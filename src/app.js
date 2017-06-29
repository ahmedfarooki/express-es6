// @flow

import express        from 'express'
import http           from 'http'
import Promise        from 'bluebird'
import config         from './config/app'
import middleware     from './config/middleware'
import loggerService  from './services/logger'
import ServerError    from './services/server/ServerError'
import SERVER         from './services/server/serverConstants'

const logger: Function = loggerService.logger;


function normalizePort(value: string | number): string | number {
  var port = parseInt(value, 10);

  // named pipe
  if (isNaN(port)) {
    return value;
  }

  // port number
  if (port >= 0) {
    return port;
  }

  throw new Error('Invalid port number');
}


class App {
  app:      Function;
  instance: Object;

  constructor() {
    logger.verbose('🚦  Starting up');
    const app: Function = express();


    logger.silly('Setting up port');
    const port: string | number = normalizePort(process.env.PORT || config.port);
    app.set('port', port);


    logger.verbose('⚙️  Setting up middleware');
    middleware.executionOrder.forEach(name => {
      logger.silly('Middleware: ${name}');
      if (name === 'router') {
        logger.verbose('🔗  Linking the routes')
        const routes = middleware.methods[name]();
        routes.forEach(route => {
          if (typeof(route) === 'function') {
            app.use(route);
          }
        });
      }
      else {
        app.use(middleware.methods[name]());
      }
    });


    // catch 404 and forward to error handler
    // app.use(function(req, res, next) {
    //   next(new ServerError('404'));
    // });
    //
    // app.use(loggerService.errorLogger());

    this.app = app;
  }

  start() {
    const port: number = this.app.get('port');

    this.instance = http.createServer(this.app);
    this.instance.listen(port);


    this.instance.on('listening', () => {
      const address = this.instance.address();
      const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;

      logger.verbose('👂🏽  Listening on ' + bind);
    });

    this.instance.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    return Promise.resolve(this.app);
  }

  shutdown() {
    logger.verbose(`😴  Shutting down server.`);
    return this.instance.close(() => {
      return Promise.resolve();
    });
  }
}

module.exports = App;
