const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const allRoutes = require("./Routes/Routes")
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000/',
    credentials: true,
    optionSuccessStatus: 200
}



















const server = express()

server.use(cors(corsOptions));
server.use(bodyParser.json())

server.use(express.urlencoded({ extended: false }))


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/guitarDB');

}





server.use("/", allRoutes)










server.listen(8080, (req, res) => {
    console.log("Server Started")
})