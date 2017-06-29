// @flow

import _ from 'lodash'

const STATUS: Object = {
  OK:             200,
  NOT_FOUND:      404,
  INTERNAL_ERROR: 500,
};

const CODE: Object = _.invert(STATUS);

const RESPONSE: Object = {
  "404": {
    STATUS:  404,
    MESSAGE: 'Invalid API endpoint'
  },

  "500": {
    STATUS:  500,
    MESSAGE: 'An unexpected error occured on the server'
  },
};


module.exports = {
  STATUS,
  CODE,
  RESPONSE,
};
