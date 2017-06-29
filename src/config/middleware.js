/*
  Middleware
*/
import path           from 'path'
import favicon        from 'serve-favicon'
import cookieParser   from 'cookie-parser'
import bodyParser     from 'body-parser'
import compression    from 'compression'
import loggerService  from '../services/logger'
import ServerError    from '../services/server/ServerError'
import SERVER         from '../services/server/serverConstants'
import * as routes    from '../api/routes'


const executionOrder = [
  'bodyParser',
  'cookieParser',
  'requestLogger',
  'compression',
  'favicon',
  'router',
  'clientErrorHandler',
  'errorLogger',
  'end'
];


const methods = {
  cookieParser,

  bodyParser: function() {
    return [
      bodyParser.json(),
      bodyParser.urlencoded({extended: true})
    ]
  },

  clientErrorHandler: function() {
    return function(req, res, next) {
      const error = new ServerError(SERVER.STATUS.NOT_FOUND);
      res.status(error.status).json(error);
      next(error);
    }
  },

  compression: function() {
    return compression();
  },

  end: function() {
    return function(req, res, next) {
      res.end();
    }
  },

  errorLogger: function() {
    return loggerService.errorLogger();
  },

  favicon: function() {
    return favicon(path.join(__dirname, '..', 'favicon.ico'))
  },

  requestLogger: function() {
    return loggerService.requestLogger();
  },

  router: function() {
    return Object.keys(routes).map(name => {
      return routes[name];
    });
  }
};


module.exports = {
  executionOrder,
  methods,
};
