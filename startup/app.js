const express = require('express');
const app  = express();

//Config Routes
require('./routes')(app);
require('./db');
require('./logging');


module.exports = app;


