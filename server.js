// DEPENDENCIES

// get .env variables
require ("dotenv").config()
// get port and db url
const { PORT, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const { response } = require("express")



//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {})

mongoose.connection
    .on("open", () => { console.log("You are connected to mongodb") })
    .on("close", () => { console.log("You are disconnected") })
    .on("error", (error) => { console.log(error) })


// MODEL
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = mongoose.model("People", PeopleSchema)

// MIDDLEWARE
// cors
app.use(cors()) // prevents cross origin resource sharing errors; allows access to server from all origins (i.e. react frontend)
// morgan
app.use(morgan("dev")) // logs details of all server hits to terminal
// express json
app.use(express.json()) // parse json bodies from request
app.use(express.urlencoded({extended: false}))







// ROUTES
    // IDUC

app.get('/', (req, res) => {
    res.send('operational')
})

// INDEX
app.get('/people', async (req, res) => {
    try {
        //send all people
    res.status(200).json( await People.find({}))
    } catch (error) {
        //send error
    res.status(400).json(error)
    }
})

// DELETE
app.delete("/people/:id", async (req, res) => {
    try {
        //send deleted record
        response.status(200).json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

// UPDATE
app.put("/people/:id", async (req, res) => {
    try {
        // send updated person
        res.status(200).json(await People.findByIdAndUpdate(req.params.id, req.body, { new: true } ))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// CREATE
app.post('/people', async (req, res) => {
    try {
        // send created person
        res.status(200).json(await People.create(req.body))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})



// LISTENER
app.listen(PORT, () => console.log("crickets") )