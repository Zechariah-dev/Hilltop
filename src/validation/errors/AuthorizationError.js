class AuthorizationError extends Error {
    constructor(message) {
        super()
        this.name = "BadRequestError"
        this.statusCode = 400
        this.message = message
    }
}

module.exports = AuthorizationError
