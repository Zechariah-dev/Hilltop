const BadRequestError = require("./BadRequestError")

class BadRequestErrorWithPayload extends BadRequestError {
    constructor(message, payload) {
        super(message)
        this.name = "BadRequestWithPayloadError"
        this.payload = payload
    }
}

module.exports = BadRequestErrorWithPayload
