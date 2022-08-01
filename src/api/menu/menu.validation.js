const { check } = require("express-validator")

exports.createValidation = [
    check("branchId").isInt().withMessage("branchId is required"),
    check("name").notEmpty().withMessage("name is required"),
    check("menulist").isArray(),
    check("status").isString().optional(),
]
