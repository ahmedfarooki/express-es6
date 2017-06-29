import {expect, should} from 'chai'
import mocha            from 'mocha'
import request          from 'supertest'
import App              from '../src/app'

describe('it should run the server', function() {
  const options = {loggingLevel: 'error'};
  const app = new App(options);

  before(function() {
    return app.start();
  });

  after(function() {
    return app.shutdown();
  });

  it('should run the server', function() {
    return request('http://localhost:8080').get('/').expect(200)
    .then(({res}) => {
      const json = JSON.parse(res.text);
      expect(json).to.have.all.keys(['server', 'version'])
      .and.property('server').to.equal('api server');
    });
  });
});
