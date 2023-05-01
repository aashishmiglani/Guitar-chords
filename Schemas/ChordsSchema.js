const mongoose = require("mongoose")
const creditsSchema = require("./creditsSchema")







const chordsGuitarSchema = new mongoose.Schema({
    "song_name": { type: String, required: true, unique: true },
    "Pdf_name": { type: "ObjectId", ref: creditsSchema }
})



const chords_guitarSchema = mongoose.model("chords_guitarSchem", chordsGuitarSchema)


module.exports = chords_guitarSchema
