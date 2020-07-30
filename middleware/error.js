const { setErrorResponse } = require('../utils/response');
const logger = require('../startup/logging');

module.exports = function (err, req, res, next) {
  if (err.response) {
    logger.error(err.response);
  } else {
    logger.error(err);
  }

  if (err.name == 'SequelizeValidationError') {
    return setErrorResponse(res, 400, err.errors[0].message);
  }

  if (err.name == 'SequelizeForeignKeyConstraintError') {
    return setErrorResponse(res, 400, 'This Item can\'t be deleted');
  }

  if (err.name == 'SyntaxError') {
    return setErrorResponse(res, 401, 'Invalid JWT');
  }

  if (err.name == 'MulterError') {
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return setErrorResponse(res, 400, 'Number of images exceeds the limit');
    }
  }

  if (err.statusCode == 404) {
    return setErrorResponse(res, err.statusCode, err.message);
  }

  if (err.response) {
    if (err.response.data.message) {
      return setErrorResponse(res, err.response.status, err.response.data.message);
    }
  }

  if (err.statusCode && err.message) {
    return setErrorResponse(res, err.statusCode, err.message);
  }

  return setErrorResponse(res, 500, `Something went wrong, Please try again later`);
}