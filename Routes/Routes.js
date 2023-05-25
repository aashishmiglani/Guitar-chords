const express = require("express")
const server = express()
const path = require("path")
const xlsx = require("xlsx")
const fs = require("fs")



const router = express.Router()
server.use(express.urlencoded({ extended: true }))



// All the Schemas
const creditsSchema = require("../Schemas/creditsSchema")
const chords_guitarSchema = require("../Schemas/ChordsSchema")
const songsRequestSchema = require("../Schemas/RequestASongSchema")
const openMics = require("../Schemas/openMics")
const musicWalkSchema = require("../Schemas/musicWalk")




const pdf = require('pdf-parse');


const uploadExcel = require("../Multer/excelMulter")
const uploadPdf = require("../Multer/pdfMulter")
const uploadExcelPdf = require("../Multer/excelPdfMulter")




//CRUD OPERATIONS


//GET APIs (READ)
router.get("/chords", async (req, res) => {
    let pageLimit = Number(req.query.limit)
    let pageNumber = Number(req.query.page)
    let skipData = (pageNumber - 1) * pageLimit
    let allCredits

    req.query.singer ?
        allCredits = await creditsSchema.find({ singer: new RegExp(req.query.singer, "i") }).skip((pageNumber && pageLimit) ? skipData : 0).limit((pageNumber && pageLimit) ? pageLimit : 10) :
        req.query.song_name ?
            allCredits = await creditsSchema.find({ song_name: new RegExp(req.query.song_name, "i") }).skip((pageNumber && pageLimit) ? skipData : 0).limit((pageNumber && pageLimit) ? pageLimit : 10) :
            req.query.album_name ?
                allCredits = await creditsSchema.find({ album_name: new RegExp(req.query.album_name, "i") }).skip((pageNumber && pageLimit) ? skipData : 0).limit((pageNumber && pageLimit) ? pageLimit : 10) :
                allCredits = await creditsSchema.find({}).skip((pageNumber && pageLimit) ? skipData : 0).limit((pageNumber && pageLimit) ? pageLimit : 10)



    let allCreditsTotalData
    if (req.query.singer || req.query.song_name || req.query.album_name) allCreditsTotalData = allCredits
    else allCreditsTotalData = await creditsSchema.find({})




    let pageResponse = {
        "next": pageNumber ? pageNumber + 1 : null,
        "previous": pageNumber ? pageNumber - 1 : null,
        "limit": pageLimit ? pageLimit : 10,
        "totalPages": Math.floor(allCreditsTotalData?.length / pageLimit),
        "results": allCredits
    }

    res.status(200).json(pageResponse)

})

router.get("/chords/:id", async (req, res) => {
    let id = req.params.id
    const allCredits = await creditsSchema.findById(id)
    res.status(200).json(allCredits)

})


//POST API (CREATE)
router.post("/chords", async (req, res) => {
    const chordsCreditsSchema = new creditsSchema(req.body)
    let data = await chordsCreditsSchema.save()
    res.status(200).json(data)

})

router.get("/request-a-song", async (req, res) => {

    const getSongRequest = await songsRequestSchema.find({})
    res.status(200).json(getSongRequest)

})


router.post("/request-a-song", async (req, res) => {

    const songRequest = new songsRequestSchema(req.body)
    let data = await songRequest.save()
    res.status(200).json(data)
})


router.post("/import-chords", uploadExcel.single("excel"), async (req, res) => {
    let filename = "./excel/" + req.file.filename
    let workbook = xlsx.readFile(filename)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (let i = 0; i < data.length; i++) {
        const chordsCreditsSchema = new creditsSchema(data[i])
        let result = await chordsCreditsSchema.save()
    }
    res.status(200).json(data)

})

router.post("/import-chords-details", uploadExcelPdf.single("excel_data"), async (req, res) => {
    let filename = "./excel/" + req.file.filename
    let workbook = xlsx.readFile(filename)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    let filePath = "./chordsPdfPath/" + data[0].pdf_file


    const pdfBuffer = fs.readFileSync(filePath)
    const text = await pdf(pdfBuffer)
    for (let i = 0; i < data.length; i++) {
        console.log(data[i], text.text)

    }

    // const allChordsData = new chords_guitarSchema(req.body)
    // allChordsData.pdf_file = text.text


    res.status(200).send(data)

})


//PATCH/UPDATE API (UPDATE)
router.patch("/chords/:id", async (req, res) => {
    let _id = req.params.id
    // const chordsCreditsSchema = new creditsSchema(req.body)
    const updateData = await creditsSchema.findByIdAndUpdate(_id, req.body, {
        new: true
    })
    res.status(200).json(updateData)
})

router.get("/chords-files", async (req, res) => {
    const allData = await chords_guitarSchema.find({})
    console.log(allData)
    // let data={
    //     file:
    // }
    res.status(200).json(allData)
})

router.post("/chords-files", uploadPdf.single("pdf-file"), async (req, res) => {

    let filename = "/uploads/" + req.file.filename
    console.log(req.file)
    // const pdfBuffer = fs.readFileSync(filename)
    // const text = await pdf(pdfBuffer)
    

    
    const allChordsData = new chords_guitarSchema(req.body)
    allChordsData.pdf_file = filename
    let data = await allChordsData.save()
    res.status(200).json(data)

})




router.get("/chords-files-data", async (req, res) => {
    const addDataChords = allData = await chords_guitarSchema.find().populate("chord_id")
    res.status(200).json(addDataChords)
})


router.get("/chords-files-data/:id", async (req, res) => {
    let iid = req.params.id

    const addDataChords = allData = await chords_guitarSchema.findById(iid).populate("chord_id")
    res.status(200).json(addDataChords)
})




router.post("/open-mic-event-registraion", async (req, res) => {
    const openMicEvents = new openMics(req.body)
    let data = await openMicEvents.save()
    res.status(200).json(data)
})


router.get("/open-mic-event-registraion", async (req, res) => {
    const openMicEvents = await openMics.find({})
    res.status(200).json(openMicEvents)
})




router.get("/music-walk-event-registraion", async (req, res) => {
    const openMicEvents = await musicWalkSchema.find({})
    res.status(200).json(openMicEvents)
})


router.post("/music-walk-event-registraion", async (req, res) => {
    const musicWalk = new musicWalkSchema(req.body)
    let data = await musicWalk.save()
    res.status(200).json(data)
})










module.exports = router



