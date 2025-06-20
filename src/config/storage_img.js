const multer = require('multer')
const path = require('path')

const multimediaPath = path.resolve(__dirname, '../../public/Multimedia')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    if (!req.fileIndex) req.fileIndex = 0

    let folder = ''
    if (req.fileIndex === 0) {
      folder = path.join(multimediaPath, 'FunkosInterior')
    } else if (req.fileIndex === 1) {
      folder = path.join(multimediaPath, 'FunkosCajas')
    }

    req.fileIndex++
    cb(null, folder)
  },

  filename: function (req, file, cb) {
    const img_name = file.originalname.replace(/\s+/g, '_').toLowerCase()
    cb(null, img_name)
  }

})

const upload = multer({ storage })

module.exports = upload
