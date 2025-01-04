const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})

module.exports = upload;