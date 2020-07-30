require('express-async-errors');

const auth = async (req, res, next) => {
  next();
}

module.exports = auth