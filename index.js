const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const creditsSchema = require("./Schemas/creditsSchema.js")
const chords_guitarSchema = require("./Schemas/ChordsSchema.js")


const server = express()
server.use(bodyParser.json())



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/guitarDB');

}















server.post("/chords", async (req, res) => {
    const chordsCreditsSchema = new creditsSchema(req.body)
    let data = await chordsCreditsSchema.save()
    res.status(200).json(data)
    // res.json(req.body)

})


server.post("/chords-files", async (req, res) => {
    const allChordsData = new chords_guitarSchema(req.body)
    let data = await allChordsData.save()
    res.status(200).json(data)
    // res.json(req.body)

})




server.get("/chords", async (req, res) => {

    const allCredits = await creditsSchema.find({})
    res.status(200).json(allCredits)
 


})
server.get("/chords-files", async (req, res) => {
    

    const allData = await chords_guitarSchema.find({})
    res.status(200).json(allData)
})






server.listen(8080, (req, res) => {
    console.log("Server Started")
})