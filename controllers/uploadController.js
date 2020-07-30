const multer = require('multer');
let previousPlaceName = '';
let counter = 1;

// Multer Config
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'placeIcon')
      cb(null, 'public/icons');
    else
      cb(null, 'public/imgs');
  },

  filename: (req, file, cb) => {
    let placeName;
    if (req.body.placeName)
      placeName = req.body.placeName.split(' ').join('');

    const ext = file.mimetype.split('/')[1]; //Get the file extension
    if (file.fieldname === 'placeIcon')
      cb(null, `icon-${placeName}.${ext}`);
    else {
      cb(null, `image-${placeName}-${counter}.${ext}`);

      //Reset the counter if new place is sent
      if (placeName == previousPlaceName)
        counter++;
      else
        counter = 1;

      previousPlaceName = placeName;
    }
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorHandler(400, 'Please Upload only images'), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadImages = upload.fields([
  { name: 'placeIcon', maxCount: 1 },
  { name: 'placeImages', maxCount: 5 },
]);
