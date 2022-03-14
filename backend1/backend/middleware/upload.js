const multer = require("multer") //file upload like images,...
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, './ProductImages');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    }
)

const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/png'|| file.mimetype == 'image/jpg'||file.mimetype == 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter : fileFilter
});


module.exports = upload;