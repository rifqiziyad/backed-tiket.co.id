const multer = require('multer')
const helper = require('../helpers/wrapper')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads')
  },
  filename: function (req, file, cb) {
    // console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const listExt = ['.jpg', '.png', 'jpeg']
  const ext = path.extname(file.originalname).toLowerCase()
  if (listExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Extention file must be jpg/png/jpeg'), false)
  }
}

// tambahkan limit condition

const upload = multer({ storage, fileFilter }).single('movieImage')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helper.response(res, 401, err.message, null)
    } else if (err) {
      // An unknown error occurred when uploading.
      return helper.response(res, 401, err.message, null)
    }
    next()
  })
}

module.exports = uploadFilter
