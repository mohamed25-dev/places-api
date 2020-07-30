const express = require('express');
const path = require('path');

const placesRouter = require('../routes/places');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  //Real Routes
  app.use('/api/', placesRouter);
  app.use(error);

  app.use('/', (req, res) => {
    res.status(404).send('Invalid URL, API Not found');
  });
}