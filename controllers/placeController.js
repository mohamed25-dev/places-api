require('express-async-errors');
const multer = require('multer');

const { setResponse } = require('../utils/response');
const { createValidate, uploadValidate } = require('../validate/placeValidator');
const { ErrorHandler } = require('../utils/ErrorHandler');

const db = require('../models/index');
const sequelize = db.sequelize;
const Place = db.place;
const Image = db.image;


//Create Place
exports.create = async (req, res) => {
  //Validate the request body
  const { error } = createValidate(req.body);
  if (error) {
    throw new ErrorHandler(400, error.details[0].message);
  }

  if (!req.files.placeImages) {
    throw new ErrorHandler(400, 'At least one image is required');
  }

  // Check name duplication
  let place = await Place.findOne({
    where: {
      placeName: req.body.placeName
    }
  });

  if (place) {
    throw new ErrorHandler(400, 'Place Already Exist');
  }

  if (req.files.placeIcon) {
    req.body.placeIcon = req.files.placeIcon[0].filename;
  }

  await sequelize.transaction(async (t) => {
    place = await Place.create({
      ...req.body
    }, { transaction: t });

    let placeImages = [];
    req.files.placeImages.forEach(image => {
      placeImages.push({ imageName: `${image.filename}` });
    });

    placeImages = await Image.bulkCreate(placeImages, { transaction: t });
    await place.setImages(placeImages, { transaction: t });

    //Qurey the created place info
    place = await Place.findByPk(place.placeId, {
      include: {
        model: Image,
        as: 'images'
      },  
      transaction: t 
    });
    setResponse(res, 201, 'Place Created', { place });
  });
};

//Get all Places
exports.list = async (req, res) => {
  const places = await Place.findAll({
    include: {
      model: Image,
      as: 'images'
    }
  });

  setResponse(res, 200, 'Places', { places });
};

//Get Place 
exports.get = async (req, res) => {
  let place = await Place.findByPk(req.params.placeId, {
    include: {
      model: Image,
      as: 'images'
    }
  });

  //Not Found Return 404
  if (!place) {
    throw new ErrorHandler(404, 'Place Not Found');
  }

  setResponse(res, 200, 'OK', { place });
}

