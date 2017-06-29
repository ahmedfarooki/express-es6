import express from 'express'

const api = express.Router();

api.get('/auth', (req, res) => {
  res.type('json').json({
    token: 'dkfljdsklfjslk'
  });
});

module.exports = api;
