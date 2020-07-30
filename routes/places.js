const express = require('express');

const router = new express.Router();
const auth = require('../middleware/auth');
const place = require('../controllers/placeController');
const upload = require('../controllers/uploadController');

//List all Places
router.get('/places', auth, place.list);

//Create Place
router.post('/places', auth, upload.uploadImages, place.create);

//Get One Place 
router.get('/places/:placeId', auth, place.get);

module.exports = router;