const mongoose = require("mongoose")






const chordsSchema = new mongoose.Schema({
    "song_name": { type: String, required: true, unique: false },
    "album_name": { type: String, required: false },
    "cover": { type: Boolean, required: false },
    "original_singer": { type: String, required: false },
    "singer": { type: String, required: false },
    "compostion": { type: String, required: false },
    "lyricist": { type: String, required: false },
    "produced_by": { type: String, required: false },
    "music_director": { type: String, required: false },
    "created_time": { type: Date, default: Date.now },
})



const creditsSchema = mongoose.model("creditsSchema", chordsSchema)

module.exports = creditsSchema
