const multer = require('multer');
const path = require("path")

let storageExcelPdf = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./excel")
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadExcelPdf = multer({ storage: storageExcelPdf })
module.exports = uploadExcelPdf
