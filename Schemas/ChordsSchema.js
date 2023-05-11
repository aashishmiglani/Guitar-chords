const mongoose = require("mongoose")
const creditsSchema = require("./creditsSchema")


const Schema = mongoose.Schema;







const chordsGuitarSchema = new mongoose.Schema({
    "chord_id": { type: mongoose.Schema.Types.ObjectId, ref: "creditsSchema", required: true },

    "chord_type": { type: String, required: false },
    "family_chords": { type: String, required: false },
    "strumming_type": { type: String, required: false },
    "strumming_pattern": { type: String, required: false },
    "pdf_file": Schema.Types.Mixed


})



const chords_guitarSchema = mongoose.model("chords_guitarSchem", chordsGuitarSchema)


module.exports = chords_guitarSchema
