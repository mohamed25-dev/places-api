const Joi = require('joi');

exports.createValidate = function (place) {
  const schema = {
    placeName: Joi.string().required(),
    placeDescription: Joi.string(),
    placeLocation: Joi.string(),
  };

  return Joi.validate(place, schema);
}

exports.uploadValidate = function (place) {
  const schema = {
    placeIcon: Joi.binary().required()
  };

  return Joi.validate(place, schema);
}

