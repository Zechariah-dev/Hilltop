const http = require("http")
const app = require("./")
const config = require("./config")

const server = http.createServer(app)

server.listen(config.port, (err) => {
    if (err) console.error(err)
    console.log("server listening")
})
