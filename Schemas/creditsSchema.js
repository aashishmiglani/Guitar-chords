const mongoose = require("mongoose")






const chordsSchema = new mongoose.Schema({
    "song_name": { type: String, required: true, unique: true },
    "album_name": { type: String, required: false },
    "cover": { type: Boolean, required: true },
    "original_singer": { type: String, required: false },
    "singer": { type: String, required: true },
    "compostion": { type: String, required: false },
    "lyricist": { type: String, required: true },
    "produced_by": { type: String, required: true },
    "music_director": { type: String, required: true },
    "created_time": { type: Date, default: Date.now },
})



const creditsSchema = mongoose.model("creditsSchema", chordsSchema)


module.exports = creditsSchema
