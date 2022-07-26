const pino = require("pino")
const dayjs = require("dayjs")

module.exports = pino({
    transport: {
        target: "pino-pretty",
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})
