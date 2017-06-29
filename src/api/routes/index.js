import express from 'express'

/**
  Root of the api
*/
export const Root = express.Router().get('/', function(req, res) {
  res.json({
    server: `api server`,
    version: process.env.npm_package_version
  });
});

/**
  Routes to be included
*/
export {default as AuthorizationRoutes} from './AuthorizationRoutes'
export {default as UserRoutes}          from './UserRoutes'
