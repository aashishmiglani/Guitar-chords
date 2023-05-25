const mongoose = require("mongoose")






const musicWalk = new mongoose.Schema({
    "event_name": { type: String, required: true, unique: false },
    "organised_by": { type: String, required: false },
    "event_location": { type: String, required: false },
    "organised_on": { type: Date, required: false },
    "start_time": { type: String, required: false },
    "end_time": { type: String, required: false },
    "city": { type: String, required: false },
    "state": { type: String, required: false },
    "created_time": { type: Date, default: Date.now },
})



const musicWalkSchema = mongoose.model("musicWalkSchema", musicWalk)

module.exports = musicWalkSchema
