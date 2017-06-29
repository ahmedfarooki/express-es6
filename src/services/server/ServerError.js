// @flow

import {STATUS, CODE, RESPONSE} from './serverConstants'



class ServerError extends Error {
  status: number;

  constructor(type: string = STATUS.INTERNAL_ERROR) {
    super();

    if (CODE[type]) {
      this.status  = RESPONSE[type].STATUS;
      this.message = RESPONSE[type].MESSAGE;
    }
    else {
      this.status  = RESPONSE.INTERNAL_ERROR.STATUS;
      this.message = RESPONSE.INTERNAL_ERROR.MESSAGE;
    }
  };
}

module.exports = ServerError;
