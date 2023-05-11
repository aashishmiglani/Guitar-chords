const multer = require('multer');
const path = require("path")

let storagePdf = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads")
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadPdf = multer({ storage: storagePdf })
module.exports = uploadPdf
