let path = require('path');
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
  
  // Multer upload instance
  const upload = multer({ storage: storage });


module.exports = upload;