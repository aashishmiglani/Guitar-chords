const mongoose = require("mongoose")






const requestSong = new mongoose.Schema({
    "song_name": { type: String, required: true, unique: false },
    "singer": { type: String, required: false },
    "created_time": { type: Date, default: Date.now },
})



const songsRequestSchema = mongoose.model("songsRequestSchema", requestSong)

module.exports = songsRequestSchema
