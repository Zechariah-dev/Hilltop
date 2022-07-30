const { check } = require("express-validator")

exports.createValidation = [
    check("address").notEmpty().withMessage("address is required"),
]

exports.updateValidation = [check("address")]
