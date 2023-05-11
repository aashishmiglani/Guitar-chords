const multer = require('multer');
const path = require("path")
let storageExcel = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./excel")
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadExcel = multer({ storage: storageExcel })

module.exports = uploadExcel
