import express from 'express'

const api = express.Router();


api.get('/users/:id', (req, res) => {
  const id = parseInt(+req.params.id, 10);

  res.json({
    id
  });
});

module.exports = api;
