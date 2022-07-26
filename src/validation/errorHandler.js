const { globalErrors } = require("../config/globals")

function errorHandler(err, req, res, next) {
    req.log.error(err)

    const { statusCode, message, payload } = err
    if (!statusCode || !message) {
        return res.status(500).json({
            statusCode: 500,
            messaage: globalErrors.GLOBAL_ERR_INTERNAL_SERVER_ERROR,
        })
    }

    if (err.name === "NotFoundError") {
        const { statusCode, message, data } = err
        return res
            .status(statusCode)
            .json({ statusCode, message: data ? data.error.message : message })
    }

    return res.status(statusCode).json({ statusCode, message, ...payload })
}

module.exports = errorHandler
