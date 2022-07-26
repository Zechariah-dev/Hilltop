const express = require("express")
const cors = require("cors")
const compression = require("compression")
const morgan = require("morgan")

const errorHandler = require("./validation/errorHandler")
const logger = require("./config/logger")
require("./database")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())
app.use(morgan("dev"))

app.use(function (req, res, next) {
    req.log = logger
    next()
})

require("./router")(app)

app.use(errorHandler)

process.on("uncaughtException", (e) => {
    console.log(e)
})

module.exports = app
